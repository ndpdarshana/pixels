const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolver = require('./graphql/resolver/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if(req.method === 'OPTIONS'){
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/gql',
  graphqlHttp({
    schema:graphQlSchema,
    rootValue:graphQlResolver,
    graphiql: true
  })
);

/**
//To fix all deprecation warnings, follow the below steps: https://mongoosejs.com/docs/deprecations.html
Replace update() with updateOne(), updateMany(), or replaceOne()
Replace remove() with deleteOne() or deleteMany().
Replace count() with countDocuments(), unless you want to count how many documents are in the whole collection (no filter). In the latter case, use estimatedDocumentCount().
*/
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-jkddc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then(() =>{
    app.listen(8000);
  }).catch(err => {
    console.log(err);
  });
