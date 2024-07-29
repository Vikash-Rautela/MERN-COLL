const bcrypt = require('bcrypt');
const { dbConnect } = require('../config/db');

const signUp = async (req, res) => {
    const { name, email, password, contact } = req.body;
    const client = await dbConnect();
    const usersCollection = client.db('sample').collection('users');

    try {
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            name,
            email,
            password: hashedPassword,
            contact
        };

        await usersCollection.insertOne(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    } finally {
        await client.close();
    }
};

module.exports = { signUp };
