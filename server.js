const express = require("express");
var cors = require("cors");
const app = express();
const path = require("path"); // use to find file path
const fs = require("fs");

//sqlite database
// var sqlite3 = require("sqlite3").verbose();

// // var db = new sqlite3.Database("./mailSystem.db");

// // db.serialize(function() {
// //    db.run('CREATE TABLE MAIL (address TEXT)')
// // });
// // db.close();

const port = process.env.PORT || 4000; // run server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use(express.static(__dirname + "/ITRECRUIT_WEB"));
// Parse JSON bodies (as sent by API clients)

app.use(express.static(__dirname + "/build"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

// app.use(express.static(__dirname + "/mailSubcribe.txt"));
// app.use(function(req, res, next) {
//   if (!req.path.includes("api") && !req.path.includes("assets")) {
//     res.sendFile(__dirname + "/ITRECRUIT_WEB/index.html");
//   }
// });
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
