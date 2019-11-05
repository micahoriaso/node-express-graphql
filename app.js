const express = require('express');
const graphqlHTTP = require('express-graphql');
require('dotenv').config();
const schema = require('./schema.js')

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log(`You can access your app on  http://localhost:${PORT}/`)
    console.log(`You can access via graphiql on  http://localhost:${PORT}/graphql`)
})