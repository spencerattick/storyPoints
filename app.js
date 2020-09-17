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


//add ticket and point value if ticket is not closed

if (pointsRequestData.status !== 'Solved' || pointsRequestData.status !== 'Closed') {
  //don't execute subsequent logic if ticket is Solved or Closed


    for (let assignee in pointsPerAssignee) {
    //loop through each assignee's nested object

      if (Object.keys(pointsPerAssignee[assignee].activeTickets).includes(pointsRequestData.properties.ticketId) && assignee === pointsRequestData.properties.assignee) {
        //if the ticket number matches one that the assignee alread has

        pointsPerAssignee[assignee].activeTickets[pointsRequestData.properties.ticketId] = pointsRequestData.properties.pointsOnTicket;
          //update value for that ticket number

        break;

      } else if (Object.keys(pointsPerAssignee[assignee].activeTickets).includes(pointsRequestData.properties.ticketId) && assignee !== pointsRequestData.properties.assignee) {
        //if the ticketid matches someone else

        delete pointsPerAssignee[assignee].activeTickets[pointsRequestData.properties.ticketId];
          //delete record of ticket from that assignee's object

        pointsPerAssignee[pointsRequestData.properties.assignee].activeTickets[pointsRequestData.properties.ticketId] = pointsRequestData.properties.pointsOnTicket;
          //add record of this ticket to a the assignee specified on the ticket

        break;

      } else {
        // the ticket has not yet been added to the pointsPerAssignee object

        pointsPerAssignee[pointsRequestData.properties.assignee].activeTickets[pointsRequestData.properties.ticketId] = pointsRequestData.properties.pointsOnTicket;
          //adds new ticket to assignee's ticket list

        break;
      }
  }


  //count and reassign total points for all assignees
  for (let assignee in pointsPerAssignee) {
    let newPointTotal = Object.values(pointsPerAssignee[assignee].activeTickets).reduce(function(total, num) {
      return total+=num;
    })

    pointsPerAssignee[assignee].totalPoints = newPointTotal;
  }




        //if ticket exists for this user

          //update story point value for it

        //else if it exists for a different user

          //delete it for that user

          //add it and the points for the current user


        //recalculate total points for everyone

    //add story points to the person's total IF the points for this ticket haven't already been added


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
