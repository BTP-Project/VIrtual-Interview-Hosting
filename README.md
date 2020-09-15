# RegistrationForm
Ths is a registraation form created in node js,html and css and stores data in 'mysql' database and displays output in new page.

<b> Things to be kept in mind:-</b>
<ul>
  <li>Database used is mysql and is running on phpmyAdmin.
   <li>The name of datadase is 'data'.
     <li>The name of table inside of which everything is stored is named as 'database', which can be created by writing following code in mySQL:<br>
       CREATE TABLE FormDatabase (
        MISNo INT,Name VARCHAR(20),
    Institute VARCHAR(40),
    Age INT,
    MobileNo VARCHAR(11),
    Address VARCHAR(50),
    ResumeURL TEXT,
    EmailID TEXT,
    PRIMARY KEY (MISNo)
    );
 </ul>
