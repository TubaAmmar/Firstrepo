const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/firstdatabase").then(() => console.log("connection successful")).catch((err) => console.log(err));


const schema1 = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },

    useremail : {
        type : String,
        required : true,
        unique : true
    },

    userphone : {
        type : Number ,
        required : true,
        unique: true
    },

    userpassword : {
        type : String,
        required : true
    }


});


const Register = new mongoose.model("Register", schema1);

module.exports = Register;