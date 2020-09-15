var express =require('express');
var path = require('path');
var app = express();
const port = process.env.PORT || 1337;

var MIS;

app.use(express.static('public'));
let config = {
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'data'
};

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'/info.html'));
})
app.get('/profile',function (req,res){
    let mysql  = require('mysql');
    let connection = mysql.createConnection(config);
    let sql = `SELECT * FROM database WHERE MISNo = ${MIS};`;
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
        }
    })

})

app.get('/sqlin',function (req,res){
    var Name = req.query.FullName;
    var MisNo = req.query.Mis;
    var MobileNo = req.query.MobileNo;
    var Address = req.query.Address;
    var Age = req.query.Age;
    var Institute = req.query.Institute;
    var ResumeURL = req.query.ResumeURL;
    var EmailID = req.query.EmailID;

    MIS = MisNo;

    let mysql  = require('mysql');
    let connection = mysql.createConnection(config);
    let sql = `INSERT INTO database(MISNo,Name,Institute,Age,MobileNo,Address,ResumeURL,EmailID) VALUES (${MisNo},'${Name}','${Institute}',${Age},'${MobileNo}','${Address}','${ResumeURL}','${EmailID}');`;
    connection.query(sql,function (error,rows,fields){
        if(!!error){
            
            return res.sendFile(path.join(__dirname,'/info1.html'));
        }else{
            res.redirect('/profile');
        }
    });
    connection.end();
})
app.listen(port);
