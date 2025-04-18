import { createApp } from './app.js'
import { sequelize } from './db/sequelize.js'

await createApp({ models: sequelize.models })
