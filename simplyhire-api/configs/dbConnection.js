const mongoose = require("mongoose");

const dbConnection = async ()=>{
    try{
        const connectionStatus = await mongoose.connect(process.env.MONGO_URL, {dbName:"simplyHire"})
        console.log(`DataBase Connected Successfully. 🚨PORT:${connectionStatus.connection.port}`.warn);
    }catch(error){
        console.log(`Unable to connect DB${error}`.error);
    }

}

module.exports = dbConnection;

