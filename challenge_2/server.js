const express = require('express');
const app = express();

const multer = require('multer');
// const fs = require('fs');

app.use('/', express.static('client'))

app.use(express.json());
app.use(express.urlencoded());
// app.use(fileUpload({
//   createParentPath: true
// }));
// var upload = multer({ dest: 'uploads/csv.txt' });

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let type = req.params.type;
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
  console.log('req.file is ', req.file)
  // console.log('req.body is ', req.body)
  // var parsedReq = JSON.parse(req.body.submission)
  // console.log(parsedReq);
  res.sendFile(`${__dirname}/uploads/sales_report.json`);
  // res.send(generateCSV(parsedReq))
})

app.listen(3000, () => {
  console.log('listening at http://localhost:3000');
})

var generateCSV = (data) => {
  var output = '';
  var keys = Object.keys(data);
  keys.pop(); // removes children, which we don't want in CSV
  var topRow = keys.join();
  output += topRow + ' <br /> ';

  var recurse = (packet) => {
    var vals = Object.values(packet)
    vals.pop()
    var row = vals.join(); //we don't want to show children in CSV
    output += row + ' <br /> ';

    for (var i = 0; i < packet.children.length; i++) {
      recurse(packet.children[i]);
    }
  }
  recurse(data);
  return output;
}
