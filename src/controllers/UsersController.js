const AppError = require("../utils/AppError")
const { hash, compare } = require("bcryptjs")
const sqliteConnection = require("../database")

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body

        const database = await sqliteConnection()

        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(checkUserExists) {
            throw new AppError("Este email já está sendo utilizado.")
        }

        const hashedPassword = await hash(password, 8)

        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        )

        return response.status(201).json()
    }

    async update(request, response) {
        const {name, email, newPassword, oldPassword} = request.body
        const { id } = request.params

        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

        if(!user) {
            throw new AppError("Usuário não encontrado")
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este email já está em uso.")
        }

        user.name = name ?? user.name
        user.email = email ?? user.name

        if(newPassword && !oldPassword) {
            throw new AppError("Insira a senha antiga")
        }

        if(newPassword && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password)

            if(!checkOldPassword) {
                throw new AppError("A senha não coincide.")
            }

            user.password = await hash(newPassword, 8)
        }

        await database.run(`
            UPDATE users SET 
            name = ?,
            email = ?,
            password = ?
            WHERE id = ?`,
            [user.name, user.email, newPassword, id]
        )

        return response.json()
    }
}

module.exports = UsersController