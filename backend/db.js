const mongoose = require("mongoose")
mongoose.set('strictQuery', false)
const url = "mongodb+srv://blogApp:TADA1212tada@cluster0.5h0hqo6.mongodb.net/blogApp?retryWrites=true&w=majority"

const dbConnnect = ()=>{
    mongoose.connect(url,(err,data)=>{
        if(err){
            return console.log("MONGODB ERROR:::::: ",err)
        }
        console.log("DB connected")
    })
    return mongoose.connection
}

module.exports = dbConnnect