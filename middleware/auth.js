const jwt = require("jsonwebtoken");
const Register = require("../module/db");




const auth = async function(req, res, next){
    try{
      
        const token = req.cookies.jwt;
       const verifyUser = await jwt.verify(token, process.env.SECRETKEY);
       console.log(verifyUser);
      
       const user = await Register.findOne({_id:verifyUser.id});
       console.log(user);

       req.token = token;
       req.user = user;

       next();

      

    } catch (error){
     
       res.status(401).send(error);

    }
};

module.exports = auth;