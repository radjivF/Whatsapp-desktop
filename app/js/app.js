var url = require('url');
var nw = require('nw.gui');

var win = nw.Window.get();
var nativeMenuBar = new nw.Menu({ type: "menubar" });

var platform = process.platform;
platform = /^win/.test(platform) ? 'win32'
         : /^darwin/.test(platform) ? 'osx64'
         : 'linux' + (process.arch == 'ia32' ? '32' : '64');


var isOSX = platform === 'osx64';
var isWindows = platform === 'win32';
var isLinux = platform.indexOf('linux') === 0;

if (nativeMenuBar.createMacBuiltin) {
  nativeMenuBar.createMacBuiltin("whatsApp Desktop");
}

win.menu = nativeMenuBar;

window.onload = function() {
  var view = document.getElementById('wv1');

  //this events are here to repaint the frame :bug from react version used by whatsapp.web
  win.on('closed', function(view) {
    console.log('closed');
  });
  win.on('loaded', function(view) {
    console.log('loaded');
  });
  win.on('  document-end', function(view) {
    console.log('document-end');
  });
  win.on('loading', function(view){
    console.log('loading');
  });
  win.on('document-start', function(view){
    console.log('document-start');
  })

};

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

