const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/aircnb_photos');

let db = mongoose.conection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connection established');
})

let photoSchema = mongoose.Schema({
  id: { type: Number, unique: true, required: true}
  photos: [
    {
      url: String,
      desc: String
    }
  ]
});

let Page = mongoose.model('Page', photoSchema);

let seed = (data, callback) => {
  Page.insertMany(data, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, 'hello from database');
    }
  })
};

module.exports.seed = seed;
