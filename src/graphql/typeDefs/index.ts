import { userTypeDefs } from "./user";
// import { productTypeDefs } from "./product";

export const typeDefs = `#graphql

  type Query
  type Mutation
`;

export const allTypeDefs = [
  typeDefs,
  userTypeDefs,
  // productTypeDefs
];
