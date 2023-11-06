const router = require("express").Router();
const { addBook, getAllBooks, getBookById, updateBookById, deleteBookById } = require("../controllers/book");

router.post(
    "/add",
    addBook.validator,
    addBook.controller
);
router.get(
    "/get-all",
    getAllBooks.controller
);
router.get(
    "/by-id/:id",
    getBookById.validator,
    getBookById.controller
);
router.put(
    "/update-by-id/:id",
    updateBookById.validator,
    updateBookById.controller
);
router.delete(
    "/delete-by-id/:id",
    deleteBookById.validator,
    deleteBookById.controller
);

module.exports = router;
