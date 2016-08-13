var http = require('http');
var request = require('request');

exports.proxy2 = function(req, res){
	console.log('proxy to 52...');
	console.log(req.url + ',' + req.method);
	
	var sreq = http.request({
		host:     '52.27.94.30', // 目标主机
		port: 8080,
			headers: {  
			"Content-Type": 'application/x-www-form-urlencoded'
		} ,
		path:     req.url, // 目标路径
		method:   req.method // 请求方式
	}, function(sres){
		sres.pipe(res);
		sres.on('end', function(){
			console.log('done');
		});
	});
	if (/POST|PUT/i.test(req.method)) {
		req.pipe(sreq);
	} else {
		sreq.end();
	}
  	
};



exports.proxy = function(req, res){
	console.log('proxy to 52...');
	console.log(req.url + ',' + req.method);
	
	 debugger;
	 
	var sreq = request.post({url:'http://52.27.94.30:8080' + req.url, form: req.body},function(err, sres, body){
		if (err) {
		    console.error('Invoke API failed:', err);
		    
		    body = {};
		    body.flag = 1;
		  } else {
		  	console.log('Invoke API successful!Server responded with:', body);
		  }
		  
		  res.write(body);
		  res.end();
		 
	});
	
};

exports.invokeapi = function(url, body, callback) {
	console.log('proxy to 52...' + url + ',' );
	
	request.post({url:'http://52.27.94.30:8080' + url, form: body},function(err, sres, body){
		if (err) {
		    console.error('Invoke API failed:', err);
		  } else
			console.log('Invoke API successful!Server responded with:', body);
		
		callback(err, body);		  
	});
}
