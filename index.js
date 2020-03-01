'use strict'

require ('dotenv').config()
const { makeExecutableSchema} = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const app = express()
const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.port || 3000
const {readFileSync} = require ('fs')
const {join} = require ('path')
const resolvers = require ('./lib/resolvers')
const cors = require('cors') 

const typeDefs=  readFileSync( join(
    __dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

// ejecutar los resolvers

// Ejecutar el query

// graphql(schema, '{ hello }', resolvers).then((data) => {
//   console.log(data)
// })

app.use(cors())

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev
}))

app.listen(port, () => {
  console.log(`server is listening in port http://localhost:${port}/api`)
})
