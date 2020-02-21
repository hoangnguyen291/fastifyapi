// Require the fastify framework and instantiate it
import fastify from "fastify"
import db from "./plugins/db"
import gql from 'fastify-gql'
import schema from './schema'
import auth from "./plugins/auth"
import productsHandler from "./modules/products/routes"
// Require external modules
// const mongoose = require('mongoose')

// // Connect to DB
// mongoose
//     .connect('mongodb://localhost/mycargarage')
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.log(err))

// module.exports = fastify

function createServer() {
    const server = fastify({ logger: { prettyPrint: true } })
    // server.use(cors())

    server.register(require("fastify-oas"), {
        routePrefix: "/docs",
        exposeRoute: true,
        swagger: {
            info: {
                title: "inventory api",
                description: "api documentation",
                version: "0.1.0"
            },
            servers: [
                { url: "http://127.0.0.1:3000", description: "development" },
                {
                    url: "https://<production-url>",
                    description: "production"
                }
            ],
            schemes: ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
            security: [{ bearerAuth: [] }],
            securityDefinitions: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    })

    server.register(auth)
    // server.register(require('fastify-typeorm'), {
    //     type: "mssql",
    //     host: "localhost",
    //     port: 1433,
    //     username: "sa",
    //     password: "hoangtrum",
    //     database: "fastify",
    // });
    server.register(db)
    // server.register(healthHandler)
    server.register(productsHandler)
    // server.register(inventoryHandler)
    server.register(gql, {
        schema,
        graphiql: true
    })

    server.setErrorHandler((error, req, res) => {
        req.log.error(error.toString())
        res.send({ error })
    })




    // generate temporary token to be used in app

    // server.ready(() => {
    //   const token = server.jwt.sign({ user_id: 'swr_user_id' })
    //   console.log(token)
    // })


    return server
}

export default createServer
