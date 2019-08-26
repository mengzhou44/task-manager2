 
const bcrypt = require('bcrypt');
const _ = require('lodash');

const { executeInTransaction } = require('../data/_index');
const User = require('../data/User');
const { setCookie, clearCookie } = require('../utils/cookie-helper');

class UserBl {
  constructor(trx) {
    this.trx = trx;
  }
 
  async signUp({ email, password, firstName, lastName, phone }, res ) {
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
        phone
      });

      const token = await signToken(inserted.id);

      setCookie(token, res);
      
      return inserted;
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


  async signOut(res) {
      clearCookie(res);
      return true; 
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
