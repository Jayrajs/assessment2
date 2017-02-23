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

conn.authenticate(function(){
    console.log("DB connected");
}).catch(function(err){
    console.log(err);
})

var blogs = require('./models/blogs')(conn, Sequelize);

conn.sync({
    force:true
}).then( function(){
    console.log("Sync db !");
    blogs.create({
        id: 1,
        blog_desc: "test",
        blog_date: new Date(),
        email: "kenneth@gmail.com"
    });
});



