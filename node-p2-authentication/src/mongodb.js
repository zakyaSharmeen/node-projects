const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginSignupTutorial")
.then(() => {
    console.log("mongodb connected");
    
})
.catch(() => {
    console.log("failed to coonect");
})


const logInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    }
})

const collection= new mongoose.model("Collection", logInSchema)

module.exports=collection