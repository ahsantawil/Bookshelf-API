const { addBook, getBook, getBookWithId, editBook, deleteBook } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },

    {
        method: 'GET',
        path: '/books',
        handler: getBook,
    },

    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookWithId,
    },

    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBook,
    },

    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBook,
    }
];
 
module.exports = routes;