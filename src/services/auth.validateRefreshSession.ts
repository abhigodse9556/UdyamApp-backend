import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { GraphQLError } from "graphql";
import { verifyRefreshToken } from "../utils/jwt";

export const validateRefreshSession = async (
  refreshToken: string,
  deviceInfo?: string,
  ipAddress?: string,
) => {
  try {
    // Verify JWT signature
    const payload = verifyRefreshToken(refreshToken) as {
      userId: string;
    };

    // Find active sessions
    const whereClause: any = {
      userId: payload.userId,
      revokedAt: null,
    };

    if (deviceInfo) {
      whereClause.deviceInfo = deviceInfo;
    }

    if (ipAddress) {
      whereClause.ipAddress = ipAddress;
    }

    const sessions = await prisma.refreshSession.findMany({
      where: whereClause,
    });

    if (!sessions.length) {
      throw new GraphQLError("No active session found");
    }

    // Find matching hashed token
    let matchedSession = null;

    for (const session of sessions) {
      const isMatch = await bcrypt.compare(refreshToken, session.tokenHash);

      if (isMatch) {
        matchedSession = session;
        break;
      }
    }

    // No matching session
    if (!matchedSession) {
      throw new GraphQLError("Invalid refresh session");
    }

    // Check expiry
    if (matchedSession.expiresAt < new Date()) {
      throw new GraphQLError("Refresh session expired");
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    if (!user || !user.isActive) {
      throw new GraphQLError("User not found or inactive");
    }

    return {
      user,
      session: matchedSession,
    };
  } catch {
    throw new GraphQLError("Invalid refresh token", {
      extensions: {
        code: "UNAUTHORIZED",
      },
    });
  }
};
