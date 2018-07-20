const express = require('express');
const db = require('../database/index.js');

const app = express();
const port = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('req path '. req.path)
  res.send(req.path)
})

app.listen(port, () => {
  console.log('Listening on port', port);
});

db.getData();
