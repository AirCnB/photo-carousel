const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();

app.use('/listings/:id', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3001, () => {
  console.log('Listening on port ', 3001);
});

app.get('/api/listings/:id/photos', (req, res) => {
  const id = Number(req.params.id);
  db.reDirect(id, (err, docs) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(docs);
    }
  });
});

app.post('/saved', (req, res) => {
  const request = Object.keys(req.body)[0].split(', ');
  const reqId = request[0];
  const reqVal = request[1];
  db.updateSave(reqId, reqVal, (err, docs) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(docs);
    }
  });
});

module.exports = app;
