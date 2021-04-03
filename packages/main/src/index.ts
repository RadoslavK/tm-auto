import {
  ChildProcess,
  fork,
  ForkOptions, 
} from 'child_process';
import type { BrowserWindow as BrowserWindowType } from 'electron';
import {
  app,
  BrowserWindow,
  ipcMain,
  session, 
} from 'electron';
import fs from 'fs';
import path from 'path';
import url from 'url';

import { findOpenSocket } from './ipc/findOpenSocket.js';

const isDevelopment = process.env.NODE_ENV !== 'production';

let serverProcess: ChildProcess | null = null;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let clientWin: null | BrowserWindowType;

const createClientWindow = async (socketName: string): Promise<void> => {
  ipcMain.on('request-socket-name', (event) => {
    event.reply('set-socket-name', socketName);
  });

  clientWin = new BrowserWindow({
    icon: path.join(__dirname, '..', 'renderer', 'images', 'TMAuto.ico'),
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.cjs'),
      enableRemoteModule: true,
    },
  });

  // Auto-hide main app menu - show it after pressing 'Alt' key
  clientWin.setAutoHideMenuBar(true);

  let loaded = false;

  if (isDevelopment) {
    do {
      try {
        await clientWin.loadURL('http://localhost:8080');

        loaded = true;
      } catch {
        await new Promise((resolve) => {
          global.setTimeout(resolve, 3000);
        });
      }
    } while (!loaded);
  } else {
    await clientWin.loadURL(
      url.format({
        pathname: path.join(__dirname, '..', 'renderer', 'index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
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

  const clientWin2 = new BrowserWindow({
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.cjs'),
      enableRemoteModule: true,
    },
  });
  await clientWin2.loadURL('http://localhost:8080/graphiql');
};

const createBackgroundProcess = (socketName: string): void => {
  const filePath = path.join(__dirname, 'server.cjs');
  const options: ForkOptions = {
    env: {
      dirname: app.getPath('userData'),
      NODE_ENV: isDevelopment ? 'development' : 'production',
      socketName,
    },
    execArgv: isDevelopment
      ? ['--inspect=9220', '--enable-source-maps', '--es-module-specifier-resolution=node']
      : undefined,
    silent: true,
  };

  const start = () => {
    serverProcess = fork(filePath, undefined, options);

    serverProcess.stderr?.pipe(process.stderr);
    serverProcess.stdout?.pipe(process.stdout);

    if (isDevelopment) {
      //  logging
      serverProcess.on('data', (data) => {
        console.log(data);
      });

      serverProcess.on('exit', (code) => {
        console.log(`server exited with code ${code}`);
      });

      serverProcess.on('disconnect', async () => {
        console.log('server disconnected');

        serverProcess?.kill();
        serverProcess = null;

        console.log('Restarting in 5s...');

        await new Promise(resolve => {
          global.setInterval(resolve, 5000);
        });

        start();
      });

      serverProcess.on('error', (error) => {
        console.error('Server crashed with error');
        console.error(error);
      });
    }
  };

  start();
};

type Extension = {
  readonly id: string;
  readonly name: string;
};

const extensions: readonly Extension[] = [
  { id: 'fmkadmapgofadopljbjfkapdkoienihi', name: 'React DevTools' },
  { id: 'ncedobpgnmkhcmnnkcimnobpfepidadl', name: 'Relay DevTools' },
];

const installDevTools = async (): Promise<void> => {
  const appDataPath = process.env.LOCALAPPDATA;

  if (!appDataPath) {
    console.error('Did not find local app data. Will not install extensions.');
    return;
  }

  for (const extension of extensions) {
    const extensionFolder = path.join(
      appDataPath,
      `/Google/Chrome/User Data/Default/Extensions/${extension.id}`,
    );

    if (!fs.existsSync(extensionFolder)) {
      console.error(`${extension.name} is not installed.`);
    }

    const versionDirs = fs
      .readdirSync(extensionFolder, { withFileTypes: true })
      .filter((subDir) => subDir.isDirectory());

    try {
      await session.defaultSession.loadExtension(
        path.join(extensionFolder, versionDirs[0].name),
        { allowFileAccess: true },
      );
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

app.on(
  'activate',
  async (): Promise<void> => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (clientWin === null) {
      const serverSocket = await findOpenSocket('tm-auto');

      await createClientWindow(serverSocket);
    }
  },
);
