'use strict'

const Post = use('App/Models/Post')

const { validate } = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {

    let posts = await Post.query()
      .with('author', (builder) => { builder.select('id', 'username', 'email') })
      .fetch()
    return response.json(posts)

  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }

  async store({ request, auth, response }) {

    const rules = {
      title: 'required',
      description: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.json({ error: validation.messages() })
    }

    try {
      //if (await auth.check()) {
      let post = await auth.user.posts().create(request.all())
      //await post.load('user');
      return response.json({ post, status: "success", message: "Post created" })
      //}

    } catch (e) {
      console.log(e)
      return response.json({ message: 'You are not authorized to perform this action' })
    }

  }

  async showMine({ request, auth, response }) {
    //return auth.user.id
    try {
      const posts = await Post.query().where('user_id', "=", auth.user.id).fetch()
      return response.json({ data: posts, status: 'success' })
    } catch (err) {
      return response.json({ error: err, status: 'failed' })
    }
  }

}

module.exports = PostController
