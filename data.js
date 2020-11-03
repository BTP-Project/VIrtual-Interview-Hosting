var express =require('express');
var path = require('path');
var app = express();
const port = process.env.PORT || 1337;
const bodyParser=require('body-parser');
const open = require('open');
var RecOrCan = 0;

var MIS;

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('public'));
let config = {
    host    : 'sql12.freesqldatabase.com',
    user    : 'sql12374191',
    password: 'dNtslwJJ95',
    database: 'sql12374191'

    // host    : 'localhost',
    // user    : 'root',
    // password: '',
    // database: 'virtualinterviewplatform'
};

app.get('/info',function(req,res){
    res.sendFile(path.join(__dirname,'/info.html'));
})
app.get('/rinfo',function(req,res){
    res.sendFile(path.join(__dirname,'/rinfo.html'));
})
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/home.html'));
})
app.get('/home',function(req,res){
    res.sendFile(path.join(__dirname,'/home.html'));
})
app.get('/signin',function (req,res){
    res.sendFile(path.join(__dirname,'signin.html'));
})

app.get('/contactus',function (req,res){
    res.sendFile(path.join(__dirname,'/ContactUs.html'))
})

app.get('/features',function (req,res){
    res.sendFile(path.join(__dirname,'/feature.html'))
})

app.get('/signup',(req,res) => {
    res.sendFile(path.join(__dirname,'signup.html'));
})

app.get('/signin',(req,res) => {
    res.sendFile(path.join(__dirname,'signin.html'));
})

app.get('/feedback',function(req,res){
    res.sendFile(path.join(__dirname,'feedback.html'));
})
app.get('/server',function(req,res){
    res.sendFile(path.join(__dirname,'servers.html'));
})
app.get('/forget',function(req,res){
    res.sendFile(path.join(__dirname,'/forgetpage.html'));
});

app.get('/result',(req,res) => {
    if(RecOrCan==1){
        res.sendFile(path.join(__dirname,'HomePageRecruter.html'));
    }else{
        res.sendFile(path.join(__dirname,'HomePageCandidate.html'));
    }

})

app.get('/ResultRec',(req,res) => {
    res.sendFile(path.join(__dirname,'HomePageRecruter.html'));
})
app.get('/ResultCan',(req,res) => {
    res.sendFile(path.join(__dirname,'HomePageCandidate.html'));
})

app.get('/user1',function(req,res){
    res.sendFile(path.join(__dirname,'public/user1.html'));
})
// app.get('/user',function(req,res){
//     console.log("hoo");
//     res.sendFile(path.join(__dirname,'views/user.pug'));
// })
app.get('/update',function (req,res) {
    res.sendFile(path.join(__dirname, '/update.html'))
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var nodeMailer = require('nodemailer');
var transport=nodeMailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:'virtualinterviewbtp@gmail.com',
        pass:'abc123@123'
    }
})

app.post('/feedback1',(req,res) => {

    var mis = req.body.MISNo;
    var feedback = req.body.Feedback;
    var subject = req.body.Subject;

    console.log(req.body.feedback);

    var mailOptions={
        from:'preritkrjha2001@gmail.com',
        to:'virtualinterviewbtp@gmail.com',
        subject:mis+' '+subject,
        text:feedback
    }
    transport.sendMail(mailOptions,function(error,info){
        if(error){
            console.warn(error);
            res.redirect('/feedback');
        }
        else{
            console.warn("EMAIL sent",info.responce);
            res.redirect('/');
        }
    })

})

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.get('/profile',function (req,res){
    let mysql  = require('mysql');
    let connection = mysql.createConnection(config);
    let sql = `SELECT * FROM formdatabase WHERE MISNo = ${MIS};`;
    connection.query(sql,function (error,result,fields) {
        if (!!error) {
            res.sendFile(path.join(__dirname, '/info1.html'));
        } else {
            // console.log(result);
            var misno = result[0].MISNo;
            var name = result[0].Name;
            var institute = result[0].Institute;
            var age = result[0].Age;
            var mobileno = result[0].Address;
            var resumeurl = result[0].ResumeURL;
            var emailid = result[0].EmailID;

            res.render('profile.ejs',{
                MisNo: misno,
                Name: name,
                Institute: institute,
                Age: age,
                MobileNo: mobileno,
                ResumeURL: resumeurl,
                EmailID: emailid
            });
        }
    })

})

