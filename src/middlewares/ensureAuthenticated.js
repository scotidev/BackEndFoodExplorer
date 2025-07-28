const authJWTConfig = require("../configs/auth");
const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function ensureAuthenticated(request, response, next) {
  const token = request.cookies.token;

  if (!token) {
    throw new AppError("Token de autenticação não encontrado.", 401);
  }

  try {
    const { role, sub: user_id } = verify(token, authJWTConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
      role,
    };

    return next();
  } catch (error) {
    throw new AppError("Token inválido.", 401);
  }
}

module.exports = ensureAuthenticated;
