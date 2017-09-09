var User = require('../models/user').User;

module.exports = function(req, res, next){

	if(req.session.user_id){
		User.findById(req.session.user_id, function(err, doc){
			if(err){
				console.log('Sessison Created error: ' + err);
				res.redirect("/")
			}else{
				console.log('Continue Sessison or Created... ok ')
				res.locals = { user: doc };
				next();
			}
		});
	}	else {
		console.log("there is NO session");
		res.redirect("/");
		
	}
}
