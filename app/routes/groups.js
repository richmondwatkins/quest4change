/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var Group = traceur.require(__dirname + '/../models/group.js');
var User = traceur.require(__dirname + '/../models/user.js');
var groups = global.nss.db.collection('groups');


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


exports.join = (req, res)=>{
  Group.findByGroupId(req.params.groupId, group=>{
    console.log(group);
    group.joinGroup(res.locals.user);
    group.save(()=>{
      res.redirect('/groups');//needs to redirect to user profile page
    });
  });
};



// exports.show = (req, res)=>{
//   Project.findById(req.params.id, project=>{
//     res.render('projects/show', {project:project, title: 'Portfolio: Show'});
//   });
// };
//
//



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
