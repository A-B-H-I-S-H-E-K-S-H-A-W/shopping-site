import { DB_NAME } from "@/constants/constants";
import { configDotenv } from "dotenv";
import { connect } from "mongoose";
configDotenv();

let isConnected = false;

const connectDB = async () => {
  try {
    if (isConnected) {
      return;
    }
    await connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    isConnected = true;
    console.log("MongoDB Connected :::: Connection Established");
  } catch (error) {
    console.log("Error connecting mongoDB ::::", error);
    throw error;
  }
};
