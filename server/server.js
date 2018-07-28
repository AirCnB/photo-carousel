const express = require('express');
const db = require('../database/index.js');

const app = express();
const port = 3001;

app.use('/aircnb/:id', express.static('public'));

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

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;

db.getData();
