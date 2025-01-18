const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

app.use(express.json());

const dbConnection = require('./db');
const usersRoute = require('./routes/usersRoute')
const carsRoute = require('./routes/carsRoute')
const bookingsRoute = require('./routes/bookingsRoute')
const Car = require('./models/carModel');

app.use(cors({
  origin:["https://mern-car-rental-app.vercel.app/"],
  methods:["GET","POST", "PUT", "DELETE"],
  credentials: true
}))


const port = process.env.PORT || 5000;


app.use("/api/cars/", require("./routes/carsRoute"));
app.use("/api/users/", require("./routes/usersRoute"));
app.use("/api/bookings/", require("./routes/bookingsRoute"));


//----------deployment-----------------
__dirname = path.resolve();
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV==="production") {
 app.use(express.static(path.join(__dirname,"/frontend/build")));

 app.get('*',(req,res)=>{
   res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
 });
}else{
	app.get("/", (req, res)=>{
      res.send("API is running..");
	});
}


//----------deployment-----------



app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));
