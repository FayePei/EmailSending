const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql2");
const server = express();
server.use(bodyParser.json());
const nodemailer = require("nodemailer");
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200', // Change this to your frontend's URL
};

server.use(cors(corsOptions));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "19961224",
    database: "emaillist1"

});


db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });


server.listen(8085,function check(error) {
    if (error) 
    {
    console.log("Error...");
    }
    else 
    {
        console.log("Started...8085");

    }
});


//ADD
server.post("/api/email/add", (req, res) => {
    let details = {
      User: req.body.User,
      Emailaddr: req.body.Emailaddr,
    };
  

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "peiziyan1996@gmail.com",
        pass: "pgefwbkdtfetsbtz"
      },
    });

    console.log("User Details:", details);

    const mailOptions = {
      from: "peiziyan1996@gmail.com",
      to: details.Emailaddr,
      subject: "Hi, "+ details.User +"! Welcome to Our App!!",
      text: "Hi, "+ details.User + "! Thank you for signing up!"+" We kept your email address: "+ details.Emailaddr+" in our datebase.",
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });


    let sql = "INSERT INTO Email SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "User and email created Failed" ,error});
      } else {
        res.send({ status: true, message: "User and email created successfully" });
      }
    });

  });


//GET
server.get("/api/email", (req, res) => {
    var sql = "SELECT * FROM Email";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });


//GET
server.get("/api/email/:id", (req, res) => {
    var idEmail = req.params.id;
    var sql = "SELECT * FROM Email WHERE idEmail=" + idEmail;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });


//UPDATE
server.put("/api/email/update/:id", (req, res) => {
    let sql =
      "UPDATE Email SET User='" +
      req.body.User +
      "', Emailaddr='" +
      req.body.Emailaddr +
      "'  WHERE idEmail=" +
      req.params.id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Email Updated Failed" });
      } else {
        res.send({ status: true, message: "Email Updated successfully" });
      }
    });
  });

//DELETE
  server.delete("/api/email/delete/:id", (req, res) => {
    var idEmail = req.params.id;
   
    db.query("SELECT User, Emailaddr FROM Email WHERE idEmail=?", [idEmail], (error, results) => {
      if (error) {
        console.log("Error fetching user details and email:", error);
        return;
      }
  
      const User = results[0].User;
      const Emailaddr = results[0].Emailaddr;

    // const transporter = nodemailer.createTransport({
    //   service: "Gmail",
    //   auth: {
    //     user: "peiziyan1996@gmail.com",
    //     pass: "pgefwbkdtfetsbtz"
    //   },
    // });
    
    const mailOptions = {
      from: "peiziyan1996@gmail.com",
      to: Emailaddr,
      subject: "Hi, "+ User +" ! Sorry to hear that you are leaving...",
      text: "Hi, "+ User +" We deleted your email address: "+ Emailaddr+" from our datebase.",
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email Error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    
    let sql = "DELETE FROM Email WHERE idEmail=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Email Deleted Failed" });
      } else {
        res.send({ status: true, message: "Email Deleted successfully" });
      }
    });
  });
});
  
  
///mail
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "peiziyan1996@gmail.com",
    pass: "pgefwbkdtfetsbtz",
  },
});
