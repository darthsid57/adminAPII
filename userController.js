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

exports.create_a_user = function(req, res) {
    var new_user = new User(req.body);
  
    //handles null error 
     if(!new_user.user_firstname || !new_user.user_lastname){
  
              res.status(400).send({ error:true, message: 'Please provide task/status' });
  
          }
  else{
    
    User.createTask(new_user, function(err, user) {
      
      if (err)
        res.send(err);
      res.json(user);
    });
  }
  };

exports.get_a_user = function(req, res) {
    User.getUserByID(req.params.userID, function(err, user) {
        if(err)
            res.send(err);
        res.json(user);
    });
};

exports.update_a_user = function(req, res) {
    User.updateUserByID(req.params.userID, new User(req.body), function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  };
  

  exports.delete_a_user = function(req, res) {


    User.remove( req.params.userID, function(err, user) {
      if (err)
        res.send(err);
      res.json({ message: 'Task successfully deleted' });
    });
  };