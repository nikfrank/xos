var express = require('express')
  , http = require('http')
  , path = require('path');

var fs = require('fs');

var childProcess = require('child_process');

var app = express();
var MemoryStore = require('connect').session.MemoryStore;

var origins = ['http://www.thatscope.com', 'http://localhost:8117',
	       'http://thatscope.herokuapp.com'];

console.log('allowing from '+origins[process.argv[2]||0]);

app.configure(function(){
    app.set('port', process.env.PORT || 8118);
    app.set('view engine', 'ejs');
    app.use(express.favicon('./app/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('mm hmm?'));

    app.use(function(req, res, next){
	res.header('Access-Control-Allow-Headers', 'content-type');
	res.header('Access-Control-Allow-Origin', origins[process.argv[2]||0]);
	next();
    });
  
  app.use(express.session({ secret:"mm hmm?", store: new MemoryStore({reapInterval:600000})}));
  app.use(app.router);

});


app.post('/file', function(req, res){
    // pipe req.body.file to the client

    fs.readFile(req.body.filename, function(err, original_data){

	fs.unlink(req.body.filename, function(err){
	    res.end(new Buffer(original_data, 'binary').toString('base64'));
	});
    });
});

app.post('/command', function(req, res){

// this should block a set of security commands, pretty much anything with [*, " /", ^"/"] in it

// idk what those are in windows. ugh. someone is not going to enjoy securing this for \cmd

    console.log(req.body.command);
    var ls;

    var ret = '';

    ls = childProcess.exec(req.body.command, function (error, stdout, stderr) {
	if (error) {
	    console.log(error.stack);
	    console.log('Error code: '+error.code);
	    console.log('Signal received: '+error.signal);
	}

	res.json({stdout:stdout, stderr:stderr});
    });

    ls.on('exit', function (code) {
	console.log('Child process exited with exit code '+code);
    });
});

app.get('/topic/*', function(req, res){
    var cleanurl = req.url.split('?')[0].split('topic')[1];
    return res.sendfile('.'+cleanurl);
});

app.listen(process.env.PORT||8118, function(){
  console.log("Express server listening on port " + app.get('port'));
});
