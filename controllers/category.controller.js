/**
 * 
 * content for creating a category 
 * 
 * post localhost:8888/ecpmm/api/v1/categories
 * 
 * 
 * {
 *  "name":"sunil",
 * "description":"This will have all the household items"
 * }
 *  */  

const category_model = require("../models/category.model")

exports.createNewCategory =  async (req,res) =>{

    //read the req body 
    // create the category object 
    const cat_date ={
        name:req.body.name,
        description:req.body.description
    }

   
//          try {
//             const category = await category_model.create(cat_date);
//             return res.status(201).send(category);
//         } catch (error) {
//             console.log("Error while creating the category", error); // Corrected syntax here
//             return res.status(500).send({
//                 message: "Error while creating the category"
//             });
//         }
        
//     // insert into monogodb
//     //return the respomse of the create about 
// }

try {
    const category = await category_model.create(cat_date);
    return res.status(201).send(category);
} catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        return res.status(400).send({
            message: "Category name already exists."
        });
    } else {
        console.error("Error while creating the category", error);
        return res.status(500).send({
            message: "Error while creating the category"
        });
    }

}

}