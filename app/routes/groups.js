/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var Group = traceur.require(__dirname + '/../models/group.js');
var User = traceur.require(__dirname + '/../models/user.js');


exports.index = (req, res)=>{
  Group.findAll(groups=>{
    User.findByUserId(req.session.userId, user=>{
      Group.isOwner(req.session.userId, usersGroups=>{
        console.log(usersGroups);

      res.render('groups/index', {user: user, groups: groups, usersGroups: usersGroups });
      });
    });
  });
};




exports.create = (req, res)=>{
  console.log(req.body);
    var group = new Group(req.session.userId, req.body.name);
    group.save(()=>{
      res.redirect('/groups');//needs to redirect to user profile page
    });
};

exports.new = (req, res)=>{
  res.render('groups/new');
};
