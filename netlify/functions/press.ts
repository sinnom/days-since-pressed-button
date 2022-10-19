import { Handler } from "@netlify/functions";
import faunadb, { Collection, query, Ref } from "faunadb";

const handler: Handler = async (event, context) => {
  const secret = process.env.FAUNADB;
  if (secret == undefined) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server cannot find FaunaDB API key" }),
    };
  }

  const client = new faunadb.Client({
    secret: secret,
    endpoint: "https://db.us.fauna.com/" // This is optional: https://docs.fauna.com/fauna/current/drivers/connections?lang=javascript
  });

  const updatedDocument = await client.query(
    query.Update(
      Ref(Collection("last-pressed"), "345618077737549902"),
      {
        data: {
          lastPressed: Date.now(),
        }
      }
    )
  )
    .then(
      (res) => console.log(`FaunaDB promise fulfilled: ${JSON.stringify(res)}`),
      (err) => console.log(`FaunaDB promise REJECTED: ${JSON.stringify(err)}`)
    );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };
