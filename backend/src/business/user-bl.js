const bcrypt = require('bcrypt');
const _ = require('lodash');

const { executeInTransaction } = require('../data/_index');
const User = require('../data/User');
const { setCookie, clearCookie } = require('../utils/cookie-helper');
const { signToken } = require('../utils/jwt-helper');

class UserBl {
  constructor(trx) {
    this.trx = trx;
  }

  async signUp({ email, password, firstName, lastName, phone, locale }, res) {
    return executeInTransaction(this, async () => {
      const user = await this.findByEmail(email);
      if (user !== null) {
        throw new Error('sign up failed - email already exists!');
      }

      const inserted = await User.query(this.trx).insert({
        firstName,
        lastName,
        email,
        password,
        phone,
        locale
      });

      const token = await signToken(inserted.id);

      setCookie(token, res);

      return { user: inserted };
    });
  }

  async signIn({ email, password }, res) {
    return executeInTransaction(this, async () => {
      const user = await this.findByEmail(email);
      if (user === null) {
        throw new Error('Login failed.');
      }

      if (password !== user.password) {
        throw new Error('Invalid login credential.');
      }

      const token = await signToken(user.id);

      setCookie(token, res);
      return { user };
    });
  }

  async signOut(userId, res) {
    clearCookie(res);
    const user = await new UserBl().findById(userId);

    return { user };
  }

  async _findByCredentials({ email, password }) {
    const found = await User.query(this.trx).findOne({ email });
    if (found) {
      const isMatch = await bcrypt.compare(password, found.password);
      if (isMatch === true) {
        return found;
      }
    }
    return null;
  }

  async findById(id) {
    return await User.query(this.trx).findOne({ id });
  }

  async findByEmail(email) {
    const found = await User.query(this.trx).findOne({ email });
    if (found === undefined) {
      return null;
    }
    return found;
  }
}

module.exports = UserBl;
