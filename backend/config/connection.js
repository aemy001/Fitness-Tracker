const mongoose = require("mongoose");

const ConnectDB = async()=>{
    try{
      const conn =  await mongoose.connect(process.env.MONGODB_CONNECTION_STRNG);
    }catch(error){
        console.log(error)
    }
}

module.exports = ConnectDB;