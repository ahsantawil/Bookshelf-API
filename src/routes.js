const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (req, h) => {
            return 'Homepage';
        },
    },

    {
        method: 'GET',
        path: '/about',
        handler: (req, h) => {
            return 'About page';
        },
    },

    {
        method: '*',
        path: `/hello/{name?}`,
        handler: (req, h) => {
            const { name = "stranger" } = req.params;
            return `Hello, ${name}!`;
        },
    },

    {
        method: 'POST',
        path: '/login',
        handler: (req, h) => {
            const { username, password } = req.payload;
            return `Welcome ${username}`;
        },
    },
];
 
module.exports = routes;