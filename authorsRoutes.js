const express = require("express");

const router = express.Router();

const {
  createAuthorsCollection
} = require("../controllers/authorsController");

router.post("/collection/authors", createAuthorsCollection);

module.exports = router;