app.post('/candidate', (req,res) => {
    const id = req.body.id1;
    const username = req.body.email1;
    const password = req.body.password1;
    console.log(req.body);
    // if(id=="" || username=="" || password==""){
    //     res.send('All Feilds are Mandatory');
    // }
    MIS=id;
    RecOrCan = 0;
        console.log(id);
        let sql = `SELECT * FROM candidate WHERE ID = ${id}`;
        let mysql  = require('mysql');
        let connection = mysql.createConnection(config);
        connection.query(sql,(err,results)=>{
            if(err)  res.send('not found!!!');
            console.log('>> results: ', results );
            var string=JSON.stringify(results);
            console.log('>> string: ', string );
            var json =  JSON.parse(string);
            console.log('>> json: ', json);
            console.log('>> user.name: ', json[0].username);
            if(json[0].username==username && json[0].password==password){
                // var urls = "http://www.bing.com/";
                // for (var i = 0; i < urls.split(';').length; i++) {
                //     opn(urls.split(';')[i]);
                // }
                res.redirect('/profile');
            }
            else{
                res.sendFile(path.join(__dirname,'signin1.html'));
            }
        })

})

app.post('/recruiter',(req,res) => {
    const id = req.body.id;
    const username = req.body.email;
    console.log(id + username);
    const password = req.body.password;

    RecOrCan =1;
    // if(id=="" || username=="" || password==""){
    //     res.send('All Feilds are Mandatory');
    // }
    //else{
    MIS = id;
        console.log(req.body);
        let sql = `SELECT * FROM recruiter WHERE ID = ${id}`;
        let mysql  = require('mysql');
        let connection = mysql.createConnection(config);
        connection.query(sql,(err,results)=>{
            if(err)  res.send('not found!!!');
            console.log('>> results: ', results );
            var string=JSON.stringify(results);
            console.log('>> string: ', string );
            var json =  JSON.parse(string);
            console.log('>> json: ', json);
            console.log('>> user.name: ', json[0].username);
            if(json[0].username==username && json[0].password==password){
                // var urls = "http://www.bing.com/;https://www.facebook.com/;https://www.google.com/";
                res.redirect('/profile');
                // for (var i = 0; i < urls.split(';').length; i++) {
                //     opn(urls.split(';')[i]);
                //}

            }
            else{
                res.sendFile(path.join(__dirname,'signin1.html'));
            }
        })
    //}
})

app.post('/cr',(req,res) => {
    const id = MIS;
    const username = req.body.email;
    //console.log(id + username);
    const password = req.body.password;
    // if(id=="" || username=="" || password==""){
    //     res.send('All Feilds are Mandatory');
    // }
    //else{
    RecOrCan =1;
        console.log(req.body);
        var misno = MIS;
        let sql = `INSERT INTO recruiter(id,username,password) VALUES ('${misno}','${username}','${password}');`;
        let mysql  = require('mysql');
        let connection = mysql.createConnection(config);
        connection.query(sql,(err,results)=>{
            if(err)  res.sendFile(path.join(__dirname,'signup1.html'));
            else {
                //var urls = "http://www.bing.com/;https://www.facebook.com/;https://www.google.com/";
                res.redirect('/profile');
                // for (var i = 0; i < urls.split(';').length; i++) {
                //     opn(urls.split(';')[i]);
                // }
            }
        })
    //}
})

//post method to get the input feild data from candidate side
app.post('/cc', (req,res) => {
    //
     const id = MIS;
    const username = req.body.email1;
    const password = req.body.password1;
    console.log(req.body);
    // if(id=="" || username=="" || password==""){
    //     res.send('All Feilds are Mandatory');
    // }
   // else{
    RecOrCan =0;
        console.log(id);
        var misno = MIS;
        let sql = `INSERT INTO candidate (id,username,password) VALUES ('${misno}','${username}','${password}');`;
        let mysql  = require('mysql');
        let connection = mysql.createConnection(config);
        connection.query(sql,(err,results)=>{
            if(!!err) {
                //res.send('error , try again!!!');
                res.sendFile(path.join(__dirname,'signin1.html'));
            }
            else {
                console.log(results);
                //var urls = "http://www.bing.com/";
                // for (var i = 0; i < urls.split(';').length; i++) {
                //     opn(urls.split(';')[i]);
                // }
                res.redirect('/profile');;
            }
        })
   // }
})

