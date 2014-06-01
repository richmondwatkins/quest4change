'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var locations = traceur.require(__dirname + '/../routes/locations.js');
  var groups = traceur.require(__dirname + '/../routes/groups.js');

  app.all('*', users.lookup);

  app.get('/', dbg, home.index);

  app.get('/dash', dbg, users.dashboard);
  app.get('/badges', dbg, users.showBadges);


  app.get('/help', dbg, home.help);
  app.post('/addArt', dbg, locations.addArt);
  app.post('/addHistory', dbg, locations.addHistory);
  app.post('/addPark', dbg, locations.addPark);
  app.get('/locations', dbg, locations.getAllLocations);

  app.post('/register', dbg, users.register);
  app.post('/login', dbg, users.login);
  app.get('/user/homemap', dbg, users.homemap);
  app.get('/user/locations', dbg, users.locations);

  app.get('/groups', dbg, groups.index);
  app.get('/groups/new', dbg, groups.new);
  app.post('/groups/create', dbg, groups.create);
  app.get('/groups/:groupname/:groupId', dbg, groups.show);

  app.post('/groups/:groupId/join', dbg, groups.join);

  console.log('Routes Loaded');
  fn();
}
