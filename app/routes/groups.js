/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var Group = traceur.require(__dirname + '/../models/group.js');


exports.create = (req, res)=>{
  var group = new Group(req.session.userId, req.body.name);
  group.save(()=>{
    res.redirect('/');//needs to redirect to user profile page
  });
};
