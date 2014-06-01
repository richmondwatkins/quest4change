'use strict';

var groups = global.nss.db.collection('groups');
// var _ = require('lodash');


class Group{
  constructor(ownerId, groupName, fn){
    this.name = groupName;
    this.groupCode = groupCode();
    this.owner = ownerId;
    this.members = [];
    this.isLocked = false;
    this.quests = [];
  }

  static isOwner(userId, fn){
    groups.find({owner: userId}).toArray((err, owner)=>{
      fn(owner);
    });
  }

    save(fn){
    groups.save(this, ()=>fn());
  }

  static findAll(fn){
    groups.find().toArray((err, groups)=>{
      fn(groups);
  });
}

}
function groupCode(){
  var text='';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for( var i=0; i < 5; i++ ){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  return text;

}


//
//
module.exports = Group; //exporting Class out
