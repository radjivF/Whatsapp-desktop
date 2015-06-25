var url = require('url');
var nw = require('nw.gui');
var gui = require('nw.gui');
var win = gui.Window.get();



var platform = process.platform;
platform = /^win/.test(platform) ? 'win32'
         : /^darwin/.test(platform) ? 'osx64'
         : 'linux' + (process.arch == 'ia32' ? '32' : '64');

var isOSX = platform === 'osx64';
var isWindows = platform === 'win32';
var isLinux = platform.indexOf('linux') === 0;


// Create the app menu
var mainMenu = new gui.Menu({ type: 'menubar' });

if (isLinux) {
  var fileMenu = new gui.Menu();
  fileMenu.append(new gui.MenuItem({ label: 'Quit', click: function() { win.close(true); } }));

  mainMenu.append(new gui.MenuItem({ label: 'File', submenu: fileMenu }));
}

if (mainMenu.createMacBuiltin) {
  mainMenu.createMacBuiltin('Messenger');
}

win.menu = mainMenu;

// Windows
if (isWindows) {
  // Create a tray icon
  var tray = new gui.Tray({ title: 'Messenger', tooltip: 'Messenger for Desktop', icon: 'icon.png' });
  tray.on('click', function() {
    win.show();
  });

  // Add a menu to the tray
  var trayMenu = new gui.Menu();
  trayMenu.append(new gui.MenuItem({ label: 'Open Messenger', click: function() { win.show(); } }));
  trayMenu.append(new gui.MenuItem({ label: 'Quit Messenger', click: function() { win.close(true); } }));
  tray.menu = trayMenu;
}

// OS X
if (isOSX) {
  // Re-show the window when the dock icon is pressed
  gui.App.on('reopen', function() {
    win.show();
  });
}

// Don't quit the app when the window is closed
win.on('close', function(quit) {
  if (quit) {
    win.close(true);
  } else {
    // On Linux, just minimize the window
    if (isLinux) {
      win.minimize();
    } else {
      win.hide();
    }
  }
});
