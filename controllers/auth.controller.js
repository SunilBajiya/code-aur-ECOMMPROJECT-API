/*


 i need to write the controller / to register a user
*/
// client -> application 
// applcaiotn can give the responce 
//controller handle both req and res 

const  bcrypt = require("bcryptjs")
const user_model = require("../models/user.model")
const UserModel = require("../models/user.model")
const secret = require("../confligs/auth.config")
 const jwt = require("jsonwebtoken")// this is give the token me new 
 exports.signup= async (req,res) =>  {

 //logic to create the user 
 //1. read the request body 
 // this is form of js object
 const request_body = req.body
 //2. insert the data in th e users collection in mongoDB
 const useObje = {
    name :request_body.name,
    userId:request_body.userId,
    email:request_body.email,
    password: bcrypt.hashSync(request_body.password,8)
 }
  //3.Resturn the responce back to the user 
try {

const user_created = await user_model.create(useObje)
const res_obj= {
    name:user_created.name,
    userId:user_created.userId,
    email:user_created.email,
    userType:user_created.userType,
    crearedAt:user_created.createdAt,
    updatedAt :user_created.updatedAt
}
/* 
 Return this user
*/
    res.status(201).send(res_obj)
} catch (error) {
    console.log("Error while regestering the user",error)
    res.status(500).send({
        message :"Some erro happedned  while registring the user"
    })
}

 }



  exports.signin = async (req,res)=>{
    try{
    // first checkthe  userid already present or not 
    const user= await user_model.findOne({userId: req.body.userId}) // find the userid 
     if(user == null){
         res.status(400).send({
            message:" User id passed is not valid user id"
         })
     }
    
    // password is correct        thsi compare the tow value amd returen ture false            this is normal string     this is encrepeted value 
    const isPasswordValid = bcrypt.compareSync(req.body.password,user.password)
    if(!isPasswordValid){ /// when passowrd is not match to return this 
         res.status(401).send({
            message: "Worng password passed"
          });
    }
    // reate the jwt 
    // using jwt we will create the accs tokem with a given TTl (time to leave) and reaturn 
    const token = jwt.sign({id:user.userId},secret.secret,{
        expiresIn :120// validity for token can use  in seconds
    })// which is best you want to create 
    // 200 is show every thing is well
    // this show data when fatch the data for token 

    res.status(200).send({
        name:user.name,
        userId :user.userId,
        email:user.email,
         userType :user.userType,
         accessToken:token
    });
} catch (error) {
    console.log("Error while signing in:", error);
    return res.status(500).send({
        message: "An error occurred while signing in"
    });
}

   
  }
