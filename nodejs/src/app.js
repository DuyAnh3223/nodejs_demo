require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app=express();

//init middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet()); // Bảo mật ứng dụng Express
app.use(compression()); // Nén các phản hồi HTTP để giảm băng thông


/*
Morgan in ra phương thức (GET, POST, PUT, DELETE), Route, HTTP status code, thời gian phản hồi và kích thước của phản hồi.
app.use(morgan('dev')); // Màu sắc của HTTP status code
app.use(morgan('combined')); // Dùng cho production, log đầy đủ thông tin
app.use(morgan('common')); // Tiêu chuẩn của APACHE, tương tự với 'combined' nhưng không có màu sắc
app.use(morgan('short'));
app.use(morgan('tiny'));
*/ 

//init db
require('./dbs/init.mongodb')

//init routes
app.get('/', (req, res, next) => {
    //const strCompress ="Hello World";
    return res.status(200).json({
        message: 'Welcome to WsV eCommerce API',
        //strCompress: strCompress,
        //strCompressLength: strCompress.length
    });
})
// handle errors

module.exports = app;