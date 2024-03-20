const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Save form data to JSON file
app.get('/api/getAllData', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(JSON.parse(data));
    });
  });

app.get('/api/getDataByName/:name', (req, res) => {
const name = req.params.name;
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
    return;
    }
    const users = JSON.parse(data);
    const filteredUsers = users.filter(user => user.name === name);
    res.json(filteredUsers);
    });
});
app.get('/api/getDataByDOB/:dob', (req, res) => {
    const dob = req.params.dob;
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      const users = JSON.parse(data);
      const filteredUsers = users.filter(user => user.DOB === dob);
      res.json(filteredUsers);
    });
  });
  
  // Get user data by age
app.get('/api/getDataByAge/:age', (req, res) => {
const age = parseInt(req.params.age);
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
    return;
    }
    const users = JSON.parse(data);
    const filteredUsers = users.filter(user => user.age === age);
    res.json(filteredUsers);
});
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
});

app.post('/api/saveData', (req, res) => {
  const formData = req.body;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const jsonData = JSON.parse(data);
    jsonData.push(formData);
    fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ message: 'Data saved successfully' });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
