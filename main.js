const { app, BrowserWindow, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      preload: __dirname + '/preload.js',
    },
  });

  Menu.setApplicationMenu(null);
  win.loadFile('index.html');

  // التحقق من التحديثات
  autoUpdater.checkForUpdatesAndNotify();
}

app.whenReady().then(createWindow);

autoUpdater.on('update-available', () => {
  console.log('Update available.');
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded. Restarting app...');
  autoUpdater.quitAndInstall();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});