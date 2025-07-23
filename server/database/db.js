import mongoose from "mongoose";
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/test`);
        console.log('MongoDB Connected');
    } catch (error){
        console.log("error occured", error);
    }
}
export default connectDB;