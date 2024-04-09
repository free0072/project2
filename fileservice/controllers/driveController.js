// /src/controllers/driveController.js
const GoogleDriveService = require('../service/googleDriveService');

const driveService = new GoogleDriveService();

exports.uploadFileToDrive = async (req, res) => {
  try {
    const reportFile = req.file; // Assuming you're using multer or a similar middleware for file handling
    const webViewLink = await driveService.uploadFile(reportFile);

    // Do something with the webViewLink, like storing it in your database
    return res.status(200).json({ message: 'File uploaded successfully', webViewLink });
  } catch (error) {
    console.error('Failed to upload file:', error);
    return res.status(500).json({ message: 'Failed to upload file' });
  }
};
