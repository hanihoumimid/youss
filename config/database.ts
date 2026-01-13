import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: env.get('DATABASE_URL') || {
        host: env.get('DB_HOST') || 'localhost',
        port: env.get('DB_PORT') || 5432,
        user: env.get('DB_USER') || 'postgres',
        password: env.get('DB_PASSWORD') || '',
        database: env.get('DB_DATABASE') || 'Hand',
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
