// /src/services/googleDriveService.js
const { google } = require('googleapis');
const stream = require('stream');

class GoogleDriveService {
  constructor() {
    this.drive = google.drive({ version: 'v3', auth: new google.auth.GoogleAuth({
      keyFile: "./keyFile.json",
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    }) });
  }

  async uploadFile(reportFile) {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(reportFile.buffer);

    try {
      const driveResponse = await this.drive.files.create({
        media: {
          mimeType: reportFile.mimetype,
          body: bufferStream,
        },
        requestBody: {
          name: reportFile.originalname,
          parents: ["1tEvfhd1vy6tP0YyTDfbwHVc1dkny4-XV"],
        },
        fields: "id",
      });

      const fileId = driveResponse.data.id;

      // Make the file public (anyone with the link can view)
      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
      return directLink;
    } catch (error) {
      console.error('Error uploading file to Google Drive:', error);
      throw new Error('Failed to upload file to Google Drive');
    }
  }

}

module.exports = GoogleDriveService;
