import {
  ChildProcess,
  fork,
  ForkOptions,
} from "child_process";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  app,
  protocol,
  BrowserWindow ,
} from 'electron';
import isDev from 'electron-is-dev';
import * as path from 'path';
import { findOpenSocket } from './ipc/findOpenSocket';

let serverProcess: ChildProcess | null = null;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let clientWin: null | BrowserWindow;

const createClientWindow = (socketName: string): void => {
  clientWin = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: false,
      // @ts-ignore
      // eslint-disable-next-line no-undef
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    }
  });

  clientWin.webContents.openDevTools();

  // @ts-ignore
  // eslint-disable-next-line no-undef
  clientWin.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Emitted when the window is closed.
  clientWin.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    clientWin = null;
  });

  clientWin.webContents.on('did-finish-load', () => {
    if (!clientWin) {
      return;
    }

    clientWin.webContents.send('set-socket', {
      name: socketName,
    });
  })
};

const createBackgroundProcess = (socketName: string): void => {
  const options: ForkOptions = {
    execArgv: [
      ...(isDev ? ['--inspect=9220'] : []),
      '-r',
      'ts-node/register',
    ],
    env: {
      TS_NODE_COMPILER_OPTIONS: '{"module":"commonjs"}',
    }
  };

  const filePath = path.join(__dirname, '..', 'server', 'index.ts');

  serverProcess = fork(
    filePath,
    [socketName,],
    options,
  );
};

const installDevTools = async (): Promise<void> => {
  if (!isDev) {
    return;
  }

  try {
    const devTools = await installExtension(REACT_DEVELOPER_TOOLS);
    console.log(`Added Extension(s): ${devTools}`);

    const apolloDevtoolsPath = 'C:\\Users\\Radek\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\jdkknkkbebbapilgoeccciglkfbmbnfm\\2.2.5_0';
    BrowserWindow.addDevToolsExtension(apolloDevtoolsPath);
    console.log('Added Apollo Dev tools');
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

app.on('ready', async () => {
  protocol.interceptFileProtocol('file', (request, callback) => {
    // eslint-disable-next-line unicorn/prefer-string-slice
    const url = request.url.substr(7);    /* all urls start with 'file://' */
    // @ts-ignore
    callback({ path: path.normalize(`${__dirname}/${url}`)});
  }, (err) => {
    if (err) console.error('Failed to register protocol')
  });

  await installDevTools();

  const serverSocket = await findOpenSocket('tm-auto');

  createBackgroundProcess(serverSocket);
  createClientWindow(serverSocket);
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // if (mainWindow === null) {
  //   createWindow();
  // }
});