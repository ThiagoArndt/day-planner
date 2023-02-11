import {
  insertDocument,
  connectDatabase,
  getAllDocuments,
  updateDocument,
  deleteDocument,
} from "../../helpers/db-utils";

async function handler(req, res) {
  let client;

  //Database connection
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to database" });
    client.close();
    return;
  }

  //Post item into database
  if (req.method === "POST") {
    const { title, isDone } = req.body;
    if (title.trim() === "") {
      res.status(422).json({ message: "Invalid Input" });
      client.close();
      return;
    }

    const newItem = {
      title: title,
      isDone: isDone,
    };

    let result;

    try {
      result = await insertDocument(client, newItem);
      res.status(201).json({ message: "Added Comment" });
    } catch (error) {
      res.status(500);
      res.json({ message: "Failed inserting document to database" });
      client.close();
      return;
    }
  }



  //Fetch data from database
  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, { isDone: 1 });
      res.status(200).json({ chores: documents });
    } catch (error) {
      res.status(500).json({ message: "Failed getting documents to database" });
      client.close();
      return;
    }
  }



  //Delete item from database
  if (req.method === "DELETE") {
    const { _id } = req.body;

    let result;

    try {
      result = await deleteDocument(client, _id);
      res.status(201).json({ message: "Item Deleted" });
    } catch (error) {
      res.status(500);
      res.json({ message: "Failed deleting document on database" });
      client.close();
      return;
    }
  }



  //Update item from database
  if (req.method === "PATCH") {
    const { _id, title, isDone } = req.body;

    const updatedData = {
      title: title,
      isDone: isDone,
    };
   
    let result;

    try {
      result = await updateDocument(client, _id, updatedData);
      res.status(201).json({ message: "Item Deleted" });
    } catch (error) {
      res.status(500);
      res.json({ message: "Failed deleting document on database" });
      client.close();
      return;
    }
  }
}

export default handler;
