import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Customer: a
    .model({
      customerId: a.id().required(),
      name: a.string().required(),
      email: a.email().required(),
      phone: a.phone().required(),
      location: a.customType({
        lat: a.float().required(),
        long: a.float().required(),
      }),
      engagementStage: a.enum(["Lead", "Customer", "Prospect", "Churned"]),
      collectionId: a.id(),
      collection: a.belongsTo("Collection", "collectionId"),
      _deleted: a.boolean(),
    })
    .identifier(["customerId"])
    .authorization((allow) => [allow.owner()]),
    Collection: a
    .model({
      customers: a.hasMany("Customer", "collectionId"),
      tags: a.string().array(),
      representativeId: a.id().required()
    })
    .secondaryIndexes((index) => [index("representativeId")]),
    })
    .authorization((allow) => [allow.owner()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});