const express = require("express");
const { connectDB } = require("./config/db");

const booksRoutes = require("./routes/booksRoutes");
const authorsRoutes = require("./routes/authorsRoutes");
const logsRoutes = require("./routes/logsRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", booksRoutes);
app.use("/", authorsRoutes);
app.use("/", logsRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
