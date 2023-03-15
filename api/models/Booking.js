const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, required:true},
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    name: {type:String, required:true},
    phone: {type:String, required:true},
    price: Number,
})


const BookingsModel = mongoose.model('booking', bookingsSchema);

module.exports = BookingsModel;