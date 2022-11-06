import { MongoClient } from "mongodb";
import database from "../settings";
const ObjectId = require("mongodb").ObjectId;

//Connect to MongoDB
export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${database.username}:${database.password}@cluster0.sm06n60.mongodb.net/${database.dbName}?retryWrites=true&w=majority`
  );

  return client;
}



//Get all documents from MongoDB
export async function getAllDocuments(client, sort) {
  const db = client.db();

  const documents = await db
    .collection(database.dbCollection)
    .find()
    .sort(sort)
    .toArray();

  return documents;
}



//Insert document into MongoDB
export async function insertDocument(client, document) {
  const db = client.db();

  const result = await db.collection(database.dbCollection).insertOne(document);
  return result;
}



//Delete document from MongoDB
export async function deleteDocument(client, id) {
  const db = client.db();

  const result = await db
    .collection(database.dbCollection)
    .deleteOne({ _id: ObjectId(id) });
  return result;
}



//Update document from MongoDB
export async function updateDocument(client, id, updatedData) {
  const db = client.db();

  const result = await db.collection(database.dbCollection).updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        title: updatedData.title,
        isDone: updatedData.isDone,
      },
    }
  );

  return result;
}


