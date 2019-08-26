const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const { executeInTransaction } = require('../data/_index');
const User = require('../data/User');
const { signToken } = require('../utils/jwt-helper');

class UserBl {
  constructor(trx) {
    this.trx = trx;
  }

  async _generateAuthToken(user) {
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);

    let tokens;
    if (user.tokens === undefined) {
      tokens = token;
    } else {
      tokens = user.tokens + ',' + token;
    }

    await User.query(this.trx)
      .update({ tokens })
      .where({ id: user.id });

    return token;
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

  async signUp({ email, password, firstName, lastName, phone }) {
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
      return { token, user: inserted };
    });
  }

  async signIn({ email, password }) {
    return executeInTransaction(this, async () => {
      const user = await this.findByEmail(email);
      if (user === null) {
        throw new Error('login failed.');
      }

      if (password !== user.password) {
        throw new Error('Invalid login credential.');
      }

      // const token = await signToken(inserted.id);

      // res.cookie('id', token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   maxAge: 1000 * 60 * 60 * 24 * 7
      // });

      return { user };
    });
  }

  async socialSignIn(email) {
    return executeInTransaction(this, async () => {
      const user = await this.findByEmail(email);
      if (user === null) {
        throw new Error(errors.UNAUTHORIZED);
      }
      const token = await this._generateAuthToken(user);

      this._removeSensitive(user);

      return { token, user };
    });
  }

  async signOut(user, token) {
    const found = await User.query(this.trx).findOne({ id: user.id });
    const temp = found.tokens.split(',');

    const tokens = _.filter(temp, item => item !== token).join(',');

    await User.query(this.trx)
      .update({ tokens })
      .where({ id: user.id });
  }

  async findByIdAndToken(id, token) {
    const found = await User.query(this.trx).findOne({ id });
    if (found === undefined) {
      return null;
    }

    const tokens = found.tokens.split(',');
    if (tokens.includes(token) === false) {
      throw new Error();
    }

    await this._removeSensitive(found);
    return found;
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
