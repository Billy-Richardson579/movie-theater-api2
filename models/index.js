const Show = require('./Show')
const User = require('./User')

Show.belongsToMany(User, {through: 'us'})
User.belongsToMany(Show, {through: "us"})

module.exports = {
    Show, 
    User
}
