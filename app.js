const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const Register = require("./module/db");
const bcrypt = require("bcryptjs");

const port = process.env.PORT || 8000;







const staticPath = path.join(__dirname, "public");
//app.use(express.static(path.join(__dirname, "public")));
const templatePath = path.join(__dirname, "templates/views");
const partialPath = path.join(__dirname, "templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(staticPath));


app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);


app.get("/", function (req, res){
  res.render('loginpage');
});

app.get("/signup", function (req, res){
  res.render('signup');
});


app.get("/index", function (req, res){
  res.render('index');
});



app.get("/makeupproduct", function (req, res){
  res.render('makeupproduct');
});



app.post("/", async (req, res) => {
  try{

   const firstRegister = new Register({
    username : req.body.username,
    useremail : req.body.useremail,
    userpassword : req.body.userpassword,
    userphone : req.body.userphone,
   });

   console.log("the success part" + firstRegister);

   const token = await firstRegister.generateAuthtoken();
   
   console.log("the token part" + token);
   
   const registered = await firstRegister.save();
   res.status(201).render("loginpage");
  } 
  catch(error){
      res.status(400).send(error);
  }
});

app.post("/login", async (req, res) => {
  try{
const email =  req.body.email;
const password =  req.body.password;

 const userdata = await Register.findOne({useremail:email});

 const isMatch = await bcrypt.compare(password,  userdata.userpassword );


 const token = await userdata.generateAuthtoken();
   
 console.log("the token part" + token);


 if ( isMatch){
  res.status(201).render("index");
}else{
    res.send("Invalid Data");
}  
 
} catch(error){
       res.status(400).send(error);
   }
 });  

 app.get("/", function (req, res){
  res.sendFile(path.join(__dirname, "public", "Mainpage.html"));
});




app.listen(port, function() {
  console.log(`we are listing at ${port}`);
});




















 












