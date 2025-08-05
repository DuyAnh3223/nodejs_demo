'use strict';
//Kiểm tra hệ thống có bao nhiêu Kết nối
const mongoose = require('mongoose');
const os =require('os');
const process = require('process');
const _SECONDS = 5000

//Count Connect
const countConnect  =()=> {
    const numConnection=mongoose.connections.length;
    console.log(`Number of connections::${numConnection}`);
}

//Check Overload Connect
const checkOverload=()=>{
    setInterval( ()=>{
        const numConnection=mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        //Example maximum number of connections based on number of cores
        const maxConnections = numCores * 5; // Example: 5 connections per core
        console.log(`Active Connection::${numConnection}`);
        console.log(`Memory usage::${memoryUsage / 1024 / 1024} MB`);

        if(numConnection>maxConnections){
            console.log('Connection overload detected!');
            //notify.send()
        }
    }, _SECONDS) //Monitor every 5 seconds
}

module.exports={
    countConnect
    ,checkOverload
};