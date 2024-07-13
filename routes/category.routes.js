const authMw = require("../middlewares/auth.mw")

/**
 * 
 * locahost connection url * 
 *✔ complete the category ✨
 */
 category_controller = require("../controllers/category.controller")// connect the category controller
 auth_Mw = require("../middlewares/auth.mw")
 
 module.exports = (app)=> {// this check the admin the and not 

    app.post("/ecomm/api/v1/categories",[auth_Mw.verifyToken,auth_Mw.isAdmin],category_controller.createNewCategory) // define both in the signin api is ready 

 }