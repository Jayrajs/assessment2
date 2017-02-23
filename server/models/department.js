module.exports = function (conn, Sequelize){
    var Departments =  conn.define('departments', {
        dept_no: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        dept_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: "departments",
        timestamps: false
    });
    return Departments;
};