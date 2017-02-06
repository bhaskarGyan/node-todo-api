const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err){
        return console.log('Unable to coonect to Mondodb')
    }

    console.log('Connect to Mongodb ');

   /* db.collection('Todos').insertOne({
        text:'Something to complete',
        completed:false
    }, (err,results) => {
        if(err){
            return console.log('Unable to save data')
        }
        console.log(JSON.stringify(results.ops,undefined,2));
    });*/

   db.collection('User').insertOne({
       name:'BGV',
       age:28,
       location:'Sandton, Johannesburg'
   },(err,results)=>{
       if(err){
           return console.log('Unable to connect to Mongodb',err);
       }

       console.log(results.ops);
   });

    db.close();
});