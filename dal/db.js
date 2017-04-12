/**
 * Created by deepakkhetwal on 4/9/17.
 */
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const Model = require('./model');
let db;
class Db {
  async connect(){
      if(!db){
          console.log(config.db.mongoUrl);
          db = await MongoClient.connect(config.db.mongoUrl);
          this.joke = new Model(db, 'jokes');
      }
  }
};
module.exports = new Db();