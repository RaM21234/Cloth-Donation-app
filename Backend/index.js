const express = require('express');
const mongoose = require('mongoose');
const profileRoutes = require('./routes/profile'); // Adjust the path accordingly
const dateRoutes = require('./routes/date');
const app = express();
const port = process.env.PORT || 3000;


const dbURI = 'mongodb+srv://bankkapda:KapdaBank91@cluster0.kmsmqlp.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());

app.use('/profile', profileRoutes);
app.use('/date', dateRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
