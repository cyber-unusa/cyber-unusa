import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));

  if (process.env.NODE_ENV !== "production") {
    //? Develop
    await mongoose.connect(`${process.env.MONGODB_URL}/test`);
  } else {
    //! Production
    await mongoose.connect(`${process.env.MONGODB_URL}/profile-cyber`);
  }
};

export default connectDB;
