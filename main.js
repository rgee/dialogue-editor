var app = require('app');
var BrowserWindow = require('browser-window');
var menu = require('menu');

var newMenu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open Directory',
        accelerator: 'CmdOrCtrl+O',
        click: function (item, window) {
          window.webContents.send('open');
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        click: function (item, window) {
          window.webContents.send('undo');
        }
      },
      {
        label: 'Redo',
        accelerator: 'CmdOrCtrl+Y',
        click: function (item, window) {
          window.webContents.send('redo');
        }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  var name = require('app').getName();
  newMenu.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() { app.quit(); }
      },
    ]
  });
}



var mainWindow = null;
app.on('window-all-closed', function () {
  if (process.platform === 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  menu.setApplicationMenu(menu.buildFromTemplate(newMenu));
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
