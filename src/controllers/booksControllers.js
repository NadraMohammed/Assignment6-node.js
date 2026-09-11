const { getDB } = require("../config/db");

const createBooksCollection = async (req, res) => {
  try {
    const db = getDB();

    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 1
            }
          }
        }
      }
    });

    res.status(201).json({
      message: "Books collection created successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const createBooksTitleIndex = async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("books").createIndex({
      title: 1
    });

    res.json({
      message: "Index created successfully",
      indexName: result
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const insertOneBook = async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("books").insertOne(req.body);

    res.status(201).json({
      _id: result.insertedId,
      ...req.body
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const insertManyBooks = async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("books").insertMany(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateFutureBook = async (req, res) => {
  try {
    const db = getDB();

    const book = await db.collection("books").findOneAndUpdate(
      { title: "Future" },
      { $set: { year: 2022 } },
      { returnDocument: "after" }
    );

    res.json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const findBookByTitle = async (req, res) => {
  try {
    const db = getDB();

    const book = await db.collection("books").findOne({
      title: req.query.title
    });

    res.json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const findBooksByYear = async (req, res) => {
  try {
    const db = getDB();

    const from = Number(req.query.from);
    const to = Number(req.query.to);

    const books = await db.collection("books").find({
      year: {
        $gte: from,
        $lte: to
      }
    }).toArray();

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const findBooksByGenre = async (req, res) => {
  try {
    const db = getDB();

    const books = await db.collection("books").find({
      genres: req.query.genre
    }).toArray();

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const skipLimitBooks = async (req, res) => {
  try {
    const db = getDB();

    const books = await db.collection("books")
      .find()
      .sort({ year: -1 })
      .skip(2)
      .limit(3)
      .toArray();

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const findBooksWithIntegerYear = async (req, res) => {
  try {
    const db = getDB();

    const books = await db.collection("books").find({
      year: {
        $type: "int"
      }
    }).toArray();

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const excludeGenres = async (req, res) => {
  try {
    const db = getDB();

    const books = await db.collection("books").find({
      genres: {
        $nin: ["Horror", "Science Fiction"]
      }
    }).toArray();

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteBooksBeforeYear = async (req, res) => {
  try {
    const db = getDB();

    const year = Number(req.query.year);

    const result = await db.collection("books").deleteMany({
      year: {
        $lt: year
      }
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const aggregateBooks1 = async (req, res) => {
  try {
    const db = getDB();

    const books = await db.collection("books").aggregate([
      {
        $match: {
          year: {
            $gt: 2000
          }
        }
      },
      {
        $sort: {
          year: -1
        }
      }
    ]).toArray();

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const aggregateBooks2 = async (req, res) => {
  try {
    const db = getDB();

    const books = await db.collection("books").aggregate([
      {
        $match: {
          year: {
            $gt: 2000
          }
        }
      },
      {
        $project: {
          _id: 0,
          title: 1,
          author: 1,
          year: 1
        }
      }
    ]).toArray();

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const aggregateBooks3 = async (req, res) => {
  try {
    const db = getDB();

    const books = await db.collection("books").aggregate([
      {
        $unwind: "$genres"
      }
    ]).toArray();

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const aggregateBooks4 = async (req, res) => {
  try {
    const db = getDB();

    const books = await db.collection("books").aggregate([
      {
        $lookup: {
          from: "logs",
          localField: "title",
          foreignField: "bookTitle",
          as: "logs"
        }
      }
    ]).toArray();

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createBooksCollection,
  createBooksTitleIndex,
  insertOneBook,
  insertManyBooks,
  updateFutureBook,
  findBookByTitle,
  findBooksByYear,
  findBooksByGenre,
  skipLimitBooks,
  findBooksWithIntegerYear,
  excludeGenres,
  deleteBooksBeforeYear,
  aggregateBooks1,
  aggregateBooks2,
  aggregateBooks3,
  aggregateBooks4
};
