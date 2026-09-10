const { getDB } = require("../config/db");

const createAuthorsCollection = async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("authors").insertOne({
      name: req.body.name
    });

    res.status(201).json({
      message: "Author inserted successfully",
      authorId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createAuthorsCollection
};
