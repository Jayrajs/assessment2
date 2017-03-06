
module.exports = function (sequelize, Sequelize) {
    var Grocery_List = sequelize.define("grocery_Lists",
        {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                primaryKey: true
            },
            upc12: {
                type: Sequelize.BIGINT(12),
                allowNull: false
            },
            brand: {
                type: Sequelize.STRING,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },    
        {
            timestamps: false
         });

    return Grocery_List;
};