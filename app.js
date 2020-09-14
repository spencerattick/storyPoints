const express = require('express');
// const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

let pointsOnTicket = 0;

app.post("/storyPointsPost", function(req, res) {
  let properties = req.body.properties;
  res.sendStatus(200);
  console.log('priority!!', properties.priority);
  console.log('connection!!', properties.connection_mode);



  //priority
  let priorityObj = {
    'Urgent': 3,
    'High': 2,
    'Normal': 1
  }

  if (priorityObj.hasOwnProperty(properties.priority)) {
    pointsOnTicket += priorityObj[properties.priority];
  }


  //connection mode
  let connectionModeObj = {
    'cloud_mode': 1,
    'device_mode': 1.5
  }

  if (connectionModeObj.hasOwnProperty(properties.connection_mode)) {
    pointsOnTicket += connectionModeObj[properties.connection_mode];
  }

  console.log('priority points: ', pointsOnTicket);

  res.end();
})

app.listen(3000, function() {
  console.log('serving on port 3000');
});
