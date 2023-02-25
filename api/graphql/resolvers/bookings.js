const Bookings = require("../../models/bookings");
const Event = require("../../models/event");
const User = require("../../models/user");

const { transformBooking, transformEvent } = require("../helpers/resolvers");

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");

    try {
      const bookings = await Bookings.find();
      return bookings.map((b) => {
        return transformBooking(b);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");

    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const newBooking = new Bookings({
        user: req.userId,
        event: fetchedEvent,
      });
      const result = await newBooking.save();
      return transformBooking(result);
    } catch (err) {
      throw err;
    }
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) throw new Error("UnAuthenticated");

    try {
      const booking = await Bookings.findById(args.bookingId).populate("event");
      const event = transformEvent(booking.event);
      if (booking.user.toString() !== req.userId) {
        throw new Error("You are not authorized to cancel this booking");
      }
      //console.log(event);
      await Bookings.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
