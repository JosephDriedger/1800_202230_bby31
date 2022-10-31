// https://expressjs.com/en/guide/routing.html


// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use("/text", express.static("./public/text"));

// Default Menu
app.get("/", function (req, res) {
    //console.log(process.env);
    // retrieve and send an HTML document from the file system
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});

// Log In Menu
app.get("/login", function (req, res) {
    let doc = fs.readFileSync("./app/html/login.html", "utf8");
    res.send(doc);
});

// Main Menu
app.get("/main", function (req, res) {
    let doc = fs.readFileSync("./app/html/main.html", "utf8");
    res.send(doc);
});

/* Dropdown Pages */

// Profile Page
app.get("/profile", function (req, res) {
    let doc = fs.readFileSync("./app/html/dropdown/profile.html", "utf8");
    res.send(doc);
});

// Notifications Page
app.get("/notifications", function (req, res) {
    let doc = fs.readFileSync("./app/html/dropdown/notifications.html", "utf8");
    res.send(doc);
});

// Routes Page
app.get("/routes", function (req, res) {
    let doc = fs.readFileSync("./app/html/dropdown/routes.html", "utf8");
    res.send(doc);
});

// Schedule Page
app.get("/profile", function (req, res) {
    let doc = fs.readFileSync("./app/html/dropdown/schedule.html", "utf8");
    res.send(doc);
});

// Password Reset Page
app.get("/passwordReset", function (req, res) {
    let doc = fs.readFileSync("./app/html/dropdown/passwordReset.html", "utf8");
    res.send(doc);
});

// Privacy Page
app.get("/privacy", function (req, res) {
    let doc = fs.readFileSync("./app/html/dropdown/privacy.html", "utf8");
    res.send(doc);
});

// Language Page
app.get("/language", function (req, res) {
    let doc = fs.readFileSync("./app/html/dropdown/language.html", "utf8");
    res.send(doc);
});

// Help Page
app.get("/help", function (req, res) {
    let doc = fs.readFileSync("./app/html/dropdown/help.html", "utf8");
    res.send(doc);
});

// Themes Page
app.get("/themes", function (req, res) {
    let doc = fs.readFileSync("./app/html/dropdown/themes.html", "utf8");
    res.send(doc);
});

//Schedule Page
app.get("/schedule", function (req, res) {
    let doc = fs.readFileSync("./app/html/dropdown/schedule.html", "utf8");
    res.send(doc);
});

// for resource not found (i.e., 404)
app.use(function (req, res, next) {
    // this could be a separate file too - but you'd have to make sure that you have the path
    // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});
