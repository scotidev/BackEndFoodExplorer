const AppError = require("../utils/AppError");
const knex = require("../database/knex");

const { hash, compare } = require("bcryptjs");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso");
    }

    if (password.length < 6) {
      throw new AppError("A senha precisa conter pelo menos 6 caracteres");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, oldPassword } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    if (email) {
      const userWithUpdatedEmail = await knex("users").where({ email }).first();

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError("Este email já está em uso.");
      }
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !oldPassword) {
      throw new AppError("Insira a senha antiga");
    }

    if (password && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha está incorreta.");
      }

      user.password = await hash(password, 8);
    } else if (!password && oldPassword) {
      throw new AppError("Você forneceu a senha antiga, mas não a nova senha.");
    }

    await knex("users").where({ id: user_id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now(),
    });

    return response.status(200).json("Usuário atualizado com sucesso!");
  }
}

module.exports = UsersController;
