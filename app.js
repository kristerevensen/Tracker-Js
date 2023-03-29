const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db'); // Import the database connection

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/collect', (req, res) => {
  const { trackingId, sessionId, eventType, url, referrer, timestamp } = req.body;

  // Store the tracking data in the MySQL database
  const query = 'INSERT INTO tracking_data (tracking_id, session_id, event_type, url, referrer, timestamp) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [trackingId, sessionId, eventType, url, referrer, timestamp];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
