const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'ems',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
  console.log('MySQL connected...');
});

app.post('/api/events', (req, res) => {
  const { eventType, eventName, eventDate, eventLocation, description, invitationMessage, guests, package } = req.body;

  if (!eventType || !eventName || !eventDate || !eventLocation || !description || !invitationMessage || !guests || !package) {
    return res.status(400).send('Missing required fields.');
  }

  const sqlEvent = 'INSERT INTO events (eventType, eventName, eventDate, eventLocation, description, invitationMessage, package) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const valuesEvent = [eventType, eventName, eventDate, eventLocation, description, invitationMessage, JSON.stringify(package)];

  db.query(sqlEvent, valuesEvent, (err, result) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).send('Failed to save event. Please try again later.');
    }

    const eventId = result.insertId;

    const sqlGuests = 'INSERT INTO guests (eventId, name, email) VALUES ?';
    const valuesGuests = guests.map(guest => [eventId, guest.name, guest.email]);

    db.query(sqlGuests, [valuesGuests], (err) => {
      if (err) {
        console.error('Error executing query:', err.message);
        return res.status(500).send('Failed to save guests. Please try again later.');
      }
      res.status(200).send('Event and guests saved successfully!');
    });
  });
});

app.get('/api/events', (req, res) => {
  const sql = `
    SELECT e.*, g.name AS guestName, g.email AS guestEmail
    FROM events e
    LEFT JOIN guests g ON e.id = g.eventId
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching events:', err.message);
      return res.status(500).send('Failed to fetch events. Please try again later.');
    }

    const events = results.reduce((acc, row) => {
      let event = acc.find(e => e.id === row.id);
      if (!event) {
        event = {
          id: row.id,
          eventType: row.eventType,
          eventName: row.eventName,
          eventDate: row.eventDate,
          eventLocation: row.eventLocation,
          description: row.description,
          invitationMessage: row.invitationMessage,
          package: JSON.parse(row.package),
          guests: []
        };
        acc.push(event);
      }
      if (row.guestName) {
        event.guests.push({ name: row.guestName, email: row.guestEmail });
      }
      return acc;
    }, []);

    res.status(200).json(events);
  });
});

app.get('/api/guests', (req, res) => {
  const { eventId } = req.query; 
  let sql = 'SELECT e.eventName, g.name, g.email FROM events e JOIN guests g ON e.id = g.eventId';
  let params = [];

  if (eventId) {
    sql += ' WHERE e.id = ?';
    params.push(eventId);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error fetching guests:', err.message);
      return res.status(500).send('Failed to fetch guests. Please try again later.');
    }
    res.status(200).json(results);
  });
});

app.delete('/api/guests/:guestId', (req, res) => {
  const { guestId } = req.params;

  const sqlCheck = 'SELECT * FROM guests WHERE id = ?';
  
  db.query(sqlCheck, [guestId], (err, results) => {
    if (err) {
      console.error('Error checking guest:', err.message);
      return res.status(500).send('Failed to check guest. Please try again later.');
    }
    if (results.length === 0) {
      return res.status(404).send('Guest not found');
    }

    const sqlDelete = 'DELETE FROM guests WHERE id = ?';
    
    db.query(sqlDelete, [guestId], (err, result) => {
      if (err) {
        console.error('Error deleting guest:', err.message);
        return res.status(500).send('Failed to delete guest. Please try again later.');
      }
      res.status(200).send('Guest deleted successfully');
    });
  });
});

app.get('/api/event-details', (req, res) => {
  const { eventId } = req.query;

  if (!eventId) {
    return res.status(400).send('Event ID is required.');
  }

  const sql = `
    SELECT e.eventName, e.eventDate, g.name AS guestName, g.email AS guestEmail
    FROM events e
    LEFT JOIN guests g ON e.id = g.eventId
    WHERE e.id = ?
  `;

  db.query(sql, [eventId], (err, results) => {
    if (err) {
      console.error('Error fetching event details:', err.message);
      return res.status(500).send('Failed to fetch event details. Please try again later.');
    }

    if (results.length === 0) {
      return res.status(404).send('Event not found');
    }

    // Debugging: log the raw results to inspect them
    console.log('Event details fetched:', results);

    const eventDetails = {
      eventName: results[0].eventName,
      eventDate: results[0].eventDate,
      guests: results.map(row => ({
        name: row.guestName,
        email: row.guestEmail
      })).filter(guest => guest.name && guest.email) 
    };

    // Debugging: log the formatted eventDetails to verify correctness
    console.log('Formatted event details:', eventDetails);

    res.status(200).json(eventDetails);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
