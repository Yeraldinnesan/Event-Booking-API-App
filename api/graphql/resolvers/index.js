const Event = require("../../models/event");
const User = require("../../models/user");
const bcrypt = require("bcryptjs"); //encrypt passwords

const getEvents = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(async (event) => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: await getUser(event.creator),
      };
    });
  } catch (err) {
    throw err;
  }
};

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: await getEvents(user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(async (ev) => {
        return {
          ...ev._doc,
          _id: ev.id,
          date: new Date(ev._doc.date).toISOString(),
          creator: await getUser(ev._doc.creator),
        };
        // return { ...ev._doc, id: ev.id }; // to access the native id in case the type is not the same
      });
    } catch (err) {
      console.log(err);
      throw err();
    }
  },

  createEvent: async (args) => {
    try {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "63f5457bb55b4135f5058fca",
      });
      let createdEvent;
      const res = await event.save();
      createdEvent = {
        ...res._doc,
        _id: res.id,
        date: new Date(res._doc.date).toISOString(),
        creator: await getUser(res._doc.creator),
      };
      const user = await User.findById("63f5457bb55b4135f5058fca");
      if (!user) throw new Error("User not found");
      user.createdEvents.push(event);
      await user.save();
      console.log(createdEvent);
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createUser: async (args) => {
    try {
      const user = await User.findOne({ email: args.userInput.email });
      if (user) throw new Error("User already exists");
      const hashedpassword = await bcrypt.hash(args.userInput.password, 12);
      const newUser = new User({
        firstName: args.userInput.firstName,
        lastName: args.userInput.lastName,
        email: args.userInput.email,
        password: hashedpassword,
      });
      const res = await newUser.save();
      return { ...res._doc, password: null, _id: res.id };
    } catch (err) {
      throw err;
    }
  },
};

//--------------> PROMISES

// const getEvents = (eventIds) => {
//   //all events that have the ids
//   return Event.find({ _id: { $in: eventIds } })
//     .then((events) => {
//       return events.map((event) => {
//         return {
//           ...event._doc,
//           _id: event.id,
//           date: new Date(ev._doc.date).toISOString(),
//           creator: getUser.bind(this, event.creator),
//         };
//       });
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

// const getUser = (userId) => {
//   return User.findById(userId)
//     .then((user) => {
//       return {
//         ...user._doc,
//         _id: user.id,
//         createdEvents: getEvents.bind(this, user._doc.createdEvents),
//       };
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

// module.exports = {
//   events: () => {
//     return Event.find()
//       .then((events) => {
//         return events.map((ev) => {
//           return {
//             ...ev._doc,
//             _id: ev.id,
//             date: new Date(ev._doc.date).toISOString(),
//             creator: getUser.bind(this, ev._doc.creator),
//           };
//           // return { ...ev._doc, id: ev.id }; // to access the native id in case the type is not the same
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err();
//       });
//   },

//   createEvent: (args) => {
//     const event = new Event({
//       title: args.eventInput.title,
//       description: args.eventInput.description,
//       price: +args.eventInput.price,
//       date: new Date(args.eventInput.date),
//       creator: "63f5457bb55b4135f5058fca",
//     });
//     //console.log(event);
//     let createdEvent;
//     return event
//       .save()
//       .then((res) => {
//         createdEvent = {
//           ...res._doc,
//           _id: res.id,
//           date: new Date(ev._doc.date).toISOString(),

//           creator: getUser.bind(this, res._doc.creator),
//         };
//         return User.findById("63f5457bb55b4135f5058fca");
//         //return { ...res._doc, _id: event._doc._id.toString() };// to access the native id in case the type is not the same
//       })
//       .then((user) => {
//         if (!user) throw new Error("User not found");
//         user.createdEvents.push(event);
//         return user.save();
//       })
//       .then((res) => {
//         console.log(createdEvent);
//         return createdEvent;
//       })
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   },
//   createUser: (args) => {
//     //return lets graphql this is an asyncronous operation
//     return User.findOne({ email: args.userInput.email })
//       .then((user) => {
//         if (user) throw new Error("User already exists");
//         return bcrypt.hash(args.userInput.password, 12); //12 number of rounds of hashing on the password
//       })
//       .then((hashedpassword) => {
//         const user = new User({
//           firstName: args.userInput.firstName,
//           lastName: args.userInput.lastName,
//           email: args.userInput.email,
//           password: hashedpassword,
//         });
//         // console.log(user);
//         return user.save();
//       })
//       .then((res) => {
//         return { ...res._doc, password: null, _id: res.id };
//       })
//       .catch((err) => {
//         throw err;
//       });
//   },
// }; //resolvers
