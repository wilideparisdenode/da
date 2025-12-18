import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_DB_CONNECTION_STRING ||""

export const c = async (): Promise<void> => {
  try {
    const connection= await mongoose.connect(MONGO_URI);
    if(connection)  console.log('✅ MongoDB connected Hello');
  
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
