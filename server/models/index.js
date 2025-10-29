const { sequelize } = require('../config/database');
const User = require('./User');
const Task = require('./Task');

// Define model associations
User.hasMany(Task, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  as: 'tasks'
});

Task.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Sync models with database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized successfully.');
  } catch (error) {
    console.error('❌ Error synchronizing database:', error.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  User,
  Task,
  syncDatabase
};
