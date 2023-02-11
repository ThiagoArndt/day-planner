import { MongoClient } from "mongodb";

const ObjectId = require("mongodb").ObjectId;

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.sm06n60.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;



//Connect to MongoDB
export async function connectDatabase() {
  const client = await MongoClient.connect(connectionString);

  return client;
}



//Get all documents from MongoDB
export async function getAllDocuments(client, sort) {
  const db = client.db();

  const documents = await db
    .collection('chores')
    .find()
    .sort(sort)
    .toArray();

  return documents;
}



//Insert document into MongoDB
export async function insertDocument(client, document) {
  const db = client.db();

  const result = await db.collection('chores').insertOne(document);
  return result;
}



//Delete document from MongoDB
export async function deleteDocument(client, id) {
  const db = client.db();

  const result = await db
    .collection('chores')
    .deleteOne({ _id: ObjectId(id) });
  return result;
}



//Update document from MongoDB
export async function updateDocument(client, id, updatedData) {
  const db = client.db();

  const result = await db.collection('chores').updateOne(
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