app.post('/sqlin',function (req,res){
    var Name = req.body.FullName;
    var MisNo = req.body.Mis;
    var MobileNo = req.body.MobileNo;
    var Address = req.body.Address;
    var Age = req.body.Age;
    var Institute = req.body.Institute;
    var ResumeURL = req.body.ResumeURL;
    var EmailID = req.body.EmailID;

    MIS = MisNo;

    let mysql  = require('mysql');
    let connection = mysql.createConnection(config);
    let sql = `INSERT INTO formdatabase(MISNo,Name,Institute,Age,MobileNo,Address,ResumeURL,EmailID) VALUES (${MisNo},'${Name}','${Institute}',${Age},'${MobileNo}','${Address}','${ResumeURL}','${EmailID}');`;
    console.log(MisNo);
    console.log(Name);
    console.log(Institute);
    console.log(Age);
    console.log(MobileNo);
    console.log(Address);
    console.log(ResumeURL);
    console.log(EmailID);
    connection.query(sql,function (error,rows,fields){
        if(!!error){
            
            return res.sendFile(path.join(__dirname,'/info1.html'));
        }else{
            console.log(MisNo);
            return res.redirect('/signup');
        }
    });
    connection.end();
})

app.get('/initialize',function (req,res){
    let mysql  = require('mysql');
    let connection = mysql.createConnection(config);
    let sql = `CREATE TABLE formdatabase(
                    MISNo BIGINT UNIQUE,
                    Name VARCHAR(50),
                    Institute VARCHAR(100),
                    Age INT,
                    MobileNo VARCHAR(11),
                    Address VARCHAR(100),
                    ResumeURL VARCHAR(200),
                    EmailID VARCHAR(200),
                    PRIMARY KEY(MISNo));
                CREATE TABLE candidate (
                    id BIGINT,
                    username VARCHAR(50),
                    password VARCHAR(50),
                    PRIMARY KEY(id));
                CREATE TABLE recruiter (
                    id BIGINT,
                    username VARCHAR(50),
                    password VARCHAR(50),
                    PRIMARY KEY(id));`;

    connection.query(sql,function (error,rows,fields){
        if(!!error){
            return res.redirect('/');
        }else{
            console.log(error);
            return res.redirect('/initialze');
        }
    });
    connection.end();
})

app.post('/update',function (req,res){

    var Name = req.body.FullName;
    var MobileNo = req.body.MobileNo;
    var Address = req.body.Address;
    var Age = req.body.Age;
    var Institute = req.body.Institute;
    var ResumeURL = req.body.ResumeURL;
    var EmailID = req.body.EmailID;

    var MisNo = MIS

    let mysql  = require('mysql');
    let connection = mysql.createConnection(config);
    let sql = `UPDATE formdatabase SET Name ='${Name}',Institute='${Institute}',Age = ${Age},MobileNo = '${MobileNo}',Address = '${Address}',ResumeURL = '${ResumeURL}',EmailID ='${EmailID}' WHERE MISNo = ${MisNo};`;

    connection.query(sql,function (error,rows,fields){
        if(!!error){

            return res.sendFile(path.join(__dirname,'/update1.html'));
        }else{
            return res.redirect('/profile');
        }
    });
    connection.end();
})


var recruter1;
var candidate1;
var sql1;
var connection1;
app.post('/createtable',(req,res) => {


    console.log(req.body.recruiter);
    const recruiter = req.body.recruiter;
    recruter1 = recruiter;
    let sql = `CREATE TABLE if not exists ${recruiter}(
        ID INTEGER,
        Name VARCHAR(255),
        Rating1 INTEGER,
        Rating2 INTEGER,
        Rating3 INTEGER,
        Rating INTEGER,
        PRIMARY KEY(ID))`
    let mysql  = require('mysql');
    let connection = mysql.createConnection(config);
    connection.query(sql,(err,result)=> {
        if (err) {
            res.redirect("/");
        }
        else {
            console.log(result);

            res.send('DATABASE CREATED!!!');
            app.use('/', function (req, res) {
                res.sendFile(path.join(__dirname, '/Public/user1.html'));
            })
        }


    })
})

