const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1205364747/vector/flat-calendar-icon-appointment-event-date-in-spiral-calendar-in-yellow-circle-business.jpg?s=170667a&w=0&k=20&c=d59p_ZH-RyOBehl8uqYrdmFSI_N--hqRSCzId6RPl8g=",
  },
  location: {
    type: String,
    required: true,
  },
  creator: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);
//------------------------------USER
// mutation{
//   createUser(userInput:{firstName:"1 test user", lastName:"test", email:"1test@email.com", password:"lolo1212"}){
//     firstName
//     _id
//   }
// }

// {
//   "data": {
//     "createUser": {
//       "firstName": "2 test user",
//       "_id": "63f68ec23d0339be0f773469"
//     }
//   }
// }

// {
//   "data": {
//     "createUser": {
//       "firstName": "1 test user",
//       "_id": "63f68e7a3d0339be0f773466"
//     }
//   }
// }
//-----------------------------------------------------------
// {
//   "data": {
//     "login": {
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Y5NzcwNzgxNzJlM2NkYzFkNzc2MGQiLCJlbWFpbCI6IjF0ZXN0QGVtYWlsLmNvbSIsImlhdCI6MTY3NzI5MzQyNCwiZXhwIjoxNjc3Mjk3MDI0fQ.oOL4PghbpzRORr2_AHv632SiV3Uf8k4H3q5aZO22LMc",
//       "tokenExpiration": 1
//     }
//   }
// }

// mutation{
//   createEvent(eventInput:{title:"2user event", description:"hello", price: 7.09, date:"2023-02-25T03:56:43.305Z", locarion:"USA"}){
//     _id
//     creator{
//       email
//     }
//   }
//   }

// mutation{
//   deleteEvent(eventId:"63f98970f1cef1b469cfab8b")
//      }
