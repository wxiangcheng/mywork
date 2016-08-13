exports.authorize = function(req, res, next) {
	if (!req.session.user_s_token && false) {
		res.redirect('/login.html');
	} else {
		next();
	}
}