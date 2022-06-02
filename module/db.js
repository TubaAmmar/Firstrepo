const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const  connectionParams = {
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}

mongoose.connect("mongodb://localhost:27017/firstdatabase" , connectionParams).then(() => console.log("connection successful")).catch((err) => console.log(err));


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
    },

    tokens: [{
        token : {
            type : String,
            required : true
        }
    }]

    


});


schema1.methods.generateAuthtoken = async function(){
    try{
        console.log(this.id);
        const token = jwt.sign({_id:this._id.toString()}, "mynameistubaammarwebdeveloper");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    } catch (error){
        res.send("the error part" + error);
        console.log("the error part" + error);

    }
}

schema1.pre("save" , async function(next){
   if(this.isModified("userpassword")){
       console.log(`current password is ${this.userpassword}`);
       this.userpassword = await bcrypt.hash(this.userpassword, 10);
       console.log(`current password is ${this.userpassword}`);
       next();
   }
   
}
    )


const Register = new mongoose.model("Register", schema1);

module.exports = Register;