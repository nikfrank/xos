var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
var MemoryStore = require('connect').session.MemoryStore;

app.configure(function(){
  app.set('port', process.env.PORT || 9011);
  app.set('view engine', 'ejs');
  app.use(express.favicon('./app/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('mm hmm?'));
  
  app.use(express.session({ secret:"mm hmm?", store: new MemoryStore({reapInterval:600000})}));
  app.use(app.router);

});

app.get('/', function(req, res){
    res.sendfile('./app/index.html');
});

app.get('*', function(req, res){
    var cleanurl = req.url.split('?')[0];
    res.sendfile('./app'+cleanurl);
});

app.listen(process.env.PORT||9011, function(){
  console.log("Express server listening on port " + app.get('port'));
});
