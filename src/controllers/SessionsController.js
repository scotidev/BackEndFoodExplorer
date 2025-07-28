const knex = require("../database/knex");
const AppError = require("../utils/AppError");

const { compare } = require("bcryptjs");

const authJWTConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail ou senha incorreto.", 401);
    }

    const matchedPassword = await compare(password, user.password);

    if (!matchedPassword) {
      throw new AppError("E-mail ou senha incorreto", 401);
    }

    const { secret, expiresIn } = authJWTConfig.jwt;
    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    });

    // Define o token como um cookie HTTP-only
    response.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 1000 * 60 * 60 * 24, // cookie dura 24 horas
    });

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return response.json({ user: userWithoutPassword });
  }
}

module.exports = SessionsController;
