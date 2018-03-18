/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      toJSON: function () {
          var obj = this.toObject();
          delete obj.password;
          return obj;
      }
  },
    username: {
        type: 'string',
        unique: true
    }
};

