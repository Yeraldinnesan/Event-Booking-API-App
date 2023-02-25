const Event = require("../../models/event");
const User = require("../../models/user");

const { transformEvent } = require("../helpers/resolvers");

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

  createEvent: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      location: args.eventInput.location,
      // creator: req.userId,
      creator: req.userId,
    });
    let createdEvent;
    try {
      const res = await event.save();
      createdEvent = transformEvent(res);
      const user = await User.findById(req.userId);
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

  updateEvent: async ({ eventId, eventInput }, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");
    try {
      const event = await Event.findById(eventId);
      if (!event) throw new Error("Event not found");
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          $set: {
            title: eventInput.title,
            description: eventInput.description,
            price: +eventInput.price,
            date: new Date(eventInput.date),
            location: eventInput.location,
          },
        },
        { new: true }
      );
      return transformEvent(updatedEvent);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteEvent: async ({ eventId }, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    try {
      const event = await Event.findById(eventId);
      if (!event) throw new Error("Event not found");
      if (event.creator.toString() !== req.userId) {
        throw new Error("Not authorized to delete this event");
      }
      await Event.deleteOne({ _id: eventId });
      const user = await User.findById(req.userId);
      if (!user) throw new Error("User not found");
      user.createdEvents.pull(eventId);
      await user.save();
      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
