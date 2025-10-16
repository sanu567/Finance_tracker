import mongoose from "mongoose";

const connectDB = async ()=>{

    mongoose.connection.on('connected',()=>console.log("DataBase is connected"))
    await mongoose.connect(`${process.env.MONGODB_URL}/finance-tracker`);
}
export default connectDB;