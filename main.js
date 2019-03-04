// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, MenuItem, ipcMain} = require('electron')

//module for reloading the app automaticly
require('electron-reload')(__dirname)

//some stuff to testing
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let mainMenu = Menu.buildFromTemplate(require('./mainMenu'))
let contextMenu = Menu.buildFromTemplate(require('./contextMenu'))



const mainWindowStateKeeper = require('electron-window-state')

app.on('browser-window-blur', function(e){
  console.log('Window out of focus');
})

app.on('browser-window-focus', function(e){
  console.log('Window browse focus');
})

function createWindow () {

  let stateWindow = new mainWindowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600,
  })

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
      console.log('Hashed password is: ' + hash);
    });
  });

  console.log('Start sreating window app :)')
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: stateWindow.defaultWidth,
    height: stateWindow.defaultHeight,
    x: stateWindow.x,
    y: stateWindow.y,
    show: false,
    frame: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.once('ready-to-show', function(e){
    mainWindow.show();
  })

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-finish-load', ()=>{
    console.log('Web content Loaded sucessfully! :D')
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
  createWindow()
  Menu.setApplicationMenu(mainMenu)
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {

    console.log('Close the app :(')
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
