require("dotenv").config();
const axios = require('axios');
const moment = require('moment-timezone');

// Set the desired time zone (e.g., 'Asia/Kolkata' for IST)
moment.tz.setDefault('Asia/Kolkata');

const scheduleEmail = async (to, subject, text, scheduleTime) => {
  try {
    const response = await axios.post(`${process.env.MAILING_SERVICE_API}/api/emails`, {
      to,
      subject,
      text,
      scheduleDate: moment().format('YYYY-MM-DD'),
      scheduleTime,
      recurring: true,
    });

    console.log('Email scheduled successfully:', response.data);
  } catch (error) {
    console.error('Error scheduling email:', error.response.data);
  }
};

const sendEmailToUsers = async (subject, text, scheduleTime) => {
  const allUsers = await User.find({});

  for (const user of allUsers) {
    await scheduleEmail(user.email, subject, text, scheduleTime);
  }
};

// Schedule emails to be sent at 7:00 AM IST (1:30 AM GMT) every day
sendEmailToUsers('Daily Reminder', 'Please book your Breakfast', '01:30');

// Schedule emails to be sent at 12:00 PM IST (6:30 AM GMT) every day
sendEmailToUsers('Daily Reminder', 'Please book your Lunch', '06:30');