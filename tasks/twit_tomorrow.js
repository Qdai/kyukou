'use strict';

const Bluebird = require('bluebird');
const config = require('config');
const Twit = require('twit');

const get = require('../lib/getasstring');
const dbConnection = require('../db');

const twit = new Twit(config.get('twitter'));

// tweet tomorrow event
module.exports = function () {
  return Bluebird.using(dbConnection(), function (db) {
    const today = new Date();
    return db.model('Event').find({
      'tweet.tomorrow': false,
      eventDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0)
    }, null, {
      sort: {
        eventDate: 1,
        period: 1
      }
    }).exec().then(function (events) {
      if (events.length === 0) {
        return events;
      }
      return Promise.all(events.map(function (event) {
        return new Promise(function (resolve, reject) {
          const text = get(event).asTomorrowTweet();
          twit.post('statuses/update', { status: text }, function (err, data, res) {
            if (!err && res.statusCode === 200) {
              resolve(event);
            } else {
              reject(err || new Error('status code: ' + res.statusCode));
            }
          });
        });
      }));
    }).then(function (events) {
      if (events.length === 0) {
        return [];
      }
      return Promise.all(events.map(function (event) {
        return event.update({
          'tweet.tomorrow': true
        }).exec();
      }));
    });
  }).then(function (affecteds) {
    return 'msg: ' + affecteds.length + ' event(s) posted';
  });
};
