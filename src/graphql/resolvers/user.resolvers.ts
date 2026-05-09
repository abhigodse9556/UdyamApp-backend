import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { loginUserService } from "../../services/auth.service";
import { generateTokens } from "../../utils/jwt";

export const userResolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany({
        include: {
          id: true,
          email: true,
          name: true,
          mobile: true,
          createdAt: true,
          updatedAt: true,
          isActive: true,
          stores: true,
        },
      });
    },
  },

  Mutation: {
    createUser: async (_: any, args: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          mobile: args.mobile,
          passwordHash: hashedPassword,
        },
      });
    },
    updateUser: async (_: any, args: any) => {
      const { id, ...data } = args;
      return prisma.user.update({
        where: { id },
        data,
      });
    },

    loginUser: async (_parent: any, args: any) => {
      const user = await loginUserService(args.email, args.password);

      const tokens = generateTokens(user.id);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user,
      };
    },
  },
};
