import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://ppavia:Qwertyuiop@postmelon.5ew93.mongodb.net/postmelon?retryWrites=true&w=majority",
      {
        useFindAndModify: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`Db connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDb;
