const Firebird = require("node-firebird");
require('dotenv').config();

export default {
    host: process.env.host,
    port: process.env.port ? parseInt(process.env.port, 10) : undefined,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
};