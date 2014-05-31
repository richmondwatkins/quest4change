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

  app.get('/', dbg, home.index);
  app.get('/help', dbg, home.help);
  // routes to pull data from socrata portal and add location objects to DB
  app.post('/addArt', dbg, locations.addArt);
  app.post('/addHistory', dbg, locations.addHistory);
  app.post('/addPark', dbg, locations.addPark);

  app.post('/register', dbg, users.register);
  console.log('Routes Loaded');
  fn();
}
