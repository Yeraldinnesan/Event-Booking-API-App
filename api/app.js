require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 4000;

const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql"); //destructuring const graphqlHttp =
const isAuth = require("./graphql/middleware/is-auth");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

//query -> fetch data
//mutation -> change data  -> create, update, delete
// ! -> not null

const app = express();

app.use(bodyParser.json());
app.use(isAuth);
app.use(cors());

connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
