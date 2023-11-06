const router = require("express").Router();

// Importing All routes
const bookRoute = require("./bookRoute");

// All routes
router.use("/book", bookRoute);

module.exports = router;