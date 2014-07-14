var express = require('express')
  , http = require('http')
  , path = require('path');

var childProcess = require('child_process');

var app = express();
var MemoryStore = require('connect').session.MemoryStore;

app.configure(function(){
  app.set('port', process.env.PORT || 8118);
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

app.post('/command', function(req, res){

    var ls;

    var ret = '';

    ls = childProcess.exec(req.body.command, function (error, stdout, stderr) {
	if (error) {
	    console.log(error.stack);
	    console.log('Error code: '+error.code);
	    console.log('Signal received: '+error.signal);
	}

	console.log('Child Process STDOUT: '+stdout);
	ret += stdout;
	console.log('Child Process STDERR: '+stderr);
	res.json({stdout:ret});
    });

    ls.on('exit', function (code) {
	console.log('Child process exited with exit code '+code);
    });

});

app.get('*', function(req, res){
    var cleanurl = req.url.split('?')[0];
    res.sendfile('./app'+cleanurl);
});

app.listen(process.env.PORT||8118, function(){
  console.log("Express server listening on port " + app.get('port'));
});
