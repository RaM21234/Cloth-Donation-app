const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const { Profile } = require('../models/profileSchema');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    console.log(uid);

    const profile = await Profile.findOne({ uid });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const updateData = req.body; // Assuming the updated data is sent in the request body

    // Validate the update data or perform any necessary sanitization

    // Find the profile by UID and update it
    const updatedProfile = await Profile.findOneAndUpdate({ uid }, updateData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:uid/donation', async (req, res) => {
  try {
    const { uid } = req.params;

    const profile = await Profile.findOne({ uid });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const donations = profile.donations;
    res.status(200).json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const profileData = req.body;
    const newProfile = await Profile.create(profileData);
    res.status(201).json(newProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.post('/:uid/donation', upload.single('photo'), async (req, res) => {
  try {
    const { uid } = req.params;
    const { size, forChildren, clothName, PreferredDate, Address, Coordinates, Status } = req.body;
    const photo = req.file.buffer;

    console.log('Received data:', { uid, size, forChildren, clothName, PreferredDate, Address, Coordinates, Status });

    const profile = await Profile.findOne({ uid });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const newDonation = {
      size,
      forChildren,
      clothName,
      photo,
      PreferredDate: new Date(PreferredDate),
      Address,
      Coordinates,
      Status: parseInt(Status, 10)
    };

    profile.donations.push(newDonation);
    await profile.save();

    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/generate-otp', async (req, res) => {
  try {
    const { email } = req.body;

    const profile = await Profile.findOne({ email: email });
    if (!profile) {
      return res.status(404).json({ error: 'Email not found' });
    }

    // Generate OTP
    const otp = generateOTP();

    // Send OTP to the user's email
    const mailOptions = {
      from: 'bankkapda@gmail.com',
      to: email,
      subject: 'OTP for Verification',
      text: `Your OTP is: ${otp} \n Only Valid For a 5 minute so please hurry up`,
    };

    await transporter.sendMail(mailOptions);

    // Store the OTP in the database
    profile.otp = otp;
    await profile.save();

    // Set a timer to reset the OTP after 1 minute
    setTimeout(async () => {
      profile.otp = null;
      await profile.save();
    }, 5 * 60000); // 60000 milliseconds = 1 minute

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.post('/change-password', async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;

    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    profile.password = password;
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/verify-otp', async (req, res) => {
  try {
    const { otp } = req.body;
    const { email } = req.body;

    const profile = await Profile.findOne({ email: email });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Check if the provided OTP matches the stored OTP
    if (otp && profile.otp) {
      // OTP is valid, you can perform further actions here

      // Clear the OTP after verification
      if (otp === profile.otp) {
        profile.otp = undefined;
        await profile.save();

        res.status(200).json({ verified: true, uid: profile.uid, password: profile.password });
      }
      else {
        profile.otp = undefined;
        await profile.save();

        res.status(200).json({ verified: false });
      }

    } else {
      res.status(400).json({ verified: false, error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Use your email service details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bankkapda@gmail.com',
    pass: 'lalt hsqt tcqe stjo',
  },
});
// Helper function to generate OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};


module.exports = router;
