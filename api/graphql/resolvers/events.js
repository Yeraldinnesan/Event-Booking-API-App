const Event = require("../../models/event");

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
};
