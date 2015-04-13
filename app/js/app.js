var url = require('url');
var nw = require('nw.gui');

var win = nw.Window.get();
var nativeMenuBar = new nw.Menu({ type: "menubar" });

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

