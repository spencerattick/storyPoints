const express = require('express');
// const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

let pointsOnTicket;

app.post("/", function(req, res) {
  console.log(req.body);
  res.send('all good');
})


app.listen(3000, function() {
  console.log('serving on port 3000');
});
