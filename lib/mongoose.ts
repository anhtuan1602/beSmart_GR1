import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URI) {
        throw new Error('MongoDB URI is missing');
    }

    if (isConnected) return console.log('=> using existing database connection');

    try {
        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;

        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
    }
}