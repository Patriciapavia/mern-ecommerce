import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://<patricia>:<7341>@mernconnector.qlwfc.mongodb.net/test",
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
