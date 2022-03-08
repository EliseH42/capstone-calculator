const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json())
let {addNumbers, subNumbers, multNumbers, divNumbers, addHistory, deleteHistory} = require("./controller.js")

app.get("/add/:num1/:num2",addNumbers)
app.get("/subtract/:num1/:num2",subNumbers)
app.get("/multiply/:num1/:num2",multNumbers)
app.get("/divide/:num1/:num2",divNumbers)
app.post("/addHistory",addHistory)
app.delete("/delete/:ID",deleteHistory)



app.listen(4444,() => {
    console.log("running on port 4444")
})