const express = require('express');
const bodyParser = require('body-parser');
const driveRoutes = require('./routes/driveRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(bodyParser.json());
app.use('/drive', driveRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
