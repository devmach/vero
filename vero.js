/**
 *  vero - v0.0.1
 *
 *  Aydin "/dev/mach" Ulfer.
 *  8th July 2015
 *
 *  This is a thin wrapper for Vero's public api.
 *
 */

var superagent = require('superagent');

var vero = function(authToken) {
  var ret = {
    users: {},
    events: {}
  };
  var apiUrl = 'https://api.getvero.com/api/v2';
  var authToken = authToken || false;

  var req = function(type, endPoint, payload, cb) {
    var url = apiUrl + endPoint;

    if (!authToken) {
      return cb('Auth token must be defined to use make a request to ' + url);
    };

    payload.auth_token = authToken;

    return  superagent[type](url).
      send(payload).
      set('Accept', 'application/json').
      end(cb);
  };

  ret.heartbeat = function(cb) {
    if (!cb) {
      throw "Please provide callback function to use `heartbeat` method";
    };

    superagent.
      get(apiUrl + '/heartbeat').
      set('Accept', 'application/json').
      end(cb);
  };

  ret.users.track = function(userId, email, data, cb) {
    if (!cb && typeof data === 'function') {
      cb = data;
      data = {};
    }

    if (!cb) {
      throw "Please provide callback function to use `users.track` method";
    }

    return req(
      'post',
      '/users/track',
      {
        id: userId,
        email: email,
        data: data
      },
      cb);
  };

  ret.users.edit = function(userId, changes, cb) {
    if (!cb && typeof changes === 'function') {
      cb = changes;
      changes = {};
    }

    if (!cb) {
      throw "Please provide callback function to use `users.edit` method";
    }

    return req(
      'put',
      '/users/edit',
      {
        id: userId,
        changes: changes
      },
      cb);
  };

  ret.users.reidentify = function(userId, newId, cb) {
    if (!cb) {
      throw "Please provide callback function to use `users.reidentify` method";
    }

    if (!newId) {
      return cb("`users.reidentify` method requires you to enter both old user id and new user id");
    }

    return req(
      'put',
      '/users/reidentify',
      {
        id: userId,
        new_id: newId
      },
      cb);
  };

  ret.users.tags = function(userId, add, remove, cb) {
    if (!cb) {
      throw "Please provide callback function to use `users.tags` method";
    }

    if (add && typeof add === 'string') {
      add = [add];
    };

    if (remove && typeof remove === 'string') {
      remove = [remove];
    };

    return req(
      'put',
      '/users/tags/edit',
      {
        id: userId,
        add: add,
        remove: remove
      },
      cb);
  };

  ret.users.unsubscribe = function(userId, cb) {
    if (!cb) {
      throw "Please provide callback function to use `users.unsubscribe` method";
    }

    return req(
      'post',
      '/users/unsubscribe',
      {
        id: userId,
      },
      cb);
  };

  ret.users.resubscribe = function(userId, cb) {
    if (!cb) {
      throw "Please provide callback function to use `users.resubscribe` method";
    }

    return req(
      'post',
      '/users/resubscribe',
      {
        id: userId,
      },
      cb);
  };

  ret.events.track = function(userId, email, eventName, data, cb) {
      if (!cb && typeof data === 'function') {
        cb = data;
        data = {};
      }

      if (!cb) {
        throw "Please provide callback function to use `events.track` method";
      }

      return req(
        'post',
        '/events/track',
        {
          identity: {id: userId, email: email},
          event_name: eventName,
          data: data
        },
        cb);
    };

  return ret;
};

module.exports = exports = vero;