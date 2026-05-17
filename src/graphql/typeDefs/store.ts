export const storeTypeDefs = `#graphql

  type Store {
    id: ID!
    userId: String!
    storeName: String!
    storeCode: String
    storeShortName: String
    contactPersonName: String
    businessEmail: String
    businessWhatsapp: String
    phone: String
    addressLine1: String
    addressLine2: String
    city: String
    state: String
    country: String
    pincode: String
    gstin: String
    licence: String
  }

  extend type Query {
    stores: [Store]
  }

  extend type Mutation {
    createStore(
        userId: String!,
        storeName: String!,
        storeShortName: String,
        contactPersonName: String,
        businessEmail: String,
        businessWhatsapp: String,
        phone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
        gstin: String,
        licence: String,
    ): Store

    updateStore(
        id: ID!,
        userId: String!,
        storeName: String!,
        storeShortName: String,
        contactPersonName: String,
        businessEmail: String,
        businessWhatsapp: String,
        phone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
        gstin: String,
        licence: String,
    ): Store
  }
`;
