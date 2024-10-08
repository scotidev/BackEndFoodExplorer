const knex = require("../database/knex")
const AppError = require("../utils/AppError")

const { compare } = require("bcryptjs")

const authJWTConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class SessionsController {
    async create(request, response) {
        const { email, password } = request.body

        const user = await knex("users").where({email}).first()

        if(!user) {
            throw new AppError("E-mail ou senha incorreto.", 401)
        }

        const matchedPassword = await compare(password, user.password)

        if(!matchedPassword) {
            throw new AppError("E-mail ou senha incorreto", 401)
        }

        const { secret, expiresIn } = authJWTConfig.jwt
        const token = sign({role: user.role}, secret, {subject: String(user.id), expiresIn})

        return response.json({user, token})
    }
}

module.exports = SessionsController