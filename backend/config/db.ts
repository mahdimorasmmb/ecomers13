import mongoose from "mongoose";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
  };
  
  // Create cached connection variable
  const connection = { isConnected: 0 };
  
  const DB_URI = process.env.DB_URI;
  
  const connectDb = async () => {
    if (connection.isConnected) {
      // use cached connection when available
      return;
    }
    try {
      const dbConnection = await mongoose.connect(process.env.DB_URL, options);
      connection.isConnected = dbConnection.connections[0].readyState;
    } catch (err:any) {
      console.error(`error connecting to db ${err.message || err}`);
    }
  };
  
  export { connectDb };