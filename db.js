const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = "mongodb://localhost:27017/hotels";
// const mongoURL = "mongodb+srv://test123:test123@test.wolfz.mongodb.net/hotels";
// const mongoURL = process.env.DB_URL;


mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
    console.log("MongoDB connected successfully");
});

db.on("error", () => {
    console.log("MongoDB connection failed");
});

db.on("disconnected" ,() => {
    console.log("MongoDB disconnected");
});

module.exports = db;