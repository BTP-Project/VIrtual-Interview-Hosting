var express =require('express');
var path = require('path');
var app = express();
const port = process.env.PORT || 1337;
const bodyParser=require('body-parser');

var MIS;

app.use(bodyParser.urlencoded({extended: false}))

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

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.get('/profile',function (req,res){
    let mysql  = require('mysql');
    let connection = mysql.createConnection(config);
    let sql = `SELECT * FROM databae WHERE MISNo = ${MIS};`;
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
    let sql = `INSERT INTO databae(MISNo,Name,Institute,Age,MobileNo,Address,ResumeURL,EmailID) VALUES (${MisNo},'${Name}','${Institute}',${Age},'${MobileNo}','${Address}','${ResumeURL}','${EmailID}');`;
    connection.query(sql,function (error,rows,fields){
        if(!!error){
            
            return res.sendFile(path.join(__dirname,'/info1.html'));
        }else{
            return res.redirect('/profile');
        }
    });
    connection.end();
})
app.listen(port);