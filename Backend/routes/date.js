const express = require('express');
const router = express.Router();
const User = require('../models/DateSchema'); // Replace with your actual model name

// Add a date to the array
router.post('/addDate/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      // If user does not exist, create a new user with the initial date
      user = new User({
        _id: req.params.id,
        preferredDates: [req.body.date]
      });
    } else {
      // If user exists, add the date to the existing array
      user.preferredDates.push(req.body.date);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update the entire date array
router.put('/updateDates/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { preferredDates: req.body.dates },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Fetch the entire date array
router.get('/getDates/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user.preferredDates);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // Delete a particular date
// router.delete('/deleteDate/:id/:dateIndex', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     user.preferredDates.splice(req.params.dateIndex, 1);
//     await user.save();
//     res.json(user);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

module.exports = router;
