'use strict'

const Todo = use('App/Models/Todo')
const { validate } = use('Validator')

class TodoController {
    async index ({ auth, request, response }){
        try {
            await auth.getAuthHeader()
        } catch (error) {
                return response
                .status(401)
                .send({ status: false, message: 'Missing or invalid api token' })
        }
        try {
            const dataTodo = await Todo.all()

            return response
            .status(200)
            .send({status: true, message: 'Data berhasil di dapatkan', data: dataTodo})
        } catch (err) {
            return response
            .status(err.status)
            .send(err)
        }
    }
    
    async add ({ auth, request, response }) {
        try {
            await auth.getAuthHeader()
        } catch (error) {
                return response
                .status(401)
                .send({ status: false, message: 'Missing or invalid api token' })
        }
        try {
            const rules = {
                task: 'required'
            }
            
            const data = request.only(['task'])
            
            const validation = await validate(request.all(), rules)
                if(validation.fails()){
                    return response
                    .status(200)
                    .send({ status: false, message: 'Harap mengisi semua input' })
                }
    
                const todo = await Todo.create(data)
    
                return response
                .status(200)
                    .send({ status: true, message: 'Data baru berhasil di tambahkan', data: todo })
            
        } catch (err) {
            return response
            .status(err.status)
            .send(err)
        }
    }

    async update({ auth, request, response, params }){
        try {
            await auth.getAuthHeader()
        } catch (error) {
                return response
                .status(401)
                .send({ status: false, message: 'Missing or invalid api token' })
        }

        try {
            const rules = {
                task: 'required'
            }
                                    
            const validation = await validate(request.all(), rules)
                if(validation.fails()){
                    return response
                    .status(200)
                    .send({ status: false, message: 'Harap mengisi semua input' })
                }

            const id = params.id;
            const todo = await Todo.find(id);
            todo.task = request.input('task');
            await todo.save();

            return response
            .status(200)
            .send({ status: true, message: 'Data berhasil di update', data: todo })
        } catch (error) {
            return response
            .status(err.status)
            .send(err)
        }
    }

    async delete ({ auth, request, response, params }){
        try {
            await auth.getAuthHeader()
        } catch (error) {
            return response
            .status(401)
            .send({ status: false, message: 'Missing or invalid api token' })
        }

        try {
            const id = params.id;
            const todo = await Todo.find(id);
            await todo.delete();
            
            return response
            .status(200)
            .send({ status: true, message: 'Data berhasil di hapus' })
        } catch (error) {
            return response
            .status(err.status)
            .send(err)
        }
    }
}

module.exports = TodoController
