import Sequelize from "sequelize"
import Users from './userModel.js'
import Tracker from './trackerModel.js'
import config from '../config/db.js'
import association from "../config/association.js"

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    port: config.port
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const models = {}
models.users = Users(sequelize, Sequelize)
models.tracker = Tracker(sequelize, Sequelize)

association(models)

// await sequelize.sync({ force: true });
// console.log("All models were synchronized successfully.");

export default models