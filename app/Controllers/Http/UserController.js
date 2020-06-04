'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {
    
    async index ({ request, response }){
        try {
            const dataUser = await User.all()

            return response
            .status(200)
            .send({status: true, message: 'Data pengguna berhasil didapatkan', data: dataUser})
        } catch (err) {
            return response
            .status(err.status)
            .send(err)
        }
    }

    async add ({ request, response }) {
        
        try {
            const rules = {
                username: 'required',
                email: 'required|email',
                password: 'required'
            }
            // getting data passed within the request
            const data = request.only(['username', 'email', 'password'])
  
            // looking for user in database
            const userExists = await User.findBy('email', data.email)
            
            const validation = await validate(request.all(), rules)

            // if user exists don't save
            if(validation.fails()){
                return response
                .status(400)
                .send({ status: false, message: 'Harap mengisi semua input' })
            } else if (userExists) {
                return response
                .status(400)
                .send({ status: false, message: 'Pengguna sudah terdaftar' })
            }

            const user = await User.create(data)

            return response
            .status(200)
            .send({ status: true, message: 'Pengguna baru berhasil didaftarkan', data: user })
        } catch (err) {
            return response
            .status(err.status)
            .send(err)
        }
    }

    async show ({ params, response }){
            const dataUser = await User.find(params.id)

            if(!dataUser) {
                return response
                .status(404)
                .send({ status: false, message: 'Data pengguna tidak ditemukan'})
            }

            return response
            .status(200)
            .send({ status: true, message: 'Data pengguna berhasil di dapatkan', data: dataUser })
        
    }

    async edit ({ params, request, response }) {
        try {
            const rules = {
                username: 'required',
                email: 'required|email'
            }
            
            const username = request.username
            const email = request.email
            const password = request.password
            // looking for user in database
            const userExists = await User.findBy('id', params.id)

            if(!userExists){
                return response
                .status(404)
                .send({ status: false, message: 'Pengguna tidak ditemukan' })
            }
            if(password == '') {
                const updateData = await Database
                    .table('users')
                    .where('id', params.id)
                    .update({ username: username, email: email })
            } else {
                const updateData = await Database
                    .table('users')
                    .where('id', params.id)
                    .update({ username: username, email: email, password: password })
            }
            return response
            .status(200)
            .send({ status: true, message: 'Update data pengguna berhasil', data: updateData })
        } catch (err) {
            return response
            .status(err.status)
            .send(err)
        }
    }

    async destroy ({ params, request, response }) {
        try {
            const userExists = await User.findBy('id', params.id)

            if(!userExists){
                return response
                .status(404)
                .send({status: true, message: 'Data pengguna tidak ditemukan'})
            }
            await Contact.find(params.id).delete()
            return response
                .status(200)
                .send({ status: true, message: 'Data pengguna berhasil dihapus'})
        } catch (err) {
            return response
            .status(err.status)
            .send(err)
        }
        
    }

    async getProfile ({ auth, request, response }) {
        
        try {
            return response
            .status(200)
            .send({ status: true, message: 'Data pengguna berhasil di dapatkan', data: auth.current.user })
                    
        } catch (err) {
            return response
            .status(err.status)
            .send({ status: fale, message: 'Missing or Invalid token' })
        }
    }
}

module.exports = UserController
