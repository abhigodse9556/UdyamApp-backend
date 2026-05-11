export const userTypeDefs = `#graphql

  type User {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    password: String!
    stores: [Store]
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User!
  }

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    createUser(
      name: String!,
      email: String!,
      mobile: String!
      password: String!
    ): User

    updateUser(
      id: ID!,
      name: String!,
      email: String!,
      mobile: String!
      password: String
    ): User

    loginUser(email: String!, password: String!): AuthPayload!

    refreshSession(
      refreshToken: String!
    ): AuthPayload!
  }
`;
