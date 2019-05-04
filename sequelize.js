const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const TransactionModel = require('./models/transaction')

const sequelize = new Sequelize('passfolio', 'ume', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})

const User = UserModel(sequelize, Sequelize)
const Transaction = TransactionModel(sequelize, Sequelize)

Transaction.belongsTo(User);

// Force: true only for development purposes.
sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
})

module.exports = {
    User,
    Transaction
}