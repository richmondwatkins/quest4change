/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Quest = traceur.require(__dirname + '/../models/quest.js');
var Location = traceur.require(__dirname + '/../models/location.js');
var multiparty = require('multiparty');
var fs = require('fs');

exports.login = (req, res)=>{
  User.findByUserName(req.body.userName, user=>{
    if(user){
      user.login(req.body, u=>{
        if(u){
          req.session.userId = u._id;
          res.redirect('/user/homemap');
        }else{
          req.session.userId = null; //message - incorrect password
          res.redirect('/');
        }
      });
    }else{
      res.redirect('/'); //message - no account. please register
    }
  });
};



exports.register = (req, res)=>{
  var form = new multiparty.Form();

  form.parse(req, (err, fields, files)=>{
    var userName = fields.userName[0].split(' ').map(w=>w.trim()).map(w=>w.toLowerCase()).join('');

    var user = new User(fields, files, userName);
    var filePath = files.image[0].path;
    var fileName = files.image[0].originalFilename;
    user.register(u=>{
      if(u){
        fs.mkdirSync(`${__dirname}/../static/img/${u._id}`);
        fs.renameSync(filePath, `${__dirname}/../static/img/${u._id}/${fileName}`);//need to normalize filepath
        req.session.userId = u._id;
        res.redirect('/');
      }else{
        req.session.userId = null; //message - account already exists
        res.redirect('/');
      }
    });
  });
};



exports.homemap = (req, res)=>{
  User.findByUserId(req.session.userId, user=>{
    Location.findAll(loc=>{
      res.render('users/map', {user:user, locations:loc, title:'Home Map'});
    });
  });
};

exports.locations = (req, res)=>{
  User.findByUserId(req.session.userId, user=>{
    Location.findAll(locations=>{
      Quest.findAllQuests(quests=>{
        var activeQuests = [];
        user.activeQuests.map((activeQuest)=>{
          for(var i = 0; i < quests.length; i++){
            if(quests[i]._id.toString() === activeQuest.toString()){
              activeQuests.push(quests[i]);
            }
          }
        });
        var activeLocIds = [];
        activeQuests.map(quest=>{
          for(var i = 0; i < quest.checkIns.length; i++){
            activeLocIds.push(quest.checkIns[i]);
          }
        });

        activeLocIds.forEach(id=>{
          for(var i = 0; i < locations.length; i++){
            if(locations[i]._id.toString() === id.toString()){
              locations[i].iconType = 'dot';
              // activeLocations.push(locations[i]);
            }else{
              locations[i].iconType = 'open';
            }
          }
        });

        user.checkIns.forEach(id=>{
          for(var i = 0; i < locations.length; i++){
            if(locations[i]._id.toString() === id.toString()){
              locations[i].iconType = 'filled';
            }
          }
        });

        res.send(locations);
      });


    });
  });
};
