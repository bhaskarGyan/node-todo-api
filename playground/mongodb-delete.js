const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err){
        return console.log('Unable to coonect to Mondodb')
    }

    //deleteOne
    db.collection('User').deleteOne({name:'Gyan'}).then((results)=>{
        console.log(results);
    });

    //deleteMany
    db.collection('User').deleteMany({name:'Gyan'}).then((results)=>{
        console.log(results)
    });

    //findonedelete
    db.collection('User').findOneAndDelete({_id:new ObjectID('589b426c764cd3e72b4a6065')}).then((result)=>{
        console.log(result);
    });

});