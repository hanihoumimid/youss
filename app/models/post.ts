import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/orm'
import Category from './category.js'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare excerpt: string

  @column()
  declare content: string

  @column()
  declare coverImageUrl: string

  @column.dateTime()
  declare publishedAt: DateTime | null

  @column()
  declare categoryId: number

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @column()
  declare authorName: string

  @column()
  declare viewsCount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
