var dotserver = require('./dotserver');

exports.list = function(req, res){
	var params = "_t=M3LSX4w4uv13KdvcK6HcJfYjb8Z8ywHh4vbDhnKVYIMThtSu9jf3HrSrGxbPX42PAmVkVD69EL6fZiZsfIyfmTmlRfcKMhIXjVJfrwk27d0=&pn=" + (req.params.pagenumber || "1");
	
	//params = "_t=" + (req.session.user_s_token || '') + "&pn=" + (req.params.pagenumber || "1");
	console.log(params);
	debugger;
	dotserver.invokeapi('/dot/home/index', params, function(err, respData) {
		var data = {};
		if (err) {
			data["errmsg"] = "Fetch data failed.";
		} else {
			try {
				data = eval('(' + respData + ')');
				if (data.flag == 0) {
					data["errmsg"] = "";
				} else {
					data.errmsg = data.msg;
				}
			} catch (e) {
				console.error(e.stack);
				data = {};
				data["errmsg"] = "Fetch data failed.";
			}
		}
		
		data["title"] = "Products";
		
		//console.log(data);
		
		res.render('tpl/product_list', data);
	});
};

exports.product = function(req, res){
	res.render('tpl/product_detail', {title: 'Product'});
	
var params = "_t=M3LSX4w4uv13KdvcK6HcJfYjb8Z8ywHh4vbDhnKVYIMThtSu9jf3HrSrGxbPX42PAmVkVD69EL6fZiZsfIyfmTmlRfcKMhIXjVJfrwk27d0=&id=" + (req.params.id || "") + "&view=1";
	
	//params = "_t=" + (req.session.user_s_token || '') + "&pn=" + (req.params.pagenumber || "1");
	console.log(params);
	debugger;
	dotserver.invokeapi('^/dot/product/get', params, function(err, respData) {
		var data = {};
		if (err) {
			data["errmsg"] = "Fetch data failed.";
		} else {
			try {
				data = eval('(' + respData + ')');
				if (data.flag == 0) {
					data["errmsg"] = "";
				} else {
					data.errmsg = data.msg;
				}
			} catch (e) {
				console.error(e.stack);
				data = {};
				data["errmsg"] = "Fetch data failed.";
			}
		}
		
		data["title"] = "Products";
		
		console.log(data);
		
		res.render('tpl/product_detail', data);
	});
};

exports.tagsuggest = function(req, res){
	var params = "_t=M3LSX4w4uv13KdvcK6HcJfYjb8Z8ywHh4vbDhnKVYIMThtSu9jf3HrSrGxbPX42PAmVkVD69EL6fZiZsfIyfmTmlRfcKMhIXjVJfrwk27d0=&category="
		+ (req.params.category || "") + "&w=" + (req.query.word || "");
		
	//params = "_t=" + (req.session.user_s_token || '') + "&pn=" + (req.params.pagenumber || "1");
	console.log(params);
	debugger;
	dotserver.invokeapi('/dot/tag/suggest', params, function(err, respData) {
		var data = {};
		if (err) {
			data["errmsg"] = "Fetch data failed.";
		} else {
			try {
				data = eval('(' + respData + ')');
				if (data.flag == 0) {
					data["moment"] = require("moment");
					data["errmsg"] = "";
				} else {
					data.errmsg = data.msg;
				}
			} catch (e) {
				console.error(e.stack);
				data = {};
				data["errmsg"] = "Fetch data failed.";
			}
		}
		
		data["title"] = "Products";
		
		var respData = JSON.stringify(data);
		//console.log(data);
		
		res.write(respData);
		res.end();
	});
};

exports.productsearch = function(req, res){
	var params = "_t=M3LSX4w4uv13KdvcK6HcJfYjb8Z8ywHh4vbDhnKVYIMThtSu9jf3HrSrGxbPX42PAmVkVD69EL6fZiZsfIyfmTmlRfcKMhIXjVJfrwk27d0="
		+ (req.params.category || "") + "&keywords=" + (req.query.word || "");
	if (req.params.category)
		params += "&category=" + req.params.category;
	if (req.query.word)
		params += "&keywords=" + req.query.word;
	
	params += "&pn=" + (req.query.pn || 1);
		
	//params = "_t=" + (req.session.user_s_token || '') + "&pn=" + (req.params.pagenumber || "1");
	console.log(params);
	debugger;
	dotserver.invokeapi('/dot/product/search', params, function(err, respData) {
		var data = {};
		if (err) {
			data["errmsg"] = "Fetch data failed.";
		} else {
			try {
				data = eval('(' + respData + ')');
				if (data.flag == 0) {
					data["moment"] = require("moment");
					data["errmsg"] = "";
				} else {
					data.errmsg = data.msg;
				}
			} catch (e) {
				console.error(e.stack);
				data = {};
				data["errmsg"] = "Fetch data failed.";
			}
		}
		
		data["title"] = "Products";
		
		var respData = JSON.stringify(data);
		//console.log(data);
		
		res.write(respData);
		res.end();
	});
};