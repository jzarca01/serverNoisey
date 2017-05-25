const { MongoClient } = require('mongodb');
const api = require('./lib/api');
const body = require('body-parser');
const co = require('co');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const MONGO_URL = 'mongodb://login:pass@mongoserver:port/dbname'
const PORT = 3000;

co(function * () {
  // Initialize the Next.js app
  yield app.prepare();

  console.log(`Connecting to ${MONGO_URL}`);
  const db = yield MongoClient.connect(MONGO_URL)

  // Configure express to expose a REST API
  const server = express();

  server.use(body.json());
  server.use((req, res, next) => {
    // Also expose the MongoDB database handle so Next.js can access it.
    req.db = db
    next()
  });
  server.use('/api', api(db));

  // Everything that isn't '/api' gets passed along to Next.js
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT);
  console.log(`Listening on ${PORT}`);
}).catch(error => console.error(error.stack))