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

var app = express();




// Map the data association 
Department.hasMany(Manager, { foreignKey: 'dept_no'});
Manager.hasOne(Employee, {foreignKey: 'emp_no'});

// setup of the configuration of express.
app.use(express.static(CLIENT_FOLDER));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// route path - retrieve all departments
app.get("/api/departments", function(req, res){
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
});

app.listen(NODE_PORT, function(){
    console.log("Server is running at port " + NODE_PORT);
})