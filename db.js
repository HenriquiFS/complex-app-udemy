const dotenv = require('dotenv');
dotenv.config();
const { ClientRequest } = require('http');
const {MongoClient} = require('mongodb');
const client = new MongoClient(process.env.CONNECTIONSTRING);

async function start() {
  await client.connect();
  module.exports = client.db();
  const app = require('./app');
  app.listen(process.env.PORT, () => console.log('Server started at http://localhost:3000') );
}

start()