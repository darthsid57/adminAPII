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

User.createAUser = function createAUser(newUser, result){
    sql.query("INSERT INTO users set ?", newUser, function (err, res){
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertID);
            result(null, res.insertID);
        }
    });
};

User.getUserByID = function getUserByID(userID, result){
    sql.query("SELECT * from users where user_id = ? ", userID, function(err, res){
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

User.updateUserByID = function updateUserByID(id, user, result){
    sql.query("UPDATE users SET user_firstname = ? WHERE user_id = ?",[user.user_firstname, id], function(err, res){
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

User.removeUserByID = function removeUserByID(id, result){
    sql.query("DELETE FROM users WHERE user_id = ?", [id], function (err, res){
        if(err){
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = User;