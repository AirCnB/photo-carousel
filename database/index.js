const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/aircnb_photos');

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error: '));
connection.once('open', () => {
  console.log('Connected to aircnb_photos database');
});

const photoSchema = mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  photos: [
    {
      url: String,
      desc: String,
    },
  ],
  saved: Boolean,
});

const Page = mongoose.model('Page', photoSchema);

const reDirect = (num, callback) => {
  const photoId = Number(num);
  Page.find({ id: photoId }, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
};

const updateSave = (num, boolean, callback) => {
  let queryId = Number(num);
  let val = boolean === 'true';
  Page.update( {id: queryId }, { $set: { saved: val } }, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs)
    }
  })
}

module.exports.reDirect = reDirect;
module.exports.updateSave = updateSave;
module.exports.Page = Page;
module.exports.connection = connection;
