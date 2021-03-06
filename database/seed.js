const fs = require('file-system');
const db = require('./index.js');
const path = require('path');

const save = (data) => {
  db.Page.deleteMany({})
    .then(() => {
      db.Page.insertMany(data)
        .then(() => db.connection.close(() => {
          console.log('Database connection closed')
        }))
        .catch(err => console.log(err))
    })
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

getData();
