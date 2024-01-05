const mongoose= require("mongoose");
require("dotenv").config()
exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(() => {
        const db=mongoose.connection;
        console.log("name",db.name)
        console.log("DB Connected Successfully")
    })
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};