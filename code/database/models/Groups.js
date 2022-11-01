module.exports = (sequelize, DataTypes) => {

    let alias = "groups";

    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },        
        groupname:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        firstcandy:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        secondcandy:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        finalmeeting:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
    };

    let config = {
        tableName: "groups",
        timestamps: false
    };

    const groups = sequelize.define(alias, cols, config)

    groups.associate = function(models){
        groups.hasMany(models.members, {
            as: "members",
            foreignKey: "id_groups"
        });
    };

    return groups;

}