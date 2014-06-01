/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var Group = traceur.require(__dirname + '/../models/group.js');
var User = traceur.require(__dirname + '/../models/user.js');
// var groups = global.nss.db.collection('groups');


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

exports.show = (req, res)=>{
  console.log('THIS IS THE USER');
  console.log(res.locals.user);
  var user = res.locals.user;
  Group.findByGroupId(req.params.groupId, group=>{
    console.log('THIS IS THE GROPU');
    console.log(group);
    res.render('groups/show', {group: group, user: user});
  });

};

//XXXXXXXXX SAVING USER TO GROUP WORKS XXXXXXXXXXXXXX
exports.join = (req, res)=>{
  var userId = res.locals.user._id;
  Group.findByGroupId(req.params.groupId, group=>{
    res.locals.user.addGroup(group._id);
    group.joinGroup(userId);

    // group.save(()=>{
      res.redirect('/groups');//needs to redirect to user profile page
      // });
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
