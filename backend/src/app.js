require('dotenv').config();

const express = require('express');
const graphqlExpress = require('express-graphql');

const cors = require('cors');
const helmet = require('helmet');

const schema = require('./schema/schema');
// const cookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:4000'
  })
);
app.use(helmet());

app.use(require('./routers/public'));

app.use(
  '/graphql',
  graphqlExpress(async (req, res) => ({
    schema,
    graphiql: true,
    customFormatErrorFn: error => {
      let message = error.message.split('\n')[0];
      if (message.includes(':') === true) {
        message = message.split(':')[1].trim();
      }
      return {
        message
      };
    },
    context: { req, res }
  }))
);

module.exports = app;
