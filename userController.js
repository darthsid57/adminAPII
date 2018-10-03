var User = require('./userModel.js');

exports.list_all_users = function(req, res){
    User.getAllUsers(function(err, user){
        console.log('controller')
        if(err)
            res.send(err);
            console.log('res', user);
        res.send(user);
    });
};