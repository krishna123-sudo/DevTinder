const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send({ firstName: "krishna", lastName: "sekhar" });
})

app.post("/user", (req, res) => {
    res.send("data Svaed sucessfully");
})


app.delete("/user", (req, res) => {
    res.send("Deleted Sucessfully")
})

app.listen(7777, () => {
    console.log("Sucessfully listen to port 7777")
})