const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://namasteDev:Kisu123@namstenode.rufpegc.mongodb.net/devTinder"
    );
}

module.exports = connectDB;

