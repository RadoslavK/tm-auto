import {
  ChildProcess,
  fork,
  ForkOptions,
} from 'child_process';
import {
  app,
  BrowserWindow,
  ipcMain,
  session,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from 'electron';
import fs from 'fs';
import path from 'path';
import url from 'url';
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
    icon: path.join(__dirname, '..', 'renderer', 'images', 'TMAuto.ico'),
    show: false,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Auto-hide main app menu - show it after pressing 'Alt' key
  clientWin.setAutoHideMenuBar(true);

  let loaded = false;

  if (isDevelopment) {
    do {
      try {
        await clientWin.loadURL('http://localhost:8080/');

        loaded = true;
      } catch {
        await new Promise((resolve) => {
          global.setTimeout(resolve, 3000);
        });
      }
    } while (!loaded);
  } else {
    await clientWin.loadURL(url.format({
      pathname: path.join(__dirname, '..', 'renderer', 'index.html'),
      protocol: 'file:',
      slashes: true,
    }));
  }

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

  if (isDevelopment) {
    const options: ForkOptions = {
      execArgv: [
        '--inspect=9220',
        '--enable-source-maps',
      ],
      execPath: currentNodePath || undefined,
      silent: true,
    };

    const filePath = path.join(__dirname, '..', 'server', 'index.js');

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
  } else {
    const options: ForkOptions = {
      env: {
        NODE_ENV: 'production',
      },
      execPath: currentNodePath || undefined,
      silent: true,
    };

    const filePath = path.join(__dirname, '..', 'server', 'index.js');

    serverProcess = fork(
      filePath,
      [socketName],
      options,
    );

    serverProcess.stderr?.pipe(process.stderr);
    serverProcess.stdout?.pipe(process.stdout);
  }
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
