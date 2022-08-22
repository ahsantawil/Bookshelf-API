const { nanoid } = require ('nanoid');
const books = require('./books');

const addBook = (req, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;

    const id = nanoid(16);
    const countpage = (req.payload.pageCount === req.payload.readPage);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    if (name === undefined) {
        const response = h.response ({
            status : 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400)
        return response;
    };

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, reading, createdAt, updatedAt
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    
    if(isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
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

const getBook = (req, h) => {
    
    const response = h.response({
        status: 'success',
        data: {
            books : books.map((book) => ({
                id : book.id,
                name: book.name,
                publisher: book.publisher
            })),
        },
    });
    response.code(200);
    return response;

};

const getBookWithId = (req, h) => {
    const { bookId } = req.params;

    const book = books.filter((b) => b.id === bookId)[0];

    if (book !== undefined) {
        const response = h.response ({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response;
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

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
        };

        return {
            status: 'success',
            message: 'Buku berhasil diperbarui',
        }
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

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
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