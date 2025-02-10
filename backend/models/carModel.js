const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    bodyStyle: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    capacity: { type: Number, required: true },
    fuelType: { type: String, required: true },
    transmissionType: { type: String, required: true },
    rating: { type: Number, default: 0 },
    bookedTimeSlots: [{
        from: { type: String, required: true },
        to: { type: String, required: true }
    }],
    rentPerHour: { type: Number, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
}, { timestamps: true })

const carModel = mongoose.model('cars' , carSchema)
module.exports = carModel