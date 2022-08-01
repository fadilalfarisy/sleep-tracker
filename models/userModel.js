const Users = (sequelize, Datatypes) => {
    return sequelize.define('Users', {
        id: {
            type: Datatypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Datatypes.STRING
        },
        password: {
            type: Datatypes.STRING
        },
        refreshToken: {
            type: Datatypes.STRING
        },
    }, {
        freezeTableName: true,
        timestamps: false
    })
}

export default Users