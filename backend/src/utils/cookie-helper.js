const {signToken}  = require("./jwt-helper");

const setCookie = (token, res)=> {
      res.cookie('id', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7
      });
}

const  clearCookie = (res)=> {   
    res.clearCookie('id');
}

module.exports = {setCookie, clearCookie}; 