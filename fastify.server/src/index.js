// Import Server
const fastify = require('./server.js')

// Enable the fastify CORS plugin
fastify.register(require('fastify-cors'), {
  origin: '*',
  credentials: true
})

// Import Swagger Options
const swagger = require('./config/swagger')

// Import external dependancies
const gql = require('fastify-gql')

// Import GraphQL Schema
const schema = require('./schema')

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)
// Register Fastify GraphQL
fastify.register(gql, {
  schema,
  graphiql: true
})

// Import Routes
const routes = require('./routes')

// Loop over each route
routes.forEach((route, index) => {
  fastify.route(route)
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
    fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()