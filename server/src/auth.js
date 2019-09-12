import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const expiresIn = 60 * 60; // 60 min (3600)

const auth = {
  accessToken(id) {
    return jwt.sign({ id }, SECRET_KEY, { expiresIn });
  },

  ensureAuth() {
    return (req, res, next) => {
      const { authorization } = req.headers;
      if (!authorization) {
        res.status(401);
        throw Error('No Authorization headers');
      }

      try {
        req.user = this.verify(authorization);
      } catch (err) {
        res.status(401);
        throw err;
      }

      next();
    };
  },

  verify(token) {
    return jwt.verify(token.replace(/^Bearer\s/, ''), SECRET_KEY);
  }
};

export default auth;
