var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

const MYSQL_USERNAME = "root";
const MYSQL_PASSWORD = "2hellothere";

var conn = new Sequelize(
    'grocery_list',
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    {
        host: 'localhost',
        logging: console.log,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

// import the database models into the app.js
var Grocery_List = require('./models/grocery_list')(conn, Sequelize);


const NODE_PORT = process.env.NODE_PORT || 8080;

const CLIENT_FOLDER = path.join(__dirname , '../client');
const MSG_FOLDER = path.join(CLIENT_FOLDER, 'assets/messages');
const API_DEPARTMENTS_ENDPOINT = "/api/grocery_list";

var app = express();

// setup of the configuration of express.
app.use(express.static(CLIENT_FOLDER));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


app.get(API_DEPARTMENTS_ENDPOINT, function(req, res){
    var searchString  = req.query.searchString
    if(searchString){
        Grocery_List
            .findAll({
                where: { 
                    $or: [
                        { id: {$like: "%" + req.query.searchString + "%"}},
                        { brand: {$like: "%" + req.query.searchString + "%"}}
                    ]
                }
            }).then(function(grocery_list){
                res
                    .status(200)
                    .json(grocery_list);
            }).catch(function(err){
                res
                    .status(500)
                    .json(err);
            })
    }else{
     Grocery_List
        .findAll({
        }).then(function(grocery_list){
            res
                .status(200)
                .json(grocery_list);
        }).catch(function(err){
            res
                .status(500)
                .json(err);
        })   
    }    
});

app.get(API_DEPARTMENTS_ENDPOINT + "/:id", function(req, res){
    console.log(req.params.id);
    Grocery_List
            .find({
                where: { 
                    id: req.params.id
                }
            }).then(function(grocery_list){
                res
                    .status(200)
                    .json(grocery_list);
            }).catch(function(err){
                res
                    .status(500)
                    .json(err);
            })
});


app.get(API_DEPARTMENTS_ENDPOINT + "/:brand", function(req, res){
    console.log(req.params.brand);
    Grocery_List
            .find({
                where: { 
                    id: req.params.brand
                }
            }).then(function(grocery_list){
                res
                    .status(200)
                    .json(grocery_list);
            }).catch(function(err){
                res
                    .status(500)
                    .json(err);
            })
});





app.use(function(req,res){
    res.status(400).sendFile(path.join(MSG_FOLDER, "404.html"));
});

app.use(function(err, req, res, next){
    console.log("An error had occured 500");
    res.status(500).sendFile(path.join(MSG_FOLDER, "500.html"));
});


app.listen(NODE_PORT, function(){
    console.log("Server is running at port " + NODE_PORT);
})