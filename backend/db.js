const mongoose = require("mongoose");
require("dotenv").config


function connectDB() {
  console.log(process.env.DATABASE_URL)
  console.log(process.env.NODE_ENV)
  mongoose.connect('mongodb://localhost:27017/car_rental_db', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
      console.log("MongoDB Connection Successful");
    })
    .catch((error) => {
      console.error("MongoDB Connection Error:", error);
    });
}

connectDB();

module.exports = mongoose;