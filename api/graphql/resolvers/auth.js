const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs"); //encrypt passwords

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser)
        throw new Error("A user with this email already exists");
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

  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User does not exist!");
    const matches = await bcrypt.compare(password, user.password);
    if (!matches) throw new Error("Password incorrect");
    const jwToken = jwt.sign(
      { userId: user.id, email: user.email },
      "eventbookinghashingkey",
      {
        expiresIn: "1h",
      }
    );
    return { userId: user.id, token: jwToken, tokenExpiration: 1 };
  },
};
