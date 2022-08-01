const Tracker = (sequelize, Datatypes) => {
    return sequelize.define('Tracker', {
        id: {
            type: Datatypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        idUser: {
            type: Datatypes.BIGINT(20)
        },
        startSleep: {
            type: Datatypes.BIGINT
        },
        stopSleep: {
            type: Datatypes.BIGINT
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
}

export default Tracker