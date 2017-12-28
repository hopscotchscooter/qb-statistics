const { app, BrowserWindow } = require('electron');

let win = null;

app.on('ready', () => {
  win = new BrowserWindow({ width: 1000, height: 600, icon: './src/favicon.ico', title: 'WoW Base'});

  win.loadURL('http://localhost:4200');

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
});

app.on('activate', () => {
  if ( win === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if ( process.platform != 'darwin' ) {
    app.quit();
  }
});
