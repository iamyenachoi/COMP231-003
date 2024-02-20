const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5500;
app.use(cors());
app.use(express.json());
app.use(require("./routes/RestaurantRoutes"));
app.use(require('./routes/DinerRoutes'))
// get driver connection
const dbo = require("./db/conn");

// app.get('/restaurants/:id', async (req,res)=>{
//   const {id} = req.params.id;

// })


app.listen(port, async () => {
    // perform a database connection when server starts
    await dbo.connectToServer(function (err) {
      if (err) console.error(err);
    });
    console.log(`Server is running on port: ${port}`);
  });
