const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://your-mongo-uri/safariRush', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Entry Schema
const entrySchema = new mongoose.Schema({
    type: String,
    name: String,
    email: String,
    tour: String,
    date: String,
    guests: String,
    message: String,
    customTourDesc: String,
    timestamp: String
});

const Entry = mongoose.model('Entry', entrySchema);

// API Endpoints
app.get('/api/entries', async (req, res) => {
    const entries = await Entry.find();
    res.json(entries);
});

app.post('/api/entries', async (req, res) => {
    const entry = new Entry(req.body);
    await entry.save();
    res.status(201).json(entry);
});

app.put('/api/entries/:id', async (req, res) => {
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(entry);
});

app.delete('/api/entries/:id', async (req, res) => {
    await Entry.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));