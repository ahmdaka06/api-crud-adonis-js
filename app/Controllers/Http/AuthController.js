'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')
class AuthController {
    async login ({ response, request, auth }) {

        let { email, password } = request.all()

        try {

        const checkLogin = await auth
        .authenticator('api')
        .attempt(email, password)
            return response
                .status(201)
                .send({ status: true, message: { token: checkLogin}})
            
          
        } catch (err) {
            console.log(err)
            return response
            .status(400)
            .send({status: true, message: 'Pengguna tidak terdaftar.'})
        }
    }

    async register ({ request, response }) {
        
        try {
            const rules = {
                username: 'required',
                email: 'required|email',
                password: 'required|confirmed'
            }
            
            const data = request.only(['username', 'email', 'password'])
  
            
            const userExists = await User.findBy('email', data.email)
            
            const validation = await validate(request.all(), rules)

            
            if(validation.fails()){
                return response
                .status(400)
                .send({ status: false, message: 'Harap mengisi form dengan benar' })
            } else if (userExists) {
                return response
                .status(400)
                .send({ status: false, message: 'Pengguna sudah terdaftar' })
            }

            const user = await User.create(data)

            return response
            .status(200)
            .send({ status: true, message: 'Register berhasil', data: user })
        } catch (err) {
            return response
            .status(err.status)
            .send(err)
        }
    }

}

module.exports = AuthController
