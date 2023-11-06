const mongoose = require('mongoose');
const {Schema , model} = mongoose;

const bookSchema = new Schema({
    title : {
        type: String,
    },
    author :  {
        type: String,
    },
    summary :  {
        type: String,
    },
})

const Book = model('Book', bookSchema);

module.exports = Book;