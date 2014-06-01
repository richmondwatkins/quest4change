'use strict';

var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var _ = require('lodash');
var bcrypt = require('bcrypt');

class User{
  constructor(fields, files, userName){
    this.email = fields.email[0];
    this.password = fields.password[0];
    this.userName = userName;
    this.achievements = [];
    this.level = 'Explorer';
    this.groups = [];
    this.image = files.image[0].originalFilename;//add entire normalized file path
    this.checkIns = [];
    this.walkScore = 0;
    this.bikeScore = 0;
    this.otherScore = 0;
    this.createdQuests = [];
    this.activeQuests = [];
    this.completedQuests = [];
}

  register(fn){
    users.findOne({email:this.email}, (err, u)=>{
      users.findOne({userName:this.userName}, (err, u2)=>{
        if(u || u2){//if user email or username exists,
          fn(null);
        }else{
          this.password = bcrypt.hashSync(this.password, 8); //hashed/encrypted version of password
          users.save(this, (err, u)=>{
            fn(u);
          });
        }
      });
    });
  }

  login(user, fn){
    var isMatch = bcrypt.compareSync(user.password, this.password); //(entered password, db password)
    if(isMatch){
      fn(this);
    }else{
      fn(null);
    }
  }

  static findByUserName(userName, fn){
    users.findOne({userName:userName}, (err, user)=>{
      user = _.create(User.prototype, user);
      fn(user);
    });
  }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (err, user)=>{
      user = _.create(User.prototype, user);
      fn(user);
    });
  }

  checkIntoLocation(locationId, fn) {
    this.checkIns.push(locationId);
    // TODO, update other properties of user as a result of the checkin
    users.save(this, function(err, u) {
      if (fn) {
        fn(null);
      }
    });
  }
}

module.exports = User; //exporting Class out
