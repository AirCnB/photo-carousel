const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();

app.use('/aircnb/:id', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/photos/:id', (req, res) => {
  const id = Number(req.params.id);
  db.reDirect(id, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
});

app.post('/saved', (req, res) => {
  const request = Object.keys(req.body)[0].split(', ');
  const reqId = request[0];
  const reqVal = request[1];
  db.updateSave(reqId, reqVal, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
});

// app.listen(port, () => {
//   console.log('Listening on port', port);
// });

module.exports = app;

db.getData();
