var sql = require('./dbconnection.js');

var User = function(user){
    this.user = user.user;
    this.status = user.status;
    this.created_at = new Date();

};

User.getAllUsers = function getAllUsers(result){
    sql.query("SELECT * from users", function(err, res){
        if(err){
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('users :', res);
            result(null, res);
        }
    });
};

module.exports = User;