export const userTypeDefs = `#graphql

  type User {
    id: ID!
    name: String!
    email: String!
    userName: String!
    mobile: String!
    stores: [Store]
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User!
    deviceInfo: String
    ipAddress: String
  }

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    createUser(
      name: String!,
      email: String!,
      userName: String!,
      mobile: String!
      password: String!
    ): User

    updateUser(
      id: ID!,
      name: String!,
      email: String!,
      userName: String!,
      mobile: String!
      password: String
    ): User

    loginUser(emailOrUserName: String!, password: String!, deviceInfo: String, ipAddress: String): AuthPayload!

    refreshSession(
      refreshToken: String!
      deviceInfo: String
      ipAddress: String
    ): AuthPayload!

    logoutUser(refreshToken: String!): Boolean!

    isUserNameAvailable(userName: String!): Boolean!
    isEmailAvailable(email: String!): Boolean!
    isMobileAvailable(mobile: String!): Boolean!
  }
`;
