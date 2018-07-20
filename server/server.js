const express = require('express');
const db = require('../database/index.js');

const app = express();
const port = 3001;

app.use(express.static('public'));

let stuff;

app.get('/newPage', (req, res) => {
  res.send(stuff)
})

app.get('/:id', function(req, res){
  let id = req.params.id;
  db.reDirect(id, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      stuff = docs;
      let path = 'index.html';
      res.sendFile(path, {root: './public'});
    }
  })

});

app.listen(port, () => {
  console.log('Listening on port', port);
});

db.getData();
