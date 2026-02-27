const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");

const app = express();


app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "krishna",
        lastName: "Sekhar",
        emailId: "kisu@12345",
        password: "kisu@123"
    }
    //create instance of the user model
    const user = new User(userObj)

    await user.save();

    res.send("user created sucessfully");

})


connectDB().then(() => {
    console.log("Database connected Sucessfully")
    app.listen(7777, () => {
        console.log("Sucessfully listen to port 7777")
    })
}).catch(err => {
    console.error("Database cannot be connected")
})
