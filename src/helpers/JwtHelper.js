import jwt from 'jsonwebtoken';

class JwtHelper {
  sign(data) {
    return jwt.sign(data, process.env.JWT_SECRET);
  }

  verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

export default new JwtHelper();
