const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require("path");

//rendering html
app.use('/static',express.static('Public'));
//root page
app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname,'index.html'));
})
app.get('/signup',(req,res) => {
    res.sendFile(path.join(__dirname,'signup.html'));
})
app.get('/index',(req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
})



//rendering mysql
const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'redirect'
})
db.connect((err) => {
  if(err ) throw err;
  console.log('DATABASE CONNECTED!!!');
})

//use bodyParser() to let us get the data from a POST
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var opn = require('opn');

//post method to get the input feild data from recruiter side
app.post('/recruiter',(req,res) => {
  const id = req.body.id;
  const username = req.body.email;
  console.log(id + username);
  const password = req.body.password;
  if(id=="" || username=="" || password==""){
      res.send('All Feilds are Mandatory');
  }
  else{
    console.log(req.body);
    let sql = `SELECT * FROM recruiter WHERE ID = ${id}`;
    db.query(sql,(err,results)=>{
            if(err)  res.send('not found!!!');
            console.log('>> results: ', results );
            var string=JSON.stringify(results);
            console.log('>> string: ', string );
            var json =  JSON.parse(string);
            console.log('>> json: ', json);
            console.log('>> user.name: ', json[0].username);
            if(json[0].username==username && json[0].password==password){
                var urls = "http://www.bing.com/;https://www.facebook.com/;https://www.google.com/";
                res.redirect('/close');
                for (var i = 0; i < urls.split(';').length; i++) {
                    opn(urls.split(';')[i]);
                }

            }
            else{
                res.send("404 not found");
            }
    })
  }
})

app.get('/close',(req,res) => {
    res.sendFile(path.join(__dirname,'close.html'));
})

//post method to get the input feild data from candidate side
app.post('/candidate', (req,res) => {
    const id = req.body.id1;
    const username = req.body.email1;
    const password = req.body.password1;
    console.log(req.body);
    if(id=="" || username=="" || password==""){
        res.send('All Feilds are Mandatory');
    }
    else{
      console.log(id);
      let sql = `SELECT * FROM candidate WHERE ID = ${id}`;
      db.query(sql,(err,results)=>{
              if(err)  res.send('not found!!!');
              console.log('>> results: ', results );
              var string=JSON.stringify(results);
              console.log('>> string: ', string );
              var json =  JSON.parse(string);
              console.log('>> json: ', json);
              console.log('>> user.name: ', json[0].username);
              if(json[0].username==username && json[0].password==password){
                  var urls = "http://www.bing.com/";
                  for (var i = 0; i < urls.split(';').length; i++) {
                      opn(urls.split(';')[i]);
                  }
                  res.redirect('/close');
              }
              else{
                  res.send("404 not found");
              }
      })
    }
})



app.post('/cr',(req,res) => {
    const id = req.body.id;
    const username = req.body.email;
    console.log(id + username);
    const password = req.body.password;
    if(id=="" || username=="" || password==""){
        res.send('All Feilds are Mandatory');
    }
    else{
        console.log(req.body);
        let sql = `INSERT INTO recruiter(id,username,password) VALUES ('${id}','${username}','${password}');`;
        db.query(sql,(err,results)=>{
            if(err)  throw err;
            else {
                var urls = "http://www.bing.com/;https://www.facebook.com/;https://www.google.com/";
                res.redirect('/close');
                for (var i = 0; i < urls.split(';').length; i++) {
                    opn(urls.split(';')[i]);
                }
            }
        })
    }
})

//post method to get the input feild data from candidate side
app.post('/cc', (req,res) => {
    const id = req.body.id1;
    const username = req.body.email1;
    const password = req.body.password1;
    console.log(req.body);
    if(id=="" || username=="" || password==""){
        res.send('All Feilds are Mandatory');
    }
    else{
        console.log(id);
        let sql = `INSERT INTO candidate (id,username,password) VALUES ('${id}','${username}','${password}');`;
        db.query(sql,(err,results)=>{
            if(err)  res.send('error , try again!!!');
            else {
                console.log(results);
                var urls = "http://www.bing.com/";
                for (var i = 0; i < urls.split(';').length; i++) {
                    opn(urls.split(';')[i]);
                }
                res.redirect('/close');;
            }
        })
    }
})





//port
var server = app.listen('3000',() => {
    console.log('Server Started on port 3000');
})

