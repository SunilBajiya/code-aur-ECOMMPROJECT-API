/* 
 create the middle ware will check the  reqiest body is proper and correct 
*/
// user modle 
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const auth_config = require("../confligs/auth.config")

const  verifysignUpBody =async (req,res,next)  =>{
    try {

        // validati code
        // check name , email,userID , if check the userID with dame userid is already presnedt
        if(!req.body.name){
         return  res.status(400).send({
            massage:"Failed ! name  was not provided in request body "
        })
    }

    if(!req.body.email){
        return  res.status(400).send({
           massage:"Failed ! Email  was  not provided in request body"
       })
   }
   if(!req.body.userId){
    return  res.status(400).send({
       massage:"Failed ! userId  was  not provided in request body"
   })
}

const user = await user_model.findOne({userID: req.body.userID})
if(user){
    return  res.status(400).send({
        massage:"Failed ! user with same userId is already present "
    })
}
next()
//move next
    } catch (error) 
    {
        console.log("Error ehile calidating the request object ",error)
        
        res.status(500).send({
            message:" Error while validating  the request body"
        })
    }
   // next()
}

const verifysignInBody = async (req,res,next)=>{
     if(!req.body.userId){
        return res.status(400).send({
            message:"UserId is not provided"
        })
     }
     if(!req.body.password){
        return res.status(400).send({
            message:"password is not provided"
        })
     }
     next()

}

 const verifyToken =(req,res,next) =>{
    // check the token is prsent in the header 
    const token = req.headers["x-access-token"]// this is token code 
    if(!token){
        return res.status(483).send({
            message:"NO token found : UnAuthorized"
        })
    }
    // 2 checke the valid token 
    jwt.verify(token,auth_config.secret, async(error,decode)=>{
        if(error){
            return res.status(401).send({
                message:"UnAuthorized"
            })
        }
        // passtoken is check the which id is gentate this token 
        const user = await user_model.findOne({userId: decode.id})
        if(!user){
            return res.status(400).send({
                message:"InAuthorized , this user for this token doesn't exist"
            })
        }

        // set the user info in the req body
        req.user= user
        next()
    })
    // valid then go the see you


 }

 const isAdmin =(req,res,next)=>{
    const user = req.user//can asccess the dirreactly
    if(user&& user.userType=="ADMIN"){
        next()
    }else{ 
        return res.status(403).send({
            message:"Only ADMIN users are allowes to access this endpoint"
        })
    }

 }


//user modle for dadtababase connnecetim
//logic to sifn up 
module.exports = {
   verifysignUpBody: verifysignUpBody,
   verifysignInBody: verifysignInBody,
   verifyToken :verifyToken,
   isAdmin :isAdmin
   
}

