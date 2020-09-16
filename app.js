const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

const pointsPerAssignee = {};
let pointsRequestData;


app.post("/", function(req, res) {
  pointsRequestData = req.body;
  console.log(req.body);
  res.sendStatus(200);
})

if (pointsRequestData.status !== 'Solved' || pointsRequestData.status !== 'Closed') {
  //don't execute subsequent logic if ticket is Solved or Closed

  if (pointsPerAssignee.hasOwnProperty(pointsRequestData.assignee)) {
    //check to see if this assignee exists


    for (let assignee in pointsPerAssignee) {
      //loop through each assignee's nested object

      if (Object.keys(pointsPerAssignee[assignee].activeTickets).includes(pointsRequestData.properties.ticketId) && assignee === pointsRequestData.properties.assignee) {
        //if the ticket number matches one that the assignee already has

        pointsPerAssignee[assignee].activeTickets[pointsRequestData.properties.ticketId] = pointsRequestData.properties.pointsOnTicket;
          //update value for that ticket number

      } else if (Object.keys(pointsPerAssignee[assignee].activeTickets).includes(pointsRequestData.properties.ticketId) && assignee !== pointsRequestData.properties.assignee) {
        //if the ticketid matches someone else

        delete pointsPerAssignee[assignee].activeTickets[pointsRequestData.properties.ticketId];
          //delete record of ticket from that assignee's object

        pointsPerAssignee[pointsRequestData.properties.assignee].activeTickets[pointsRequestData.properties.ticketId] = pointsRequestData.properties.pointsOnTicket;
          //add record of this ticket to a the assignee specified on the ticket

      }
    }

        //if ticket exists for this user

          //update story point value for it

        //else if it exists for a different user

          //delete it for that user

          //add it and the points for the current user


        //recalculate total points for everyone

    //add story points to the person's total IF the points for this ticket haven't already been added

  }

}

pointsPerAssignee = {
  spencer: {
    totalPoints: 9,
    activeTickets: {
      12345: 4,
      53234: 1,
      65334: 4
    }
  },
  katie: {
    totalPoints: 12,
    activeTickets: {
      46345: 1,
      09544: 5,
      12309: 6
    }
  }
}



app.listen(3000, function() {
  console.log('serving on port 3000');
});
