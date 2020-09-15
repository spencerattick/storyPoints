const express = require('express');
// const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

let pointsOnTicket;

app.post("/storyPointsPost", function(req, res) {
  pointsOnTicket = 0;
  let properties = req.body.properties;
  res.sendStatus(200);


  //priority
  const priorityObj = {
    'Urgent': 3,
    'High': 2,
    'Normal': 1
  }

  if (priorityObj.hasOwnProperty(properties.priority)) {
    pointsOnTicket += priorityObj[properties.priority];
  }

  console.log('priority: ', properties.priority);

  //connection mode
  let connectionModeObj = {
    'cloud_mode': 1,
    'device_mode': 1.5
  }

  if (connectionModeObj.hasOwnProperty(properties.connection_mode)) {
    pointsOnTicket += connectionModeObj[properties.connection_mode];
  }

  console.log('connection mode: ', properties.connection_mode);


  //library
  const libraryObj = {
    'analytics.js': 1,
    'analytics.js_consent_manager': 2,
    'analytics.js_visual_tagger': 1,
    'analytics-ios': 2,
    'analytics-android': 2,
    'both_ios_and_android': 2,
    'analytics-react-native': 3,
    'analytics-go': 2,
    'analytics-java': 2.5,
    'analytics.net': 2.5,
    'analytics-node': 1,
    'analytics-php': 2.5,
    'analytics-python': 2.5,
    'analytics-roku': 2.5,
    'analytics-swift': 2.5,
    'analytics-wordpress': 1,
    'xid': 2.5,
    'ajs-proxy': 2.5,
    'analytics-xamarin': 2.5,
    'analytics-ccp': 2,
    'amp-analytics': 3,
    'pixel-api': 2,
    'personas_source': 2,
    'no_specific_library': 0.5,
    'http_api': 0.5
  }

  if (libraryObj.hasOwnProperty(properties.library)) {
    pointsOnTicket += libraryObj[properties.library];
  }

  //topic
  const topicObj = {
    //to fill in
  }

  if (topicObj.hasOwnProperty(properties.topic)) {
    pointsOnTicket += topicObj[properties.topic];
  }

  console.log('library: ', properties.library);


  console.log('priority points: ', pointsOnTicket);

  res.end();
})

app.listen(3000, function() {
  console.log('serving on port 3000');
});
