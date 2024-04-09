// /src/routes/driveRoutes.js
const express = require('express');
const multer = require('multer');
const driveController = require('../controllers/driveController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), driveController.uploadFileToDrive);

module.exports = router;
