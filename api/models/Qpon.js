/**
 * Qpon.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  },
    username:{
        type: 'string',
        unique: false
    },
    titleid:{
        type: 'string',
        unique: false
    },
    title: {
        type: 'string',
        unique: false
    },
    restaurant: {
        type: 'string',
        unique: false
    },
    district: {
        type: 'string',
        unique: false
    },
    mall: {
        type: 'string',
        unique: false
    },
    image: {
        type: 'string',
        unique: false
    },
    coin: {
        type: 'string',
        unique: false
    },
    date: {
        type: 'string',
        unique: false
    },
    detail: {
        type: 'string',
        unique: false
    }
};

