// server.js

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Configure bodyParser to parse JSON
app.use(bodyParser.json());

// MongoDB connection URI
const MONGODB_URI = 'mongodb://localhost:27017/Bank_Customer';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define schema for the Bank_Customer collection
const customerSchema = new mongoose.Schema({
    AccNo: Number,
    AccHolderName: String,
    AccType: String,
    balance: Number
});

// Create a model based on the schema
const Customer = mongoose.model('Customer', customerSchema);

// CRUD operations

// Create operation
app.post('/customers', async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Retrieve operation
app.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
