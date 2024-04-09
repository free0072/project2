const { google } = require('googleapis');

const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirect: process.env.GOOGLE_REDIRECT_URI, // e.g., 'http://localhost:3000/oauth2callback'
};

const oauth2Client = new google.auth.GoogleAuth({
    keyFile: "./keyFile.json",
    scopes: ["https://www.googleapis.com/auth/drive.file"], // Use the appropriate scope
  });


const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

module.exports = { googleConfig, oauth2Client, drive };
