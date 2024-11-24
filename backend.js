const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API: Quizfragen abrufen
app.get('/api/questions', (req, res) => {
  const questions = JSON.parse(fs.readFileSync('./data/questions.json', 'utf8'));
  res.json(questions);
});

// API: Ergebnisse speichern
app.post('/api/results', (req, res) => {
  const newResult = req.body;
  const results = JSON.parse(fs.readFileSync('./data/results.json', 'utf8'));
  results.push(newResult);
  fs.writeFileSync('./data/results.json', JSON.stringify(results, null, 2));
  res.status(201).send('Result saved');
});

// API: Ergebnisse abrufen
app.get('/api/results', (req, res) => {
  const results = JSON.parse(fs.readFileSync('./data/results.json', 'utf8'));
  res.json(results);
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
