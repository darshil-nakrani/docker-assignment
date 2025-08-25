const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const BACKEND_URL = 'http://3.110.43.178:9000';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('This is the frontend (Node + Express)');
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', async (req, res) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/submit`, req.body);
    if (response.data.success) {
      res.redirect('/success');
    } else {
      res.send(`Error: ${response.data.message}`);
    }
  } catch (error) {
    console.error('Backend error:', error.message);
    res.status(500).send('Something went wrong with backend');
  }
});

app.get('/todo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'todo.html'));
});

app.post('/submit-todo', async (req, res) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/submit-todo`, req.body);
    if (response.data.success) {
      res.redirect('/success');
    } else {
      res.send(`Error: ${response.data.message}`);
    }
  } catch (error) {
    console.error('Backend error:', error.message);
    res.status(500).send('Something went wrong with backend');
  }
});

app.get('/success', (req, res) => {
  res.send('Data submitted successfully');
});

const PORT = 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server running at http://localhost:${PORT}`);
});




