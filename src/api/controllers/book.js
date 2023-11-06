const celebrate = require("celebrate").celebrate;
const { CONTROLLER, VALIDATOR } = require("../../utils/constants");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const httpStatus = require("http-status");
const Book = require("../../../models/book");

const addBook = {
    [VALIDATOR]: celebrate({
        body: Joi.object()
            .keys({
                title: Joi.string().required(),
                author: Joi.string().required(),
                summary: Joi.string().required(),
            })
            .required(),
    }),
    [CONTROLLER]: async (req, res) => {
        try {
            const { title, author, summary } = req.body;
            const bookModel = new Book({ title, author, summary });
            await bookModel.save();
            console.log(title, author, summary);
            return res.status(httpStatus.OK).json({
                message: "Book Added successfully",
                success: true,
                data: { title, author, summary },
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE ADDING BOOK : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const getAllBooks = {
    [CONTROLLER]: async (req, res) => {
        try {
            const allBooks = await Book.find({});
            return res.status(httpStatus.OK).json({
                message: "Book list got successfully",
                success: true,
                data: allBooks,
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE getting BOOK list: ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const getBookById = {
    [VALIDATOR]: celebrate({
        params: Joi.object()
            .keys({
                id: Joi.objectId().required(),
            })
            .required(),
    }),
    [CONTROLLER]: async (req, res) => {
        try {
            const bookGot = await Book.findById(req.params.id);
            if (!bookGot)
                return res.status(httpStatus.OK).json({
                    message: "Book not found",
                    success: false,
                    data: {},
                });
            return res.status(httpStatus.OK).json({
                message: "Book got successfully",
                success: true,
                data: bookGot,
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE getting BOOK : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const updateBookById = {
    [VALIDATOR]: celebrate({
        params: Joi.object()
            .keys({
                id: Joi.objectId().required(),
            })
            .required(),
        body: Joi.object()
            .keys({
                title: Joi.string().required(),
                author: Joi.string().required(),
                summary: Joi.string().required(),
            })
            .required(),
    }),
    [CONTROLLER]: async (req, res) => {
        try {
            const { title, author, summary } = req.body;
            const bookGot = await Book.findById(req.params.id);
            if (!bookGot)
                return res.status(httpStatus.OK).json({
                    message: "Book not found",
                    success: false,
                    data: {},
                });
            const bookUpdate = await Book.findByIdAndUpdate(req.params.id, {
                title,
                author,
                summary,
            });
            await bookUpdate.save();
            console.log(title, author, summary);
            return res.status(httpStatus.OK).json({
                message: "Book updated successfully",
                success: true,
                data: { title, author, summary },
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE updating BOOK : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};

const deleteBookById = {
    [VALIDATOR]: celebrate({
        params: Joi.object()
            .keys({
                id: Joi.objectId().required(),
            })
            .required(),
    }),
    [CONTROLLER]: async (req, res) => {
        try {
            const bookGot = await Book.findById(req.params.id);
            if (!bookGot)
                return res.status(httpStatus.OK).json({
                    message: "Book not found",
                    success: false,
                    data: {},
                });
            const bookDelete = await Book.findByIdAndDelete(req.params.id);
            return res.status(httpStatus.OK).json({
                message: "Book deleted successfully",
                success: true,
                data: {},
            });
        } catch (err) {
            console.log(">> ERROR OCCURRED WHILE deleting BOOK : ", err);
            return res.status(httpStatus.OK).json({
                message: "Something went wrong",
                success: false,
                data: {},
            });
        }
    },
};
module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById,
};
