import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET missing in env");
  }

  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: string) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET missing in env");
  }

  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};

export const generateTokens = (userId: string) => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
};

export const verifyAccessToken = (token: string) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET missing in env");
  }
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET missing in env");
  }
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
