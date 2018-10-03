module.exports = function(app) {
    var users = require('./userController');

    app.route('/users')
        .get(users.list_all_users);
};