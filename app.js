const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql"); //destructuring const graphqlHttp =
const { buildSchema } = require("graphql");

//query -> fetch data
//mutation -> change data  -> create, update, delete
// ! -> not null

const app = express();
const events = [];

app.use(bodyParser.json());

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
      }
      schema {
        query: RootQuery
        mutation: RootMutation
      }
   `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date,
        };
        //console.log(event);
        events.push(event);
        return event;
      },
    }, //resolvers
    graphiql: true,
  })
);

app.listen(3000, () => console.log("listening to port 3000"));
