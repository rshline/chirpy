import "reflect-metadata"
import express from "express"
import Redis from "ioredis"
import cors from "cors"
import conn from "./connection"
import { ApolloServer } from "apollo-server-express"
import { COOKIE_NAME, __prod__ } from "./constants"
import { UserResolver } from "./resolvers/user"
import { buildSchema } from "type-graphql"
import { TweetResolver } from "./resolvers/tweet"

require('dotenv').config()

const main = async () => {
    conn.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

    const app = express()

    const session = require("express-session")
    let RedisStore = require("connect-redis")(session)
    let redis = new Redis()

    // const SESSION_SECRET = process.env.SESSION_SECRET + ""
    // const CORS_ORIGIN = process.env.CORS_ORIGIN + ""
  
    app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
      }),
      session({
        name: COOKIE_NAME,
        store: new RedisStore({ 
          client: redis,
          disableTouch: true
        }),
        cookie: {
          maxAge: 1000 * 60 * 24 * 365 * 5,
          httpOnly: true,
          sameSite: "lax", // "None",
          secure: __prod__ //true //
        },
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
      })
    )
  
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [ UserResolver, TweetResolver ],
        validate: false,
      }),
      context: ({req, res}) => ({ req, res, redis }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ 
      app,
      cors: false  
    })
  
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server ready at localhost:`,process.env.PORT)
    }) 
}

main().catch((err) => {
    console.error(err);
});
