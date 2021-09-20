const { MongoClient } = require("mongodb");
let credentials;
try {
  credentials = require("../config/mongo-credentials.json");
  // console.log("Loaded local VCAP");
} catch (e) {
  console.log(e);
}

const mongodbConn = credentials.connection.mongodb;
// Read the CA certificate and assign that to the CA variable
const ca = [Buffer.from(mongodbConn.certificate.certificate_base64, "base64")];
// We always want to make a validated TLS/SSL connection
const options = {
  ssl: true,
  sslValidate: true,
  sslCA: ca,
  useUnifiedTopology: true,
};

// Extract the database username and password
const authentication = mongodbConn.authentication;
const username = authentication.username;
const password = authentication.password;

// Extract the MongoDB URIs
const connectionPath = mongodbConn.hosts;
const connectionString = `mongodb://${username}:${password}@${connectionPath[0].hostname}:${connectionPath[0].port},${connectionPath[1].hostname}:${connectionPath[1].port}/?replicaSet=replset`;

function list(database, collection, query = {}) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(connectionString, options, (err, client) => {
      if (err) reject(err);

      const db = client.db(database);

      db.collection(collection)
        .find(query)
        .toArray()
        .then(data => {
          client.close();
          resolve(data);
        });
    });
  });
}

function find(database, collection, query = {}) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(connectionString, options, (err, client) => {
      if (err) reject(err);

      const db = client.db(database);

      db.collection(collection)
        .find(query)
        .toArray()
        .then(data => {
          client.close();
          resolve(data);
        });
    });
  });
}

function create(database, collection, data) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(connectionString, options, (err, client) => {
      if (err) reject(err);

      const db = client.db(database);

      db.collection(collection)
        .insertOne(data)
        .then(data => {
          client.close();
          console.log();
          resolve(data.ops[0]);
        });
    });
  });
}

function createMany(database, collection, data) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(connectionString, options, (err, client) => {
      if (err) reject(err);

      const db = client.db(database);

      db.collection(collection)
        .insertMany({
          ...data,
        })
        .then(data => {
          client.close();
          resolve(data.ops);
        });
    });
  });
}

module.exports = {
  list,
  find,
  create,
  createMany,
};
