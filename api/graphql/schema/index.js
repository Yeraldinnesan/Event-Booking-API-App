const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User!
  location: String!
  image: String
}

type User {
  _id: ID!
  firstName: String!
  lastName: String!
  email: String!
  password: String
  createdEvents: [Event!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

type Booking {
  _id: ID!
  event: Event!
  user: User!
  createdAt: String!
  updatedAt: String!
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
  location: String!
  image: String
}
type RootQuery{
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData
}
type RootMutation{
  createEvent(eventInput: EventInput): Event
  updateEvent(eventId: ID!, eventInput: EventInput): Event!
  deleteEvent(eventId: ID!): Boolean
  createUser(userInput: UserInput): User
  updateUser(userId: ID!, userInput: UserInput): User
  bookEvent(eventId: ID!): Booking!
  cancelBooking(bookingId: ID!): Event!
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`);
