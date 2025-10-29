const { Sequelize } = require('sequelize');
require('dotenv').config();

// First, create a connection without specifying database to create it if needed
const createDatabaseIfNotExists = async () => {
  const tempSequelize = new Sequelize('', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  });

  try {
    await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`✅ Database '${process.env.DB_NAME}' ready.`);
    await tempSequelize.close();
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    await tempSequelize.close();
    throw error;
  }
};

// Create Sequelize instance with MySQL connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: false
    }
  }
);

// Test database connection
const testConnection = async () => {
  try {
    // Create database if it doesn't exist
    await createDatabaseIfNotExists();
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, testConnection };
