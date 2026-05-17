import { prisma } from "../../../lib/prisma";
import { generateStoreCode } from "../../utils/codeGenerator";

export const storeResolvers = {
  Query: {
    stores: async () => {
      return prisma.store.findMany();
    },
  },

  Mutation: {
    createStore: async (_: any, args: any) => {
      const storeCode = await generateStoreCode();
      return prisma.store.create({
        data: {
          ...args,
          storeCode,
        },
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