app.get('/sql',function (req,res){

    var name = req.query.Name;
    var mis=req.query.MisNumber;
    var dsa=req.query.DSA;
    var coding=req.query.CodingSkill;
    var comm=req.query.CommunicationSkill;
    var over=req.query.OverallSkill;
    if(mis==='')
    {
        return res.redirect('/user1.html');
    }
    else if(name==='')
    {
        return res.redirect('/user1.html');
    }
    else if(dsa==='')
    {
        return res.redirect('/user1.html');
    }
    else if(coding==='')
    {
        return res.redirect('/user1.html');
    }
    else if(comm==='')
    {
        return res.redirect('/user1.html');
    }
    else if(over==='')
    {
        return res.redirect('/user1.html');
    }
    //console.log('DATABASE CONNECTED!!!');
    let mysql  = require('mysql');
    let connection = mysql.createConnection(config);
    let sql =`INSERT INTO ${recruter1}(ID,Name ,Rating1,Rating2,Rating3,Rating) VALUES (${mis},'${name}',${dsa},${coding},${comm},${over});`;
    // let sql =`CREATE TABLE NEWTABLE(MIS INT, NAME VARCHAR(10));`;
    connection.query(sql,function (error,result,fields){
        if(!!error){
            // alert(
            console.log('error');
        }else{
            // console.log(candidate1);
            console.log("success");
            if(RecOrCan==1){
                return res.sendFile(path.join(__dirname,'/HomePageRecruter.html'));
            }
            return res.sendFile(path.join(__dirname,'/HomePageCandidate.html'));
            //  res.redirect('/HomePage.html');
        }
    })

})
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
var opn = require('opn');
app.post('/showtable', (req,res) => {
    console.log(req.body.candidate);
    const candidate = req.body.candidate;
    candidate1 = candidate;
    let sql = `Show TABLES LIKE '` + `${candidate}'`;
    let mysql  = require('mysql');
    let connection = mysql.createConnection(config);
    connection.query(sql, (err, result) => {
        if (err) res.redirect("/");
        console.log(result);
    })
    connection1 = mysql.createConnection(config);

    sql1=`SELECT * FROM ${candidate1};`;
    connection1.query(sql1,function (err,result)
    {
        if(err) res.redirect("/result")
        else{
            //open('https://virtual-interview-platform.herokuapp.com/user');
            // open('http://localhost:1337/user')
            //open('https://www.google.com/');
            //opn('https://virtual-interview-platform.herokuapp.com/user');
            res.redirect('/user');
            // res.sendFile(path.join(__dirname,'userres.html'));
        }

    })
})

app.get('/user',function (req,res)
{
    connection1.query(sql1,function (err,rows,fields)
    {
        if(err) {
            res.redirect("/");
        }
        else {
            res.render('user', {title: "Student Details", items: rows})
        }
    })

})

app.post('/forgetdata',function (req,res){

    const role =  req.body.role;
    const email = req.body.gmail;
    const password = req.body.passi;
    console.log(role,email,password);
    if(role == "stud"){
        let mysql  = require('mysql');
        let connection = mysql.createConnection(config);
        let sql = `UPDATE recruiter SET password ='${password}' WHERE username = '${email}'`;
        res.sendFile(path.join(__dirname,'/forgetpage.html'));
        connection.query(sql,(err,results)=>{
            if(err)  {
                console.log(err);
                res.sendFile(path.join(__dirname,'/forgetpage.html'));
            }
            else {
                res.redirect('/');
            }
        })
    }
    else{
        let mysql  = require('mysql');
        let connection = mysql.createConnection(config);
        let sql = `UPDATE candidate SET password ='${password}' WHERE username = '${email}'`;
        res.sendFile(path.join(__dirname,'/forgetpage.html'));
        connection.query(sql,(err,results)=>{
            if(err)  {
                console.log(err);
                res.redirect('/forget');
            }
            else {
                res.redirect('/');
            }
        })
    }
    res.redirect('/');
})

app.listen(port);