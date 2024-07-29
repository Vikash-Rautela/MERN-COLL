const { MongoClient } = require('mongodb');

const dbConnect = async () => {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Database connected successfully');
        return client;
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = { dbConnect };
