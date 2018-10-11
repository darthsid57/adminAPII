
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
 
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'traseable'
});
 
// connect to database
mc.connect();
 
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
 
// Retrieve all todos 
app.get('/users', function (req, res) {
    mc.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send(JSON.stringify({ error: false, data: results, message: 'Todos list.' }));
    });
});
 
// // Search for todos with ‘bug’ in their name
// app.get('/todos/:keyword', function (req, res) {
//     let keyword = req.params.keyword;
//     mc.query("SELECT * FROM tasks WHERE task OR id LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: 'Todos search list.' });
//     });
// });
 
// Retrieve todo with id 
app.get('/users/:id', function (req, res) {
 
    let user_id = req.params.id;
 
    mc.query('SELECT * FROM users where user_id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Todos list.' });
    });
 
});
 
// Add a new todo  
app.post('/users', function (req, res) {
 
    let user_firstname = req.body.user_firstname;
 
    if (!user_firstname) {
        return res.status(400).send({ error:true, message: 'Please provide User firstname' });
    }
 
    mc.query("INSERT INTO users SET ? ", { user_firstname: user_firstname }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New User has been created successfully.' });
    });
});

//  Update todo with id
app.put('/users/:id', function (req, res) {
 
    let user_id = req.body.id;
    let user_firstname = req.body.user_firstname;
    let user_lastname = req.body.user_lastname;
    let task = req.body.task;
 
    if (!task_id || !task) {
        return res.status(400).send({ error: task, message: 'Please provide task and task_id' });
    }
 
    mc.query("UPDATE users SET user_firstname = ? WHERE user_id = ?", [task, task_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
    });
});
 
//  Delete todo
app.delete('/users/:id', function (req, res) {
 
    let user_id = req.params.id;
 
    mc.query('DELETE FROM users WHERE user_id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
    });
});

// Retrieve all todos 
app.get('/vessels', function (req, res) {
    mc.query('SELECT * FROM vessels', function (error, results, fields) {
        if (error) throw error;
        return res.send(JSON.stringify({ error: false, data: results, message: 'Todos list.' }));
    });
});

 
// all other requests redirect to 404
app.all("*", function (req, res) {
    return res.status(404).send('page not found')
});
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});
 
// allows "grunt dev" to create a development server with livereload
//module.exports = app;