import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGO_DB_URI) {
        throw new Error('MongoDB URI is missing');
    }

    if (isConnected) return console.log('=> using existing database connection');

    try {
        await mongoose.connect(process.env.MONGO_DB_URI);

        isConnected = true;

        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error);
    }
}