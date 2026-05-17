import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { loginUserService } from "../../services/auth.service";
import { generateAccessToken, generateTokens } from "../../utils/jwt";
import { GraphQLError } from "graphql";
import { validateRefreshSession } from "../../services/auth.validateRefreshSession";

export const userResolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany({
        select: {
          id: true,
          email: true,
          userName: true,
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
          userName: args.userName,
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

    loginUser: async (_parent: any, args: any, context: any) => {
      const user = await loginUserService(args.emailOrUserName, args.password);

      // Generate tokens
      const tokens = generateTokens(user.id);

      // Hash refresh token before storing
      const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);

      // Calculate expiry date (example: 30 days)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const req = context.req;

      const ipAddress =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        null;

      // Save refresh session in DB
      await prisma.refreshSession.create({
        data: {
          userId: user.id,
          tokenHash: hashedRefreshToken,
          expiresAt,
          deviceInfo: args.deviceInfo,
          ipAddress: ipAddress,
        },
      });

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user,
      };
    },

    refreshSession: async (_: any, args: any) => {
      const { user } = await validateRefreshSession(
        args.refreshToken,
        args?.deviceInfo,
        args?.ipAddress,
      );

      // Generate fresh access token only
      const accessToken = generateAccessToken(user.id);

      return {
        accessToken,
        refreshToken: args.refreshToken,
        user,
        deviceInfo: args.deviceInfo,
        ipAddress: args.ipAddress,
      };
    },
    logoutUser: async (_: any, args: any) => {
      try {
        const { session } = await validateRefreshSession(args.refreshToken);

        await prisma.refreshSession.update({
          where: {
            id: session.id,
          },
          data: {
            revokedAt: new Date(),
          },
        });

        return true;
      } catch (error) {
        console.error(error);

        throw new GraphQLError("Logout failed", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }
    },

    isUserNameAvailable: async (_: any, args: any) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          userName: args.userName,
        },
      });
      return !existingUser;
    },

    isEmailAvailable: async (_: any, args: any) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      return !existingUser;
    },

    isMobileAvailable: async (_: any, args: any) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          mobile: args.mobile,
        },
      });
      return !existingUser;
    },
  },
};
