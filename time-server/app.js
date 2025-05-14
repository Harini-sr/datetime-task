const express = require('express');
const moment = require('moment-timezone');
const path = require('path');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3600;

app.use(cors());

app.use(express.static(path.join(__dirname, 'dist/task/browser')));

// Country to timezone mapping
const timezoneMapping = {
    "India": "Asia/Kolkata",
    "America": "America/New_York",
    "Australia": "Australia/Sydney",
    "UK": "Europe/London"
};

// API endpoint
app.get('/api/Time/GetTimeByCountry', (req, res) => {
    try {
        const country = req.query.country;

        if (!country) {
            return res.status(400).json({ error: "Country is required" });
        }

        if (!timezoneMapping[country]) {
            return res.status(400).json({ error: `Unsupported country: ${country}` });
        }

        const timezone = timezoneMapping[country];
        const localTime = moment().tz(timezone);

        res.json({
            time: localTime.format('hh:mm:ss A'),
            date: localTime.format('YYYY-MM-DD')
        });

    } catch (error) {
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
});

app.get(/^\/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/task/browser/index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Time API listening on port ${port}`);
});
