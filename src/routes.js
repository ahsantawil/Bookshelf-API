const { addBooks, getBooks, getBooksId, editBooks, deleteBooks } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooks,
    },

    {
        method: 'GET',
        path: '/books',
        handler: getBooks,
    },

    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBooksId,
    },

    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBooks,
    },

    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBooks,
    }
];
 
module.exports = routes;