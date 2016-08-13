var dotserver = require('./dotserver');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req, res) {

	dotserver.invokeapi('/dot/user/login', req.body, function(err, respData) {
		if (err) {
			respData = {};
			respData.flag = 1;
			respData.data = {};
			respData.data.msg = err;
			
			respData = JSON.stringify(respData);
		} else {
			try {
				var user = eval('(' + respData + ')');
				if (user.flag == 0) {
					req.session.user_s_token = user.data.token;
					req.session.user = user.data.user;
					
					debugger;
					
					res.cookie('ck_user_s_token', user.data.token);
				}
			} catch (e) {
				console.error(e.stack);
				respData = {};
				respData.flag = 1;
				respData.data = {};
				respData.data.msg = "Server error!";
				
				respData = JSON.stringify(respData);
			}
		}
		
		res.write(respData);
		res.end();
	});
};

exports.logout = function(req, res) {
	debugger;
	if (req.cookies.ck_user_s_token)
		req.cookie('ck_user_s_token','',{ expires: -1 });
	
	req.session.destroy();
	
	res.locals.user = null;
	
	//res.render('index', { title: 'Login first' });
	res.redirect("/index.html");
};

exports.profile = function(req, res) {
	// for debug
	//var respData = {};
	//respData["title"] = "My Profile";
	//res.render('user_profile', respData);
	//return;
	
	var params = "_t=M3LSX4w4uv13KdvcK6HcJfYjb8Z8ywHh4vbDhnKVYIMThtSu9jf3HrSrGxbPX42PAmVkVD69EL6fZiZsfIyfmTmlRfcKMhIXjVJfrwk27d0=&uid="
		+ (req.params.id || "");
//	params = "_t=" + (req.session.user_s_token || '')  + "&uid="
//		+ (req.params.id || "");
	dotserver.invokeapi('/dot/user/get', params, function(err, respData) {
		if (err) {
			respData = {};
			respData.flag = 1;
			respData.data = {};
			respData.data.msg = err;
			
		} else {
			try {
				respData = eval('(' + respData + ')');
			} catch (e) {
				console.error(e.stack);
				respData = {};
				respData.flag = 1;
				respData.data = {};
				respData.data.msg = "Server error!";
			}
		}
		
		respData["title"] = "My Profile";
		
		debugger;
		
		res.render('tpl/user_profile', respData);
	});
};
