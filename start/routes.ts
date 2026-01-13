/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import PostsController from '#controllers/posts_controller'

router.get('/', [PostsController, 'index'])
router.get('/posts/:slug', [PostsController, 'show'])
router.get('/category/:slug', [PostsController, 'category'])

