const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql"); //destructuring const graphqlHttp =
const { buildSchema } = require("graphql");
const bcrypt = require("bcryptjs"); //encrypt passwords

const mongoose = require("mongoose");

const Event = require("./models/event");
const User = require("./models/user");
const { resourceLimits } = require("worker_threads");
const { title } = require("process");
const user = require("./models/user");
const { ExplainVerbosity } = require("mongodb");

//query -> fetch data
//mutation -> change data  -> create, update, delete
// ! -> not null

const app = express();
const events = [];

app.use(bodyParser.json());

const getEvents = (eventIds) => {
  //all events that have the ids
  return Event.find({ _id: { $in: eventIds } })
    .then((events) => {
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          creator: getUser.bind(this, event.creator),
        };
      });
    })
    .catch((err) => {
      throw err;
    });
};

const getUser = (userId) => {
  return User.findById(userId)
    .then((user) => {
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: getEvents.bind(this, user._doc.createdEvents),
      };
    })
    .catch((err) => {
      throw err;
    });
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
      }

      type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String
        createdEvents: [Event!]
      }

      input UserInput{
        firstName: String!
        lastName: String!
        email: String!
        password: String!

      }

      input EventInput{
        title: String!
        description: String!
        price: Float!
        date: String!
      }
      type RootQuery{
          events: [Event!]!
      }
      type RootMutation{
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
      }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
   `),
    rootValue: {
      events: () => {
        return Event.find()
          .then((events) => {
            return events.map((ev) => {
              return {
                ...ev._doc,
                _id: ev.id,
                creator: getUser.bind(this, ev._doc.creator),
              };
              // return { ...ev._doc, id: ev.id }; // to access the native id in case the type is not the same
            });
          })
          .catch((err) => {
            console.log(err);
            throw err();
          });
      },

      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: "63f5457bb55b4135f5058fca",
        });
        //console.log(event);
        let createdEvent;
        return event
          .save()
          .then((res) => {
            createdEvent = {
              ...res._doc,
              _id: res.id,
              creator: getUser.bind(this, res._doc.creator),
            };
            return User.findById("63f5457bb55b4135f5058fca");
            //return { ...res._doc, _id: event._doc._id.toString() };// to access the native id in case the type is not the same
          })
          .then((user) => {
            if (!user) throw new Error("User not found");
            user.createdEvents.push(event);
            return user.save();
          })
          .then((res) => {
            console.log(createdEvent);
            return createdEvent;
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
      createUser: (args) => {
        //return lets graphql this is an asyncronous operation
        return User.findOne({ email: args.userInput.email })
          .then((user) => {
            if (user) throw new Error("User already exists");
            return bcrypt.hash(args.userInput.password, 12); //12 number of rounds of hashing on the password
          })
          .then((hashedpassword) => {
            const user = new User({
              firstName: args.userInput.firstName,
              lastName: args.userInput.lastName,
              email: args.userInput.email,
              password: hashedpassword,
            });
            // console.log(user);
            return user.save();
          })
          .then((res) => {
            return { ...res._doc, password: null, _id: res.id };
          })
          .catch((err) => {
            throw err;
          });
      },
    }, //resolvers
    graphiql: true,
  })
);

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gr7rjlm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000, () => console.log("listening to port 3000"));
  })
  .catch((error) => {
    console.log(error);
  });
