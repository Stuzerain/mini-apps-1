const express = require('express');
const app = express();

const multer = require('multer');
const fs = require('fs');

app.use('/', express.static('client'))

app.use(express.json());
app.use(express.urlencoded());

// handles submission of a JSON file and writes contents to uploads folder with filename
let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let path = `./uploads`;
      callback(null, path);
    },
    filename: (req, file, callback) => {
      //originalname is the uploaded file's name with extn
      callback(null, file.originalname);
    }
  })
});

app.post('/', upload.single('submission'), (req, res) => {
  // a holdover from when text was being handled directly
  // var parsedReq = JSON.parse(req.body.submission)
  console.log(req.file.filename)
  fs.readFile(`./uploads/${req.file.filename}`, 'utf8', (err, data) => {
    if (err) {
      throw err
    }
    fs.writeFile(`./uploads/newCSV.csv`, generateCSV(JSON.parse(data)), 'utf8', (err, newData) => {
      if (err) {
        throw err
      }
      // console.log(`${__dirname}/uploads/newCSV.csv`)
      res.sendFile(`${__dirname}/uploads/newCSV.csv`);
    })

  })
})

app.get('/download', (req, res) => {
  res.sendFile(`${__dirname}/uploads/newCSV.csv`)
})

app.listen(3000, () => {
  console.log('listening at http://localhost:3000');
})

var generateCSV = (data) => {
  var output = '';
  var keys = Object.keys(data);
  keys.pop(); // removes children, which we don't want in CSV
  var topRow = keys.join();
  output += topRow + '\r\n';

  var recurse = (packet) => {
    var vals = Object.values(packet)
    vals.pop()
    var row = vals.join(); //we don't want to show children in CSV
    output += row + '\r\n';

    for (var i = 0; i < packet.children.length; i++) {
      recurse(packet.children[i]);
    }
  }
  recurse(data);
  return output;
}
