const db = require("../util/db_connection");
const {DataTypes} = require('sequelize');
const User = db.define('users', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    emailid:{
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    grouproleid:
    {
        type: DataTypes.STRING
    },
    depotcode: {
        type: DataTypes.INTEGER
    },
    ptoid: {
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.STRING,
        enum: ["User", "Admin"]
    },
    token: {
        type: DataTypes.TEXT
    }
},
    {
        schema: 'usm',
        freezeTableName: true,
        timestamps: false
    }
);
module.exports = User;