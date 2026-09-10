const { getDB } = require("../config/db");

const createCappedLogsCollection = async (req, res) => {
  try {
    const db = getDB();

    await db.createCollection("logs", {
      capped: true,
      size: 1048576
    });

    res.status(201).json({
      message: "Capped logs collection created successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const insertLog = async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("logs").insertOne(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createCappedLogsCollection,
  insertLog
};
