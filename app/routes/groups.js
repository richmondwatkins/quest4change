/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var Group = traceur.require(__dirname + '/../models/group.js');
var User = traceur.require(__dirname + '/../models/user.js');


exports.index = (req, res)=>{
  console.log(req.session.userId);
  User.findByUserId(req.session.userId, user=>{
    console.log(user);
  });

  res.render('groups/index', {title: 'All Groups' });
};



exports.create = (req, res)=>{
  var group = new Group(req.session.userId, req.body.name);
  group.save(()=>{
    res.redirect('/');//needs to redirect to user profile page
  });
};
