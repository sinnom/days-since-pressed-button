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
    // endpoint: "db.us.fauna.com" // This is optional: https://docs.fauna.com/fauna/current/drivers/connections?lang=javascript
  });

  await client.query(
    query.Update(
      Ref(Collection("last-pressed"), "345618077737549902"),
      {
        data: {
          lastPressed: Date.now(),
        }
      }
    )
  )
    .then((ret) => console.log(ret))
    .catch((err) => console.error(
      'Error: [%s] %s: %s',
      err.name,
      err.message,
      err.errors()[0].description,
    ))

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };
