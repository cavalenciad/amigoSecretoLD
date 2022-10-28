module.exports = (sequelize, DataTypes) => {

    let alias = "members";

    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },        
        name:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastname:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        idcard:{
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        like:{
            type: DataTypes.STRING(200),
            allowNull: false
        },
        dislike:{
            type: DataTypes.STRING(200),
            allowNull: false
        },
        alergies:{
            type: DataTypes.STRING(200),
            allowNull: false
        },
        rol:{
            type: DataTypes.INTEGER
        },
        id_member:{
            type: DataTypes.INTEGER
        },
        id_groups:{
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        }
    };

    let config = {
        tableName: "members",
        timestamps: false
    };

    const members = sequelize.define(alias, cols, config)

    members.associate = function(models){
        members.belongsTo(models.groups, {
            as: "groups",
            foreignKey: "id_groups"
        });
    };

    return members;

}