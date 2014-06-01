/* jshint unused:false */

'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Location = traceur.require(__dirname + '/../models/location.js');
var multiparty = require('multiparty');
var fs = require('fs');

exports.login = (req, res)=>{
  User.findByUserName(req.body.userName, user=>{
    if(user){
      user.login(req.body, u=>{
        if(u){
          req.session.userId = u._id;
          res.redirect('/dash');
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
        console.log(req.session);
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
    Location.findAll(loc=>{
      for (var i = 0; i < loc.length; i++) {
        var oneloc = loc[i];
        switch(i%3) {
        case 0:
          oneloc.iconType = 'dot';
          break;
        case 1:
          oneloc.iconType = 'filled';
          break;
        default:
          oneloc.iconType = 'open';
          break;
        }
      }
      res.send(loc);
    });
  });
};

<<<<<<< HEAD
exports.checkin = (req, res)=>{
  User.findByUserId(req.session.userId, user=>{
    user.checkIntoLocation(req.query.locationid);
    // TODO, not redirect to the map since it takes forever to reload
    res.redirect('/user/homemap');
  });
}
=======

exports.lookup = (req, res, next)=>{
  User.findByUserId(req.session.userId, u=>{
    res.locals.user = u;
    next();
  });
};


exports.searchResults= (req, res)=>{
  res.render('searchResults/searchResults', {title: 'search results'});
};
>>>>>>> 6ae4d9a42ede575b664763a5dc4b8606a35b26c7

exports.dashboard = (req, res)=>{
  res.render('users/dashboard', {title: 'FAKE DASHBOARD'});
};

exports.showBadges = (req, res)=>{
  res.render('badges/index', {title: 'BADGES'});
};
