import { Sequelize, DataTypes } from "sequelize"
import Users from './userModel.js'
import Tracker from './trackerModel.js'
import config from '../config/db.js'

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.DIALECT
    }
);

try {
    await sequelize.authenticate();
    console.log('connect to db');
} catch (error) {
    console.error(error.message);
}

const db = {}

db.users = Users(sequelize, DataTypes)
db.tracker = Tracker(sequelize, DataTypes)

db.users.hasMany(db.tracker, {
    foreignKey: 'user_id',
    as: 'tracker'
})
db.tracker.belongsTo(db.users, {
    foreignKey: 'user_id',
    as: 'user'
})

sequelize.sync({ force: false })
    .then(() => console.log("All models were synchronized successfully."))

export default db