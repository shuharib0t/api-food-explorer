const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

class SessionsCreateService {
  constructor(sessionsRepository) {
    this.sessionsRepository = sessionsRepository;
  }

  async execute({ email, password }) {
    const user = await this.sessionsRepository.getUserByEmail(email);

    if (!user) {
      throw new AppError("E-mail e/ou senha incorretos.", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("E-mail e/ou senha incorretos.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        isAdmin: user.isAdmin,
      },
      secret,
      {
        subject: String(user.id),
        expiresIn,
      }
    );

    return { user: { name: user.name }, token };
  }
}

module.exports = SessionsCreateService;
