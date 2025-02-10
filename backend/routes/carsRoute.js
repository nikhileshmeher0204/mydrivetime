const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");
const { auth, admin } = require("../middleware/auth");

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addcar", auth, admin, async (req, res) => {
  try {
    const newcar = new Car({
      ...req.body,
      addedBy: req.user._id // Add admin ID
    });
    await newcar.save();
    res.send("Car added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editcar", auth, admin, async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body._id });
    
    // Check if admin owns this car
    if(car.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({message: "Not authorized to edit this car"});
    }

    car.make = req.body.make;
    car.model = req.body.model;
    car.year = req.body.year;
    car.bodyStyle = req.body.bodyStyle;
    car.location = req.body.location;
    car.image = req.body.image;
    car.capacity = req.body.capacity;
    car.fuelType = req.body.fuelType;
    car.transmissionType = req.body.transmissionType;
    car.rentPerHour = req.body.rentPerHour;

    await car.save();
    res.send("Car details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletecar", auth, admin, async (req, res) => {
  try {
    const car = await Car.findOne({ _id: req.body.carid });
    
    // Check if admin owns this car
    if(car.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({message: "Not authorized to delete this car"});
    }

    await Car.findOneAndDelete({ _id: req.body.carid });
    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;