import { prisma } from "../../../lib/prisma";

export const storeResolvers = {
  Query: {
    stores: async () => {
      return prisma.store.findMany();
    },
  },

  Mutation: {
    createStore: async (_: any, args: any) => {
      return prisma.store.create({
        data: args,
      });
    },

    updateStore: async (_: any, args: any) => {
      const { id, ...data } = args;
      return prisma.store.update({
        where: { id },
        data,
      });
    },
  },
};
