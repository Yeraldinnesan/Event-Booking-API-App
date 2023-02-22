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
