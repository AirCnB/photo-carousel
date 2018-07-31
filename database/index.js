const fs = require('file-system');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/aircnb_photos');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connection established');
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

const skipInit = process.env.NODE_ENV === "test"

//const Page = mongoose.model('Page', photoSchema, "Page", skipInit);

const Page = mongoose.model('Page', photoSchema);

const reDirect = (num, callback) => {
  const photoId = Number(num);
  Page.find({ id: photoId }, (err, docs) => {
    if (err) {
      console.log(err);
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
      console.log(err);
    } else {
      callback(null, docs)
    }
  })
}

const save = (data) => {
  Page.insertMany(data, (err) => {
    if (err) {
      console.log('Duplicate data not inserted.');
    }
  });
};

const insertData = (data) => {
  data.pop();
  const collection = [];
  let ind = 0;
  const repeat = function (dataArr, index) {
    if (index === dataArr.length) {
      return;
    }
    const usedPics = [];
    const model = {};
    model.id = index;
    model.saved = false;
    model.photos = [dataArr[index]];
    usedPics.push(index);
    const rand = Math.floor(Math.random() * 10) + 3;
    for (let i = 0; i < rand; i += 1) {
      const x = Math.floor(Math.random() * dataArr.length);
      if (!usedPics.includes(x)) {
        model.photos.push(dataArr[x]);
      }
      usedPics.push(x);
    }
    collection.push(model);
    ind += 1;
    repeat(data, ind);
  };
  repeat(data, ind);
  save(collection);
};

const parseData = (data) => {
  const x = data.split('\n');
  const result = [];
  const end = [];
  for (let i = 0; i < x.length; i += 1) {
    result.push(x[i].split(','));
  }
  for (let i = 0; i < result.length; i += 1) {
    const final = {
      url: result[i][0],
      desc: result[i][1],
    };
    end.push(final);
  }
  insertData(end);
};

const getData = () => {
  const directory = path.join(__dirname, '../data', '/photos.csv');
  fs.readFile(directory, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    parseData(data);
  });
};

module.exports.getData = getData;
module.exports.reDirect = reDirect;
module.exports.updateSave = updateSave;
