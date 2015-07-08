### Vero Node.js Client
This is a thin wrapper for [Vero](http://www.getvero.com/)'s public [api](http://www.getvero.com/api/http/). It uses [superagent](https://www.npmjs.com/package/superagent) to make requests.

### Why
I was testing Vero at [bookalokal.com](http;//bookalokal.com) to see if it would be useful for our marketing department. While doing my tests I wrote this simple wrapper and I thought it might be useful for someone out there.

Let me know if you have any questions

### License
ISC License

### Installing
`npm install vero`

### Sample Usage

``` javascrpt

var vero = require('vero')('YOUR_AUTH_TOKEN');

console.log('Running...');

vero.heartbeat(function(error, response){
  if (response.ok) {
    console.log('Heartbeat::Success>', response.body.message);
  } else {
    console.log('Heartbeat::Fail>', response.text);
  }
});

vero.users.track('test@test.com', 'test@test.com', function(error, response){
  if (response.ok) {
    console.log('users.track::Success>', response.body.message);
  } else {
    console.log('users.track::Fail>', response.text);
  }
});

vero.users.edit('test@test.com', {lastUpdate: Date.now()}, function(error, response){
  if (response.ok) {
    console.log('users.edit::Success>', response.body.message);
  } else {
    console.log('users.edit::Fail>', response.text);
  }
});

vero.users.reidentify('test@test.com', 'test@test.com', function(error, response){
  if (response.ok) {
    console.log('users.reidentify::Success>', response.body.message);
  } else {
    console.log('users.reidentify::Fail>', response.text);
  }
});

vero.users.tags('test@test.com', "new tag", ["old tag"], function(error, response){
  if (response.ok) {
    console.log('users.tags::Success>', response.body.message);
  } else {
    console.log('users.tags::Fail>', response.text);
  }
});

vero.users.unsubscribe('test@test.com', function(error, response){
  if (response.ok) {
    console.log('users.unsubscribe::Success>', response.body.message);
  } else {
    console.log('users.unsubscribe::Fail>', response.text);
  }
});

vero.users.resubscribe('test@test.com', function(error, response){
  if (response.ok) {
    console.log('users.resubscribe::Success>', response.body.message);
  } else {
    console.log('users.resubscribe::Fail>', response.text);
  }
});


vero.events.track('test@test.com', null, "Test_Event", function(error, response){
  if (response.ok) {
    console.log('events.track::Success>', response.body.message);
  } else {
    console.log('events.track::Fail>', response.text);
  }
});

```
