const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/booking");

const bcrypt = require("bcryptjs"); //encrypt passwords

dateToString = (date) => new Date(date).toISOString();

const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: getUser.bind(this, event.creator),
  };
};

const getEvents = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const getEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
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
      createdEvents: getEvents.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((ev) => {
        return transformEvent(ev);
        // return { ...ev._doc, id: ev.id }; // to access the native id in case the type is not the same
      });
    } catch (err) {
      console.log(err);
      throw err();
    }
  },

  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((b) => {
        return {
          ...b._doc,
          _id: b.id,
          user: getUser.bind(this, b._doc.user),
          event: getEvent.bind(this, b._doc.event),
          createdAt: new Date(b._doc.createdAt.toISOString()),
          updatedAt: new Date(b._doc.updatedAt.toISOString()),
        };
      });
    } catch (err) {
      throw err;
    }
  },

  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "63f68e7a3d0339be0f773466",
    });
    let createdEvent;
    try {
      const res = await event.save();
      createdEvent = transformEvent(res);
      const user = await User.findById("63f68e7a3d0339be0f773466");
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
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) throw new Error("User already exists");
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

  bookEvent: async (args) => {
    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const newBooking = new Booking({
        user: "63f68e7a3d0339be0f773466",
        event: fetchedEvent,
      });
      const result = await newBooking.save();
      return {
        ...result._doc,
        _id: result.id,
        user: getUser.bind(this, result._doc.user),
        event: getEvent.bind(this, result._doc.event),
        createdAt: new Date(result._doc.createdAt.toISOString()),
        updatedAt: new Date(result._doc.updatedAt.toISOString()),
      };
    } catch (err) {
      throw err;
    }
  },

  cancelBooking: async (args) => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = transformEvent(booking.event);
      //console.log(event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
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
