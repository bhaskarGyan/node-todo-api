const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err){
        return console.log('Unable to coonect to Mondodb')
    }

    db.collection('User').find({name:'Vardhan'}).toArray().then((docs)=>{
        console.log('Documents ');
        console.log(JSON.stringify(docs,undefined,2));
    }, (err) => {
       console.log('Unable to fetch data',err);
    });

    db.close();
});