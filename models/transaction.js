module.exports = (sequelize, type) => {
    return sequelize.define('transaction', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        credits: type.DECIMAL
    })
}