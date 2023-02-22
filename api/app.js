const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql"); //destructuring const graphqlHttp =

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const mongoose = require("mongoose");

//query -> fetch data
//mutation -> change data  -> create, update, delete
// ! -> not null

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
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
