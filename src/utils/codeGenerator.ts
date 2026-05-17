import { prisma } from "../../lib/prisma";

export const generateStoreCode = async () => {
  while (true) {
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();

    const code = `STR-${random}`;

    const existing = await prisma.store.findUnique({
      where: {
        storeCode: code,
      },
    });

    if (!existing) {
      return code;
    }
  }
};
