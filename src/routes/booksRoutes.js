const express = require("express");

const router = express.Router();

const {
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
} = require("../controllers/booksControllers");

router.post("/collection/books", createBooksCollection);

router.post(
  "/collection/books/index",
  createBooksTitleIndex
);
router.post("/books", insertOneBook);
router.post("/books/batch", insertManyBooks);
router.patch("/books/Future", updateFutureBook);
router.get("/books/title", findBookByTitle);
router.get("/books/year", findBooksByYear);
router.get("/books/genre", findBooksByGenre);
router.get("/books/skip-limit", skipLimitBooks);
router.get(
  "/books/year-integer",
  findBooksWithIntegerYear
);
router.get("/books/exclude-genres", excludeGenres);
router.delete(
  "/books/before-year",
  deleteBooksBeforeYear
);
router.get("/books/aggregate1", aggregateBooks1);
router.get("/books/aggregate2", aggregateBooks2);
router.get("/books/aggregate3", aggregateBooks3);
router.get("/books/aggregate4", aggregateBooks4);
module.exports = router;
