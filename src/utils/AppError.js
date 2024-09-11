//para lidar com quaisquer erros da aplicação

class AppError {
    message
    statusCode

    constructor (message, statusCode = 400) {
        this.message = message
        this.statusCode = statusCode
    }
}

module.exports = AppError