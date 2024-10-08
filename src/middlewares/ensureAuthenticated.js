const authJWTConfig = require("../configs/auth")
const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new AppError("Token não existe.", 401)
    }

    const [ , token ] = authHeader.split(" ")

    try {
        const { role, sub: user_id } = verify(token, authJWTConfig.jwt.secret)

        request.user = {
            id: Number(user_id),
            role
        }

        return next()

    } catch {
        throw new AppError("Token inválido", 401)
    }
}

module.exports = ensureAuthenticated