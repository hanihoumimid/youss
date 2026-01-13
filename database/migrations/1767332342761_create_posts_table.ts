import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.string('slug').notNullable().unique()
      table.text('excerpt').notNullable()
      table.text('content').notNullable()
      table.string('cover_image_url').notNullable()
      table.timestamp('published_at').nullable()
      table.integer('category_id').unsigned().notNullable().references('id').inTable('categories').onDelete('CASCADE')
      table.string('author_name').notNullable().defaultTo('Admin')
      table.integer('views_count').unsigned().defaultTo(0)
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
