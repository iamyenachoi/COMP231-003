const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const dinerRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");


// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

dinerRoutes.route("/Diner/register").post(async (req,res) =>{
        const db_connect = dbo.getDb();
        const diner = {
            email: req.query.email,
            password: req.query.password,
            name: req.query.name,
            phone: req.query.phone
        }

        const check = await db_connect.collection("Diner")
        .findOne({email:diner.email})

        if(!check){
          db_connect.collection("Diner").insertOne(diner)
          .then((result)=>{
            res.json(result)
            console.log(result)
          })
          .catch((err)=>console.log(err))
        }
  })      

dinerRoutes.route('/Diner/:id').get(async (req, res) => {
    const db_connect = dbo.getDb();
    const id = req.params.id;
    console.log(id)
    await db_connect.findById(id,'Diner')
    .exec()
    .then((result)=>
        console.log(`Result : {result}`)
    ).catch((err)=>console.log(err))
})
    

module.exports  = DinerRoutes;