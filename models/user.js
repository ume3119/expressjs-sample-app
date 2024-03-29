module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: type.STRING,
    password: type.STRING,
    credits: type.DECIMAL
  })
}