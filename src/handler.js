const { nanoid } = require ('nanoid');
const Books = require('./books');

const addBook = (req, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newBooks = {
        id, name, year, author, summary, publisher, pageCount, readPage, reading, createdAt, updatedAt
    };

    Books.push(newBooks);

    const isSuccess = Books.filter((book) => book.id === id).length > 0;
    
    if(isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                book: id,
            },
        });
        response.code(201);
        return response;
    }

    
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;

};

const getBook = (req, h) => ({
    status: 'success',
    data: {
        Books,
    },
});

const getBookWithId = (req, h) => {
    const { id } = req.params;

    const book = Books.filter((n) => n.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBook = (req, h) => {
    const { id } = req.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
    const updatedAt = new Date().toISOString();

    const index = Books.findIndex((book) => book.id === id);

    if (index !== -1) {
        Books[index] = {
            ...Books[index],
            name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
        };

        return {
            status: 'success',
            message: 'Buku berhasil diperbaharui',
        };
    }

    const response = h.response({
        status: 'Fail',
        message: 'Gagal memperbaharui buku. ID tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBook = (req, h) => {
    const { id } = req.params;

    const index = Books.findIndex((book) => book.id === id);

    if (index !== -1) {
        Books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'Fail',
        message: 'Buku gagal dihapus, Id tidak ditemukan',
    });

    response.code(404);
    return response;
};

module.exports = { addBook, getBook, getBookWithId, editBook, deleteBook };