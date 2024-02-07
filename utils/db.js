require("dotenv").config();
const mongoose = require("mongoose");

//first npm i mongoose
//then require mongoose here 
//open cmd and type mongosh it will provide you with the URI and copy and paste it here 
//const URI = "mongodb://127.0.0.1:27017/mernAdmin"
// mongoose.connect(URI)

const URI =process.env.MONGODB_URI;//the uri containing the password and username is secured using .env file
const connectDb = async() => {
    try{
        await mongoose.connect(URI);  //use mongoose.connect(URI) and pass the URI as the parameter 
        console.log('CONNECTION SUCCESSFUL!!!');
    }
    catch(error)
    {
        console.error("Database Connection Failed !!");
        process.exit(0);
    }
};

module.exports = connectDb;// export it and then import in server.js