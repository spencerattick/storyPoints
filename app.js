const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const pointsPerAssignee = {
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

let pointsRequestData;

app.get("/", function(req, res) {
  res.render("home", {pointsPerAssignee: pointsPerAssignee});
})


app.post("/addNewPoints", function(req, res) {
  pointsRequestData = req.body;
  console.log(req.body);


  if (!isTicketClosedOrSolved()) {
    addTicketIdAndValueToObj();
    recalculatePointsForAll();
  }

  console.log("++++++++++++++++++++++++")
  console.log("++++++++++++++++++++++++")
  console.log(pointsPerAssignee)
  res.redirect("/");
  // res.sendStatus(200);

})

function isTicketClosedOrSolved() {
  return pointsRequestData.properties.status === 'Closed' || pointsRequestData.properties.status === 'Solved';
}

function addTicketIdAndValueToObj() {
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

      } else if (assignee === pointsRequestData.properties.assignee) {

        pointsPerAssignee[pointsRequestData.properties.assignee].activeTickets[pointsRequestData.properties.ticketId] = pointsRequestData.properties.pointsOnTicket;

      } else if (!Object.keys(pointsPerAssignee).includes(pointsRequestData.properties.assignee)) {
        // the ticket has not yet been added to the pointsPerAssignee object

        pointsPerAssignee[pointsRequestData.properties.assignee] = {
          totalPoints: 0,
          activeTickets: {}
        }
          //need to add object structure for new user

        pointsPerAssignee[pointsRequestData.properties.assignee].activeTickets[pointsRequestData.properties.ticketId] = pointsRequestData.properties.pointsOnTicket;
          //adds new ticket to assignee's ticket list

      }
  }
}

function recalculatePointsForAll() {
  for (let assignee in pointsPerAssignee) {
    let newPointTotal;
    if (Object.values(pointsPerAssignee[assignee].activeTickets).length) {
      newPointTotal = Object.values(pointsPerAssignee[assignee].activeTickets).reduce(function(total, num) {
       return total+=num;
     })
   } else {
     newPointTotal = 0;
   }
    pointsPerAssignee[assignee].totalPoints = newPointTotal;
  }
}



// pointsPerAssignee = {
//   spencer: {
//     totalPoints: 9,
//     activeTickets: {
//       12345: 4,
//       53234: 1,
//       65334: 4
//     }
//   },
//   katie: {
//     totalPoints: 12,
//     activeTickets: {
//       46345: 1,
//       09544: 5,
//       12309: 6
//     }
//   }
// }





app.listen(3000, function() {
  console.log('serving on port 3000');
});
