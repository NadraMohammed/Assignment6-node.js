const express = require("express");

const router = express.Router();

const {
  createCappedLogsCollection,
  insertLog
} = require("../controllers/logsController");

router.post(
  "/collection/logs/capped",
  createCappedLogsCollection
);
router.post("/logs", insertLog);

module.exports = router;
