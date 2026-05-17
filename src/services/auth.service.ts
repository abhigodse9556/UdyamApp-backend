import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

export const loginUserService = async (
  emailOrUserName: string,
  password: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: emailOrUserName.includes("@") ? emailOrUserName : undefined,
      userName: !emailOrUserName.includes("@") ? emailOrUserName : undefined,
    },
  });

  if (!user) throw new Error("NOT_FOUND");

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) throw new Error("UNAUTHORIZED");

  return user;
};
