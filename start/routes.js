'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/login', 'AuthController.login')
Route.post('/register', 'AuthController.register')

Route.get('api/users', 'UserController.index')
Route.post('api/users', 'UserController.add')
Route.get('api/users/:id', 'UserController.show')
Route.put('api/users/:id', 'UserController.update')
Route.get('api/profile', 'UserController.getProfile').middleware(['auth:api'])

Route.get('api/todo', 'TodoController.index').middleware(['auth:api'])
Route.post('api/todo', 'TodoController.add').middleware(['auth:api'])
Route.put('api/todo/:id', 'TodoController.update').middleware(['auth:api'])
Route.delete('api/todo/:id', 'TodoController.delete').middleware(['auth:api'])
