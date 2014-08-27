var phantom = require('phantom');
var request = require('request');
var fs = require('fs');

var crypto = require('crypto');

// process.argv[2] is the :topic/:lesson urlpart

phantom.create(function(ph) {

    var hassent = false;
    var filename = ''+Math.random()*100000000000000000+'.jpg';

    var out = {};

    out.filename = filename;

    fs.openSync(filename, 'w');

// make the image named a random thing, then delete it

    (function(pp){
	fs.watch(filename, function (curr, prev) {
	    // from here, we need a one time use hash to put in the request from main app
	    // then the app will check the ip and accept the upload from phantom

	    fs.stat(filename, function (err, stats){

		if(stats.size<10) return;
		if(hassent) return;
		hassent = true;


//perhaps use request to grab the DOM and save that as well.

		var md5sum = crypto.createHash('md5');

		var s = fs.ReadStream(filename);
		s.on('data', function(d) {
		    md5sum.update(d);
		});

		s.on('end', function() {
		    var d = md5sum.digest('hex');
		    out.md5 = d;

		    console.log(JSON.stringify(out));
		    process.exit();

		});

	    });
	});
    })(ph);

  ph.createPage(function(page) {

      var topic = process.argv[2].split('/')[0];

    page.open('http://localhost:8118/topic/'+topic+'/index.html', function(status) {
	page.includeJs('http://localhost:8118/topic/'+topic+'/vendor/jquery-1.6.1.min.js', function() {
//	page.includeJs("http://thatscope.com/test/"+process.argv[2], function() {
	page.includeJs("http://localhost:8117/test/"+process.argv[2], function() {

	    page.evaluate((function() {
		return __phantomCommands;
	    }), function(cmds){
		
		var tres = {};

		for(var i=0; i<cmds.length; ++i){
		    if(cmds[i].type === 'eval'){
			
			// grab the value out of the page in the middle of whatever
			tres[cmds[i].res] = page.evaluate(tres[cmds[i].eval]);

		    }else{
			page.sendEvent(cmds[i].type, cmds[i].p0, cmds[i].p1, cmds[i].p2,
				       cmds[i].p3, cmds[i].p4);
		    }
		}

// loop over the events returned from the client script
//		page.sendEvent('click', offsets[0].left + 4, offsets[0].top + 4);
//		page.sendEvent('keypress', '2');
//
//		page.sendEvent('click', offsets[1].left + 4, offsets[1].top + 4);
//		page.sendEvent('keypress', '3');

		page.evaluate(function() {

		    var scope;

		    if(window.angular){

			scope = angular.element(
			    document.getElementsByClassName('ng-view-instance')[0]).scope();
		    }else{
			scope = window.scope;
		    }

		    var ret = [];

		    var total = 0;
		    var outof = 0;

		    for(var ff in __exp){
			var pass = (scope[ff] === __exp[ff].val);

			ret.push({
			    field:ff, val:scope[ff], exp:__exp[ff].val,
			    score:pass, comment:__exp[ff][pass?'success':'failure']
			});

			total += pass?1:0;
			outof++;
		    }

		    return {
			tests:ret, total:total, outof:outof, testversion:window.__testversion,
			logs:window.scope.logs
		    };

		}, function(result){


		    for(var tt in tres){
			// push to ret, etc
		    }

		    out.tests = result;
		    // pass the result back to the browser through stdout

		    page.render(filename);
		    ph.exit();//process.exit();?
		});
	    });
	});
	});

    });
  });
});
