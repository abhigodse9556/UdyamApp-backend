import { prisma } from "../../../lib/prisma";

export const userResolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany();
    },
  },

  Mutation: {
    createUser: async (_: any, args: any) => {
      return prisma.user.create({
        data: args,
      });
    },
  },
};
