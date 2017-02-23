var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

const MYSQL_USERNAME = "root";
const MYSQL_PASSWORD = "password@123";

var conn = new Sequelize(
    'employees',
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
var Department = require('./models/department')(conn, Sequelize);
var Employee = require('./models/employee')(conn, Sequelize);
var Manager = require('./models/deptmanager')(conn, Sequelize);
var Blogs = require('./models/blogs')(conn, Sequelize);


const NODE_PORT = process.env.NODE_PORT || 8080;

// TODO check the dirname is correct when test .
const CLIENT_FOLDER = path.join(__dirname , '../client');
const MSG_FOLDER = path.join(CLIENT_FOLDER, 'assets/messages');

const API_DEPARTMENTS_ENDPOINT = "/api/departments";

var app = express();


// Map the data association 
Department.hasMany(Manager, { foreignKey: 'dept_no'});
Manager.hasOne(Employee, {foreignKey: 'emp_no'});

// setup of the configuration of express.
app.use(express.static(CLIENT_FOLDER));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

/**
 *  GET /api/departments - Get all dept records
 *  POST /api/departments - Save a department
 */

// route path - insert department record
app.post(API_DEPARTMENTS_ENDPOINT, function(req, res){
    console.log("Insert Dept");
    console.log(req.body);
    console.log(req.body.dept.no);
    console.log(req.body.dept.name);
    Department
        .create({
            dept_no: req.body.dept.no,
            dept_name: req.body.dept.name 
        }).then(function(department){
            res.status(200).json(department);
        }).catch(function(err){
            res.status(500).json(err);
        });
});

// route path - retrieve all departments
app.get(API_DEPARTMENTS_ENDPOINT, function(req, res){
    console.log(req.query.searchString);
    var searchString  = req.query.searchString
    if(searchString){
        Department
            .findAll({
                where: { 
                    $or: [
                        { dept_name: {$like: "%" + req.query.searchString + "%"}},
                        { dept_no: {$like: "%" + req.query.searchString + "%"}}
                    ]
                }
            }).then(function(departments){
                res
                    .status(200)
                    .json(departments);
            }).catch(function(err){
                res
                    .status(500)
                    .json(err);
            })
    }else{
     Department
        .findAll({
        }).then(function(departments){
            res
                .status(200)
                .json(departments);
        }).catch(function(err){
            res
                .status(500)
                .json(err);
        })   
    }    
});

app.put(API_DEPARTMENTS_ENDPOINT + "/:dept_no", function(req, res){
    var whereClause = {};
    whereClause.dept_no = req.params.dept_no;
    
    Department
        .update({ dept_name: req.body.dept_name},
            {where:  whereClause}
        ).then(function(result){
            res
                .status(200)
                .json(result);
        }).catch(function(err){
            console.log(err);
            res
                .status(500)
                .json(err);
        })
});

app.delete(API_DEPARTMENTS_ENDPOINT + "/:dept_no", function(req, res){
    console.log("delete dept");
    console.log(req.params.dept_no);
    var whereClause = {};
    whereClause.dept_no = req.params.dept_no;
    Department
        .destroy({
            where: whereClause
        }).then(function (result){
            console.log(result);
            if(result > 0){
                res.status(200).json({success: true});
            }else{
                res.status(200).json({success: false});
            }
        }).catch(function(err){
            res.status(50).json(err);
        });
});

app.listen(NODE_PORT, function(){
    console.log("Server is running at port " + NODE_PORT);
})