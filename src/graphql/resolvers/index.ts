import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./user.resolvers";
import { storeResolvers } from "./store.resolvers";

export const resolvers = mergeResolvers([userResolvers, storeResolvers]);
