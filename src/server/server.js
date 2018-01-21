var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var todos = [
  {"id": 1, "text": "Hello, world!"},
  {"id": 2, "text": "Pick up groceries", "status": "complete"}
];

app.get('/', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

//Additional Routes - active, completed, archived

app.get('/active', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

app.get('/completed', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

app.get('/archived', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

app.get('/todos', function(req, res) {
  res.json(todos);
});

app.get('/todos/:id', function(req, res) {
  var id = req.params.id;
  var index = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  res.json(todos[index]);
});

app.post('/todos', function(req, res) {
  var text = req.body.data.text;
  if (!text) {
    return res.status(400).json({"message": "text is required"});
  }

  var id = todos.length + 1;

  var newTodo = { "id": id, "text": text, "status": "active" };
  todos.push(newTodo);

  res.json(todos);
});

app.delete('/todos/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var index = todos.findIndex( todo => {
    return todo.id === id;
  });

  let todo = todos[index]
  todos.splice(index, 1)

  res.json(todos);
});

app.patch('/todos', function(req, res) {
  for(let i=0; i<todos.length; i++) {
    if (todos[i].status === "complete") {
      todos[i].archive = true
    }
  }
  res.json(todos);
});

app.put('/todos', function(req, res) {
  for(let i=0; i<todos.length; i++) {
    if (todos[i].status === "active") {
      todos[i].status = "complete"
    }
  }
  res.json(todos);
});

app.put('/todos/:id', function(req, res) {
  var id = req.params.id;
  var status = req.body.data.status
  var archive = req.body.data.archive
  var index = todos.findIndex(function(todo) {
    return todo.id == id;
  });

  todos[index].status = status
  todos[index].archive = archive

  res.json(todos[index]);
});

// Node server.
var port = 3000;
var server = app.listen(port, function() {
  console.log('SERVER STARTED LISTENING ON PORT ' + port);
});

// Dev server.
var devServer = require('../../tools/development-server');
var devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});
