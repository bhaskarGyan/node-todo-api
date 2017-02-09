/**
 * Created by bhaskar on 09/02/17.
 */
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
   if(err) return console.log('Unable to connect to DB',err);

   db.collection('User').findOneAndUpdate({
       _id:new ObjectID('589b4282764cd3e72b4a6067')
   },{
       $inc:{
           age:2
       }
   },{
       returnOriginal:false
   }).then(function(results){
       console.log(results);
   });

   db.collection('Todos').findOneAndUpdate({
       text:'Something to complete'
   },{
       $set:{
           completed:true
       }
   },{
       returnOriginal:false
   }).then((results)=>{
       console.log(results);
   });
});