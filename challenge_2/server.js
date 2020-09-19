const express = require('express');
const app = express();

app.use('/', express.static('client'))

app.use(express.json());
app.use(express.urlencoded());




app.post('/sub', (req, res) => {

  var parsedReq = JSON.parse(req.body.submission)
  // console.log(parsedReq);

  res.send(generateCSV(parsedReq))
  // res.redirect('/')
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
