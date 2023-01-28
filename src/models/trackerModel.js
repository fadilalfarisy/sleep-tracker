const Tracker = (sequelize, DataTypes) => {
    return sequelize.define('tracker', {
        tracker_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        startSleep: {
            type: DataTypes.BIGINT
        },
        stopSleep: {
            type: DataTypes.BIGINT
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
}

export default Tracker