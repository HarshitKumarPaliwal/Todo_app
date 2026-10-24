import { MongoClient } from "mongodb";
const url="mongodb+srv://harshitkumarpaliwal08_db_user:GoogleTest@cluster0.fqnvukt.mongodb.net/"
//const url = "mongodb://127.0.0.1:27017/";


//const url =  "mongodb://127.0.0.1:27017/"
const database = "node-Project";
export const collectionName = "to-do";

const client = new MongoClient(url);

export const connection = async () => {
   const connect = await client.connect();
   // Yahan 'node-Project' ki jagah string ya upar wala 'database' variable use hoga
   return connect.db(database); 
}