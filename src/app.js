const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt");
const validator = require("validator")

const app = express();

//midlleware to get the data and conver to json
app.use(express.json());

//create user
app.post("/signup", async (req, res) => {
    try {

        //validation of data
        validateSignUpData(req)

        //encrypt the password and then store in the database
        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })

        await user.save();

        res.send("user created sucessfully");
    } catch (error) {
        res.status(400).send("Error :" + error.message);
    }



})

//login api

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!validator.isEmail(emailId)) {
            throw new Error("not an valid email");
        }

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("email id is not present in DB");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            res.send("Login SucessFull");
        } else {
            throw new Error("invalid email or password")
        }

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})

//get  user from the database on the basis of query
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
//get user by userid
app.get("/user/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const getUserById = await User.findById({ _id: userId });
        res.send(getUserById);
    } catch (error) {
        res.status(404).send("user id not found");
    }

})
//get all user
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(404).send("No user avaialable")
    }
})
//delete user by user id
app.delete("/user", async (req, res) => {
    const userId = req.body.id;
    try {
        await User.findByIdAndDelete({ _id: userId })
        res.send("User deleted successfully");
    } catch (err) {
        res.status(400).send("UserId not found to delete")
    }
})
//update user by user id

app.patch("/user", async (req, res) => {
    const userId = req.body.id;
    console.log(userId)
    const data = req.body;

    const ALLOWED_UPDATE = [
        "photoUrl", "about", "gender", "age", "skills"
    ]

    try {

        const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATE.includes(k));

        if (!isUpdateAllowed) {
            throw new Error("update not allowed");
        }
        await User.findByIdAndUpdate({ _id: userId }, { data }, { returnDocument: "after", runValidators: true })
        res.send("user updated sucessfully");
    } catch (err) {
        res.status(404).send("user id not find to update")
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
