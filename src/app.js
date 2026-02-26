const express = require("express");

const app = express();

//request handler fn
app.use("/", (req, res) => {
    res.send("hello from the server");
})


app.listen(3000, () => {
    console.log("Sucessfully listen to port 3000")
})