import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import Category from '#models/category'

export default class PostsController {
  async index({ inertia }: HttpContext) {
    const posts = await Post.query()
      .preload('category')
      .orderBy('publishedAt', 'desc')
      .limit(12)

    const categories = await Category.all()

    const featured = posts.slice(0, 3)
    const recent = posts

    return inertia.render('home', {
      featured,
      recent,
      categories,
    })
  }

  async show({ params, inertia }: HttpContext) {
    const post = await Post.query()
      .where('slug', params.slug)
      .preload('category')
      .firstOrFail()

    const relatedPosts = await Post.query()
      .where('categoryId', post.categoryId)
      .where('id', '!=', post.id)
      .orderBy('publishedAt', 'desc')
      .limit(3)

    return inertia.render('post/show', {
      post,
      relatedPosts,
    })
  }

  async category({ params, inertia }: HttpContext) {
    const category = await Category.query()
      .where('slug', params.slug)
      .firstOrFail()

    const posts = await Post.query()
      .where('categoryId', category.id)
      .orderBy('publishedAt', 'desc')

    const allCategories = await Category.all()

    return inertia.render('category/index', {
      category,
      posts,
      allCategories,
    })
  }
}
