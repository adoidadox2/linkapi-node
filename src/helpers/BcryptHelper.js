const bcrypt = require('bcrypt');

class BcryptHelper {
  hash(password) {
    return bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT));
  }

  validate(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

export default new BcryptHelper();
