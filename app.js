const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 8000;


const staticPath = path.join(__dirname, "public");
//app.use(express.static(path.join(__dirname, "public")));
const templatePath = path.join(__dirname, "templates/views");
const partialPath = path.join(__dirname, "templates/partials");

app.use(express.static(staticPath));

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);


app.get("/", function (req, res){
    res.render('makeupproduct');
});


app.get("/", function (req, res){
    res.render('index');
});





app.get("/", function (req, res){
    res.sendFile(path.join(__dirname, "public", "Mainpage.html"));
});






app.listen(port, function() {
    console.log(`we are listing at ${port}`);
});