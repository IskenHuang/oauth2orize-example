/**
 * Module dependencies.
 */
var passport = require('passport')
  , login = require('connect-ensure-login')


exports.index = function(req, res) {
	var _code = req.query.code,
		_token = req.query.token || '[YOUR_TOKEN]';
	if(req.query.code){
		res.redirect('/oauth/token?code=' + _code);
	}else{
		res.render('index', { token: _token});
	}
  //res.send('OAuth 2.0 Server: http://localhost:3000/dialog/authorize?redirect_uri=http://localhost:3000&response_type=code&client_id=abc123');
};

exports.loginForm = function(req, res) {
  res.render('login');
};

exports.login = passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' });

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}

exports.account = [
  login.ensureLoggedIn(),
  function(req, res) {
    res.render('account', { user: req.user });
  }
]

exports.token = function( req, res){
	var _code = req.query.code || '';
	res.render('token', { code: _code});
}

