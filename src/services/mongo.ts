import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default {
  init: async () => {
    try {
      let uri = process.env.MONGO_URI!;
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("MongoDB connected uri: " + uri);
    } catch (error: any) {
      console.error("Error connecting to MongoDB:", error.message);
      process.exit(1);
    }
  }
};