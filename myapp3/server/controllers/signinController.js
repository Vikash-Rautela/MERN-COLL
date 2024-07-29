const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dbConnect } = require('../config/db');

const signIn = async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    const client = await dbConnect();
    const usersCollection = client.db('sample').collection('users');

    try {
        const user = await usersCollection.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        user.password = undefined;

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Logged in successfully', user, token });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in', error });
    } finally {
        await client.close();
    }
};

module.exports = { signIn };
