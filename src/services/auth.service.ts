import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

export const loginUserService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("NOT_FOUND");

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) throw new Error("UNAUTHORIZED");

  return user;
};
