import {
  ChildProcess,
  fork,
  ForkOptions,
} from 'child_process';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  app,
  BrowserWindow,
  ipcMain,
  protocol,
  session,
} from 'electron';
import fs from 'fs';
import * as path from 'path';
import which from 'which';

import { findOpenSocket } from './ipc/findOpenSocket';

const isDevelopment = process.env.NODE_ENV !== 'production';

let serverProcess: ChildProcess | null = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let clientWin: null | BrowserWindow;

const createClientWindow = async (socketName: string): Promise<void> => {
  clientWin = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      preload: 'C:\\Users\\Radek\\Downloads\\programs\\tm-auto\\.webpack\\main\\preload.js',
    },
  });

  // Auto-hide main app menu - show it after pressing 'Alt' key
  clientWin.setAutoHideMenuBar(true);

  let loaded = false;

  do {
    try {
      await clientWin.loadURL('http://localhost:8080/');

      loaded = true;
    } catch {
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    }
  } while (!loaded);

  clientWin.maximize();

  if (isDevelopment) {
    clientWin.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  clientWin.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    clientWin = null;
  });

  clientWin.webContents.on('devtools-opened', () => {
    clientWin?.focus();

    setImmediate(() => {
      clientWin?.focus();
    });
  });

  ipcMain.on('request-socket-name', (event) => {
    event.reply('set-socket-name', socketName);
  });
};

const createBackgroundProcess = (socketName: string): void => {
  //  Electron run renderer in its own version, we want to run the background process with actual system node version
  const nodePaths = which.sync('node', { all: true, nothrow: true });

  const currentNodePath = nodePaths
    && nodePaths.find(x => x.toLowerCase().endsWith('node.exe'));

  if (!currentNodePath) {
    console.error('No current node path found');
  }

  const options: ForkOptions = {
    env: {
      TS_NODE_COMPILER_OPTIONS: '{"module":"commonjs"}',
    },
    execArgv: [
      ...(isDevelopment ? ['--inspect=9220'] : []),
      '-r',
      'ts-node/register',
    ],
    execPath: currentNodePath || undefined,
    silent: true,
  };

  const filePath = path.join(__dirname, '..', '..', 'server', 'index.ts');

  serverProcess = fork(
    filePath,
    [socketName],
    options,
  );

  //  logging
  serverProcess.on('data', (data) => {
    console.log(data);
  });

  serverProcess.stderr?.pipe(process.stderr);
  serverProcess.stdout?.pipe(process.stdout);

  serverProcess.on('exit', (code) => {
    console.log(`server exited with code ${code}`);
  });

  serverProcess.on('disconnect', () => {
    console.log('server disconnected');
  });

  serverProcess.on('error', (error) => {
    console.error('Server crashed with error');
    console.error(error);
  });
};

type Extension = {
  readonly id: string;
  readonly name: string;
};

const extensions: readonly Extension[] = [
  { id: 'fmkadmapgofadopljbjfkapdkoienihi', name: 'React DevTools' },
  { id: 'jdkknkkbebbapilgoeccciglkfbmbnfm', name: 'Apollo DevTools' },
];

const installDevTools = async (): Promise<void> => {
  const appDataPath = process.env.LOCALAPPDATA;

  if (!appDataPath) {
    console.error('Did not find local app data. Will not install extensions.');
    return;
  }

  for (const extension of extensions) {
    const extensionFolder = path.join(appDataPath, `/Google/Chrome/User Data/Default/Extensions/${extension.id}`);

    if (!fs.existsSync(extensionFolder)) {
      console.error(`${extension.name} is not installed.`);
    }

    const versionDirs = fs
      .readdirSync(extensionFolder, { withFileTypes: true })
      .filter(subDir => subDir.isDirectory());

    try {
      await session.defaultSession.loadExtension(path.join(extensionFolder, versionDirs[0].name));
      console.log(`Installed extension: ${extension.name}.`);
    } catch (error) {
      console.error(error);
    }
  }
};

app.on('ready', async () => {
  protocol.interceptFileProtocol('file', (request, callback) => {
    // eslint-disable-next-line unicorn/prefer-string-slice
    const url = request.url.substr(7); /* all urls start with 'file://' */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    callback({ path: path.normalize(`${__dirname}/${url}`) });
  }, (err) => {
    if (err) {
      console.error('Failed to register protocol');
    }
  });

  if (isDevelopment) {
    await installDevTools();
  }

  const serverSocket = await findOpenSocket('tm-auto');

  createBackgroundProcess(serverSocket);
  await createClientWindow(serverSocket);
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});

app.on('activate', async (): Promise<void> => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (clientWin === null) {
    const serverSocket = await findOpenSocket('tm-auto');

    await createClientWindow(serverSocket);
  }
});
