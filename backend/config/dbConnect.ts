import mongoose from "mongoose";

const connection = { isConnected: 0 };

async function connect() {
  try {
    if (connection.isConnected) {
     

      return;
    }
    if (mongoose.connections.length > 0) {
      
      
      connection.isConnected = mongoose.connections[0].readyState;
     

      if (connection.isConnected === 1) {
        return;
      }
      await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.DB_URL);
    connection.isConnected = db.connections[0].readyState;
  
    
  } catch (error) {
    throw new Error("ter");
  }
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = 0;
    }
  }
}

const db = { connect, disconnect };

export default db;
