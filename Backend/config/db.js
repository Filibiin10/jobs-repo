import chalk from "chalk";
import mongoose from "mongoose";

const ConnectDB =async () => {
    const uri = process.env.MONGODB_URI
    mongoose.connect(uri)
  .then(() => console.log(`MongoDB connected ${chalk.green(uri)}`))
  .catch(err => console.log("not connected"));

}

export default ConnectDB;