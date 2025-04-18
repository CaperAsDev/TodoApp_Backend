import { Sequelize } from 'sequelize'
import { config } from '../config/config.js'
import setupModels from './models/index.js'

let URI = ''

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : console.log // Desactiva logs en prod
}

if (config.isProd) {
  URI = config.dbUrl
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
} else {
  const USER = encodeURIComponent(config.dbUser)
  const PASSWORD = encodeURIComponent(config.dbPassword)
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
}

export const sequelize = new Sequelize(URI, options)

setupModels(sequelize)

// Función para sincronizar la base de datos
async function syncDatabase () {
  try {
    await sequelize.sync({ alter: true }) // Usa alter en vez de force
    console.log('Database synced successfully.')
  } catch (error) {
    console.error('Error syncing database:', error)
  }
}

// Función para probar la conexión
async function testConnection () {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

// Ejecutar las pruebas al iniciar
export async function init () {
  await testConnection()
  await syncDatabase()
}
