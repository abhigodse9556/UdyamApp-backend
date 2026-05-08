import { userResolvers } from "./user";
// import { productResolvers } from "./product";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    // ...productResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    // ...productResolvers.Mutation,
  },
};
