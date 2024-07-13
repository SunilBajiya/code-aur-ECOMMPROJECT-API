// const { default: mongoose } = require("mongoose")

const mongoose = require("mongoose")
//  /*
//   name 
//   userId
//    passwords
//     email
//      userType
//  */

 const userSchema = new mongoose.Schema({ 
 name:{
 type :String,
 required:true
        },
        userId:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        email:{
             type:String,
             required:true,
             lowercase:true,
             minLenght:10,
             unique:true
        },
        userType:{
            type:String,
            required:true,
            default:"CUSTOMER",
            enum:["CUSTOMER","ADMIN"]

        }
      },{timestamps:true,versionKey:false}
    );

//     mongoose.model("User",userSchena)
// this is create a collections 
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
