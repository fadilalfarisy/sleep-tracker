const Tracker = (models) => {
    models.tracker.belongsTo(models.users, { foreignKey: 'idUser' })
}

const association = (models) => {
    Tracker(models)
}

export default association