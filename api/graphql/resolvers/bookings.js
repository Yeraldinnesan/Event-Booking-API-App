const Bookings = require("../../models/bookings");
const Event = require("../../models/event");

const { transformBooking, transformEvent } = require("../helpers/resolvers");

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Bookings.find();
      return bookings.map((b) => {
        return transformBooking(b);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args) => {
    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const newBooking = new Bookings({
        user: "63f68e7a3d0339be0f773466",
        event: fetchedEvent,
      });
      const result = await newBooking.save();
      return transformBooking(result);
    } catch (err) {
      throw err;
    }
  },

  cancelBooking: async (args) => {
    try {
      const booking = await Bookings.findById(args.bookingId).populate("event");
      const event = transformEvent(booking.event);
      //console.log(event);
      await Bookings.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
