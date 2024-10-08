const AppError = require("../utils/AppError")
const knex = require("../database/knex")

// funções para encriptar a senha
const { hash, compare } = require("bcryptjs")

class UsersController {
    async create(request, response) {
        const { name, email, password, role } = request.body
    
        const checkUserExists = await knex("users").where({ email }).first()
    
        if (checkUserExists) {
          throw new AppError("Este e-mail já está em uso")
        }
    
        if(password.length < 6) {
          throw new AppError("A senha precisa conter pelo menos 6 caracteres")
        }
    
        const hashedPassword = await hash(password, 8)
    
        const user = await knex("users").insert({
          name,
          email,
          password: hashedPassword,
        })
    
        if (!name) {
          throw new AppError("Nome é obrigatório")
        }
    
        return response.status(201).json({ message: "Usuário cadastrado com sucesso" })
      }

    async update(request, response) {
        const {name, email, password, oldPassword} = request.body
        const user_id = request.user.id

        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

        if(!user) {
            throw new AppError("Usuário não encontrado")
        }

        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este email já está em uso.")
        }

        user.name = name ?? user.name
        user.email = email ?? user.name

        if(password && !oldPassword) {
            throw new AppError("Insira a senha antiga")
        }

        if(password && oldPassword) {

            // comparando a senha atual e a antiga
            const checkOldPassword = await compare(oldPassword, user.password)

            if(!checkOldPassword) {
                throw new AppError("A senha está incorreta.")
            }

            user.password = await hash(password, 8)
        }

        await database.run(`
            UPDATE users SET 
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME("now")
            WHERE id = ?`,
            [user.name,
            user.email,
            user.password,
            user_id]
        )

        return response.status(200).json()
    }
}

module.exports = UsersController