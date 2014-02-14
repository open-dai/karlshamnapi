var express = require('express');
var app = express();

var databaseUrl = 'root:Pas$w0rdO!@194.116.110.159:41022/POIDB'; // "username:password@example.com/mydb"
//var databaseUrl = 'localhost/POIDB'; // "username:password@example.com/mydb"
var collections = ['pois', 'poiTypes'];
var db = require('mongojs').connect(databaseUrl, collections);

//Get the different poi-types
app.get('/types', function(req, res){
    'use strict';
    db.poiTypes.find({}, {Name: 1}, function(err, data){
        res.send(data);
    });
});

//Get pois by type(category)
app.get('/pois/:type', function(req, res){
    'use strict';

    var type = req.params.type;
    db.pois.find({POIType: type}, function(err, data){
        res.send(200, data);
    });
});

//Get all data
app.get('/pois', function(req, res){
    'use strict';
    var query = req.query;
    console.log(query);
    db.pois.find(query, function(err, data){
        res.send(200, data);
    });
    
});

//Search all pois
app.get('/search', function(req, res){
    'use strict';
    var query = req.query;
    db.pois.find({'Name': new RegExp(query.query, 'i')}, function(err, data){
        res.send(200, data);
        console.log(err);
        console.log(data);
    });
});

//Not found 404 error stuff
app.get('*', function(req, res){
    'use strict';

    res.sendfile('error/404.html');
});

app.listen(8087);