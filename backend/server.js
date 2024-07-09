const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./userModel.js");
require("dotenv").config();

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Middleware
app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Server is running'); // Send a simple message indicating server is running
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login request received for username: ${username}`);

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log(`User not found for username: ${username}`);
      return res.status(400).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log(`Invalid password for username: ${username}`);
      return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret_key', { expiresIn: '1h' });

    console.log(`Login successful for username: ${username}`);
    res.status(200).json({ token });
  } catch (error) {
    console.error(`Error during login for username ${username}:`, error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
