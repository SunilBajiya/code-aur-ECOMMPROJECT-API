/* 
 post location hear to create 
  
 PIST localhost:8888/ecomm/api/v1/auth/signup

*/


const authController = require("../controllers/auth.controller")
const authMW = require("../middlewares/auth.mw")
module.exports = (app) => {// here app is argument the call the end of the sign app

    app.post("/ecomm/api/v1/auth/signup",[authMW.verifysignUpBody],authController.signup)// this routed accept the sign up 
// this is direct call the auther about the request 

/*

 routes for post call*/
 app.post("/ecomm/api/v1/auth/signin",authController.signin) // define both in the signin api is ready 
}