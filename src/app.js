const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");

const app = express();

//midlleware to get the data and conver to json
app.use(express.json());


app.post("/signup", async (req, res) => {
    const userObj = req.body;
    const user = new User(userObj)

    try {
        await user.save();

        res.send("user created sucessfully");
    } catch (err) {
        res.status(400).send("Error Saving the user:", err.message);
    }



})

//get all the user from the database
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.findOne({ emailId: userEmail });
        if (users.length === 0) {
            res.status(400).send("user Not found")
        } else {
            res.send(users);

        }

    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(404).send("No user avaialable")
    }
})

connectDB().then(() => {
    console.log("Database connected Sucessfully")
    app.listen(7777, () => {
        console.log("Sucessfully listen to port 7777")
    })
}).catch(err => {
    console.error("Database cannot be connected")
})
