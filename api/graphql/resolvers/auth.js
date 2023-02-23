const User = require("../../models/user");

const bcrypt = require("bcryptjs"); //encrypt passwords

module.exports = {
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
};
