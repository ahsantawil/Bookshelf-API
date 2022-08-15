const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        },
    },

    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About page';
        },
    },

    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method';
        },
    },

    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Halaman tidak ditemukan';
        },
    },
];
 
module.exports = routes;