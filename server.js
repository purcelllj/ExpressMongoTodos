const express = require('express');
const bodyParser = require('body-parser');
const conf = require('./conf')
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')   
})
const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect(conf.mongoUri, (err, client) => {
    if (err) return console.log(err);
    db = client.db('liamdb')
    
    app.listen(8080, () => console.log('listening on port 8080'));
})


app.post('/todos', (req, res) => {
    db.collection('todos').save(req.body, (err, result) => {
        if(err) return console.log(err)
        console.log('Record saved to db.')
        res.redirect('/todos')
    })
})

app.get('/todos', (req, res) => {
    db.collection('todos').find().toArray( (err, results) => {
        if(err) return console.log(err)
        res.render('index.ejs', {todos: results})
    })
})



