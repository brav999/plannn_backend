import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env['MONGO_URI'] as string;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      // Add other necessary options here, such as authSource, retryWrites, etc.
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
