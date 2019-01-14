var express = require("express");
var router = express.Router()
var  MongoClient = require('mongodb').MongoClient;

var mongoose = require('mongoose');
var Person = require('../models/person_model.js');

var ValidationError=require('../ErrorHandler/validationError.js');

const database="myNewDatabase";
const collection="customers";
const connectionString ='mongodb://localhost:27017/myNewDatabase';


router.get('/', function (req, res) {    
    res.send('hey world.');    
})


router.get('/getMongoDb', function (req, res,next) {
    var validatioErrorArray =new Array();
    MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
        if(err) {
            return next(err)    
        }

        var db = client.db(database);        
    
        db.collection(collection).findOne({name :{ $regex:"^laxmikant$",$options:"$i"},age:{$gt:50}}, { projection: { _id:0}},function(err, user) {
            if(err) {
                return next(err)    
            }  
           
            if (!user.age) {
                validatioErrorArray.push(new ValidationError("Field can not be blank -","age"));
              }
            if (!user.name) {
                validatioErrorArray.push(new ValidationError("Field can not be blank -","name"));
            }
             
            if(validatioErrorArray.length>0){
                return next(validatioErrorArray);
            }
            
            res.send(JSON.stringify(user)) ;
        }); 
    });
});


router.get('/getAll', function (req, res,next) {
    MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
        if(err) {
            return next(err)    
        }

        var db = client.db(database); 

        db.collection(collection).find({}).toArray(function(err, user) {
            if (err) throw err;
            res.send(JSON.stringify(user))
        });
    });
});

router.get('/aggregateMongoDb', function (req, res,next) {
    MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
        if(err) {
            return next(err)    
        }

        var db = client.db(database); 

        db.collection(collection).aggregate([{$group :{_id:"$name"}}]).toArray(function(err, user) {
            if (err) throw err;
            res.send(JSON.stringify(user))
        });
    });
});

router.get('/createIndex', function (req, res,next) {
    MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
        if(err) {
            return next(err)    
        }

        var db = client.db(database); 

        db.collection(collection).createIndex({name:1},function(err, user) {
            if (err) throw err;
            res.send("index created")
        });
    });
});


router.get('/insertMongoDb', function (req, res,next) {
    MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
        if(err) {
            return next(err)    
        }

        var db = client.db(database); 
        var myobj = [
            { name: 'John', address: 'Highway 71'},
            { name: 'Peter', address: 'Lowstreet 4'},
            { name: 'Amy', address: 'Apple st 652'},
            { name: 'Hannah', address: 'Mountain 21'},
            { name: 'Michael', address: 'Valley 345'},
            { name: 'Sandy', address: 'Ocean blvd 2'},
            { name: 'Betty', address: 'Green Grass 1'},
            { name: 'Richard', address: 'Sky st 331'},
            { name: 'Susan', address: 'One way 98'},
            { name: 'Vicky', address: 'Yellow Garden 2'},
            { name: 'Ben', address: 'Park Lane 38'},
            { name: 'William', address: 'Central st 954'},
            { name: 'Chuck', address: 'Main Road 989'},
            { name: 'Viola', address: 'Sideway 1633'}
          ];

        db.collection(collection).insertMany(myobj,function(err, user) {
            if (err) throw err;
            res.send("inserted");
        });
    });
});

router.get('/updateMongoDb', function (req, res,next) {
    MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
        if(err) {
            return next(err)    
        }

        var db = client.db(database); 

        var name="testing";
        var myquery = { name: {$regex:"^"+name+"$",$options:"$i"} };
        var newvalues = {$set:{name: "Hello",age:25} };
        var where={age:{$gt:25}};
        db.collection(collection).updateMany(myquery, newvalues, function(err, user) {
            if (err) throw err;
            res.send(user.result.nModified+" document updated");
        });
    });
});

router.get('/dropMongoDbCollection', function (req, res,next) {
    MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
        if(err) {
            return next(err)    
        }

        var db = client.db(database); 

        db.collection(collection).drop(function(err, user) {
            if (err) throw err;
            res.send("Collection deleted");
        });
    });
});

router.get('/dropMongoDbCollection', function (req, res,next) {
    MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
        if(err) {
            return next(err)    
        }

        var db = client.db(database); 

        db.collection(collection).drop(function(err, user) {
            if (err) res.send("Collection not deleted");;
            res.send("Collection deleted");
        });
    });
});

router.get('/addMongoos', function (req, res,next) {
    
    mongoose.connect(connectionString);
    var db = mongoose.connection;
    db.on('error',   function(error) { return  next(error);} );
    db.once('open', function() {

        var testing = new Person({ name: 'testing' });
          
        testing.save(function (err) {
            if (err) return next(err)  ;  
          });
          res.send("person added");
    });
})

router.get('/getMongoos', function (req, res,next) {
    
        mongoose.connect(connectionString);
        var db = mongoose.connection;
        db.on('error',   function(error) { return  next(error);} );
        db.once('open', function() {
                Person.find(null,'-_id name', { skip: 1 },function (err, person) {
                if (err) return next(err) ;   
                res.send(person);
              })
        });
})

router.get('/deleteMongoos', function (req, res,next) {
    
    mongoose.connect(connectionString);
    var db = mongoose.connection;
    db.on('error',   function(error) { return  next(error);} );
    db.once('open', function() {
            Person.deleteOne({name :'testing'},function (err, person) {
            if (err) return next(err) ;   
            res.send("person deleted");
          })
    });
})


router.get('/updateMongoos', function (req, res,next) {
    
    mongoose.connect(connectionString);
    var db = mongoose.connection;
    db.on('error',   function(error) { return  next(error);} );
    db.once('open', function() {
            
            Person.findOne({name :'Laxmikant'},function (err, person) {
                if (err) return next(err);
                person.age="255";
                person.save();
              })
         res.send("person updated!")     ;
    });
})

module.exports = router