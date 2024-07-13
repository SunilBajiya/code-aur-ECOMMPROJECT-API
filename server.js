// /*
// this will be the starting file of the project

// */


//  const express = require("express");

//   const mongoose = require("mongoose");
//    const app = express();
//    const server_config=  require("./confligs/server.config")
//    const db_config =require("./confligs/db.config")
//    //express types is funtion 

//    const user_model =require("./models/user.model")

//    const  bcryptjs= require("bcryptjs")



//    mongoose.connect(db_config.DB_URL); // Pass the connection URI instead of the object

//    const db = mongoose.connection;
   
//    db.on("error",()=>{
//     console.log("error while connection to the mongodb")
//    })

//    db.once("open", ()=>{
//     console.log("connected the mongodb")
//     init()
//    })



//     async function init(){
//         try {
           
//             if(user){
//                 console.log("Admin is already persent")
//                 return
//              }
    
//             let user =  await user_model.findOne({userId :"admin"})

//         } catch (error) {
//             console.log("error while reading the data")
            
//         }
       
      
//          try {
//             user = await  user_model.create({
//                  name:"sunil kumar",
//                  userId:"admin",
//                  email:"sunil@gmail.com",
//                  userType:"ADMIN",
//                  password: bcryptjs.hashSync("welcome",8)// this is create always new words
//             })
            
//             console.log("admin creeadted",user)
//          } catch (error) {
//             console.log("Error while create admin ",error)
            
//          }
//     }
//     /*

    
//     // create an admin user at the starting of the application
//      start the server
//     */ 
//    // connection with mongodb
//     mongoose.connect(db)




    

// // this is change the  server port
//       app.listen(server_config.PORT,()=>{
//    console.log("server started  at port num:",server_config.PORT);
//       })



const express = require("express");
const mongoose = require("mongoose");
const app = express();
const server_config = require("./confligs/server.config");
const db_config = require("./confligs/db.config");
const user_model = require("./models/user.model");
const bcryptjs = require("bcryptjs");
  app.use(express.json()); // this is middle ware it is json script , 
// Connect to MongoDB
mongoose.connect(db_config.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to MongoDB");
});

db.once("open", async () => {
  console.log("Connected to MongoDB");
  await init();
});

async function init() {
  try {
    let user = await user_model.findOne({ userId: "al22" });
    if (user) {
      console.log("Admin is already present");
      return;
    }

    user = await user_model.create({
      name: "alg",
      userId: "al22",
      email: "al24@gmail.com",
      userType: "ADMIN",
      password: bcryptjs.hashSync("al212", 8)
    });

    console.log("Admin created", user);
  } catch (error) {
    console.log("Error while initializing:", error);
  }
}



/* 
stich the route to the server
*/
// call the routes the call here 
require("./routes/auth.routes")(app)// all the connect here 
require("./routes/category.routes")(app)// connection  when any get a request firstly come in server.js 

// this is basical tels which way to goes

// Start the server
app.listen(server_config.PORT, () => {
  console.log("Server started at port:", server_config.PORT);
});

