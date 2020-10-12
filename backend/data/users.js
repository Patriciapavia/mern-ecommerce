const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email:'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456', 10),
       
    },
    {
        name: 'Jen Doe',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456', 10),
       
    }
]

module.exports = users