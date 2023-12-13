// create the server
const express = require("express");
const app = express();

// static routing
app.use("/", express.static("./client"));

//server
let port = 8080;
app.listen(port, () => {
  console.log("server is running on port " + port);
});

// html routing
const { check, validationResult } = require("express-validator");
const { get } = require("prompt");
let formValidation = getFormValidation();
app.use(express.urlencoded({ extended: false }));
// form post
app.post("/process", formValidation, (request, response) => {
  //reading form data
  //post = request.body.name
  //get = request.query.name
  const errors = validationResult(request);
  let msg = "";
  if (!errors.isEmpty()) {
    msg = "<h1>we found a validation errors</h1>";
    msg += printErrors(errors.array());
    response.send(msg);
  } else {
    const name = request.body.name;
    const email = request.body.email;
    const number = request.body.number;
    const subject = request.body.subject;
    const message = request.body.message;

    addUser(name, email, number, subject, message);
    msg =
      "<h1>thank you your submition has been sent.</h1> <p><a href='ContactUs.html'>click to return</a></p>";
    response.send(msg);
  }
});

function printErrors(errArray) {
  let errors = [];
  for (let index = 0; index < errArray.length; index++) {
    let err = errArray[index]["msg"];
    let msg = "<p>-" + err + "</p>";
    errors.push(msg);
  }
  return errors.join("");
}

function getFormValidation() {
  return [
    check("name")
      .isString()
      .withMessage("inter your name")
      .isLength({ min: 1, max: 20 })
      .withMessage("max name is 20")
      .matches("[A-Za-z+]")
      .withMessage("name must consist of letters only")
      .trim()
      .escape(),
    check("email")
      .isEmail()
      .withMessage("email must be in the forma z@y.z")
      .trim()
      .escape(),
    check("number")
      .isLength({ min: 10, max: 10 })
      .withMessage("number must be 10 numbers")
      .isNumeric()
      .withMessage("enter numbers"),
    check("subject").trim().escape(),
    check("message").trim().escape(),
  ];
}

function addUser(name, email, number, subject, message) {
  const mysql = require("mysql2");
  let db = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    port: "",
    database: "AiTodoApp",
  });

  db.connect(function (err) {
    //sql command
    let sql = `INSERT INTO user (name, email, number, subject, message) VALUE ('${name}', '${email}', '${number}', '${subject}', '${message}')`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("record has been added");
      db.end;
    });
  });
}

//get submition
app.get("/record", (request, response) => {
  // const name = request.query.name;
  // const email = request.query.email;
  // const number = request.query.number;
  // const subject = request.query.subject;
  // const message = request.query.message;

  let msg = "";

  // getRecord(name, email, number, subject, message);
  msg = "<h1>thank you </h1>";
  // getData()

  // response.send(response);
  // response.send(result)

  const mysql = require("mysql2");
  let db = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    port: "",
    database: "AiTodoApp",
  });

  db.connect(function (result) {
    //sql command
    let sql = `SELECT * FROM user`;
    db.query(sql, function (err, result) {
      let data = result;
      if (err) {
        throw err;
      } else {
        console.log(result);
      }
    });
    // console.log(result)
    db.end;
  });
});

// function getRecord(result) {
//     const mysql = require("mysql2");
//     let db = mysql.createConnection({
//         host: "127.0.0.1",
//         user: "root",
//         password: "root",
//         port: "8889",
//         database: "AiTodoApp"
//     })

//     db.connect(function(result) {
//         //sql command
//         let sql = `SELECT name FROM user`;
//         db.query(sql, function(err, result) {
//             if(err) {
//                 throw err;
//             } else {

//                 return result
//                 db.end
//             }
//         })
//     })
// }

// app.post("/todo", (request, response) => {
//     const task = request.body.task;
//     addTask(task);
//     response.send("todo added")
// })

// function addTask(task) {
//     const mysql = require("mysql2");
//     let db = mysql.createConnection({
//         host: "127.0.0.1",
//         user: "root",
//         password: "root",
//         port: "8889",
//         database: "AiTodoApp"
//     })

//     db.connect(function(err) {
//         //sql command
//         let sql = `INSERT INTO tasks (task) VALUE ('${task}')`;
//         db.query(sql, function(err) {
//             if(err) throw err;
//             console.log("task has been added")
//             db.end
//         })
//     })
// }
