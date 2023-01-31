const express = require('express');
const mysql = require('mysql2');

const app = express();

const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: '',
    port: 3306
}

const connection = mysql.createConnection(mysqlConfig);

const PORT = 8000;
app.listen(PORT, () => console.log(`Express server running on PORT:${PORT}`))