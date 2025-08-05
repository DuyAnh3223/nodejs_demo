'use strict'
const mongoose = require('mongoose');
const connectString='mongodb://localhost:27017/wsv-ecommerce';
const{countConnect} = require('../helpers/check.connect');
class Database{
    constructor() {
        this.connect();
    }

    //connnect
    connect(type='mongodb') {
        //dev
        if(1===1){
            mongoose.set('debug',true)
            mongoose.set('debug',{color: true})
        }

        mongoose.connect(connectString,{
            maxPoolSize: 50 // Tối đa 50 kết nối trong pool, tăng giảm tùy vào CPU và Memory của server
            // PoolSize: Nhóm kết nối, tập hợp các nối nối của CSDL mà có thể tái sử dụng được duy trì bởi database.
        }).then(_ => {
            console.log('Connected Mongodb Success',countConnect())
        })
        .catch(err=>console.log('Error Connect!',err));
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongoDB = Database.getInstance();
module.exports = instanceMongoDB;
