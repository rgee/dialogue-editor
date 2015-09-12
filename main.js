var app = require('app');
var BrowserWindow = require('browser-window');
var menu = require('menu');

var newMenu = menu.buildFromTemplate([
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        click: function(item, window) {
          window.webContents.send('undo');
        }
      },
      {
        label: 'Redo',
        accelerator: 'CmdOrCtrl+Y',
        click: function(item, window) {
          window.webContents.send('redo');
        }
      }
    ]
  }
]);

menu.setApplicationMenu(newMenu);

var mainWindow = null;
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900
  });

  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
