import { baseTypeDefs } from "./base";
import { storeTypeDefs } from "./store";
import { userTypeDefs } from "./user";

export const typeDefs = `#graphql
  ${baseTypeDefs}

  ${userTypeDefs}

  ${storeTypeDefs}
`;
