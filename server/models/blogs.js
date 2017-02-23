module.exports =  function (conn, Sequelize) {
    var Blogs = conn.define("blog", {
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true, 
        },
        blog_desc: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isOK: function(value){
                    if(value != "test"){
                        throw new Error("Must be test !");
                    }
                }
            }
        } ,
        blog_date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "ERR002: Invalid email !"
                }
            }
        }
    },{
        timestamps : false,
        freezeTableName: false,
        hooks: {
            beforeValidate: function(Blogs){
                console.log("before validate blogs");
                console.log(Blogs.blog_desc);
                /*if(Blogs.blog_desc == "test"){
                    throw new Error("Test !");
                }*/
            },
            afterValidate: function(Blogs){
                console.log("after validate blogs");
            },
            beforeCreate: function(Blogs){
                console.log("before create blogs");
                console.log("get old records & update old record column on the audit trail table!");
            },
            afterCreate: function(Blogs){
                console.log("after create blogs");
                console.log("update the audit trail new update column !");
                
            },
        }
    });
    return Blogs;
};