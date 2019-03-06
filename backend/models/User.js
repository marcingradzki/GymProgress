const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

const addUser = ({ username, password }) => {
  let hash = bcrypt.hashSync(password, 10);
  return User.create({
      username,
      password: hash,
  })
};

const getAll = () => {
  return User.findAll({ attributes: ['id', 'username', 'password'] }).then(users => {
    return users;
  });
}

const getUser = (username) => {
  return User.findOne({ where: { username } })
    .then(user => {
      return user
    });
};

const validPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

const findById = (id) => User.findById(id);

module.exports = {
    addUser,
    getUser,
    getAll,
    validPassword,
    findById,
    User,
}