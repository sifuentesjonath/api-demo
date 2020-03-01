'use strict'

const { MongoClient } = require('mongodb')
 
const {
    DB_USER,
    DB_PSWD,
    DB_NAME,
    DB_HOST,
    DB_PORT
}  =  process.env;
// mongodb+srv://sifuentesjonath:losetodo.123@cluster0-evoiw.mongodb.net/test
const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PSWD}@${DB_HOST}/${DB_NAME}`

let connection


async function connectDB()  {
    if (connection) return connection

    let  client
try {
    client = await MongoClient.connect(mongoUrl, {
        useNewUrlParser: true
    })
    connection = client.db(DB_NAME);
    
} catch (error) {
    console.log('could not connect ', mongoUrl, error);
    process.exit(1);
}

       return connection
}

module.exports = connectDB;