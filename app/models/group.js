'use strict';

var groups = global.nss.db.collection('groups');
var Mongo = require('mongodb');
var _ = require('lodash');


class Group{
  constructor(ownerId, groupName, fn){
    this.name = groupName;
    this.groupCode = groupCode();
    this.owner = ownerId;
    this.members = [];
    this.isLocked = false;
    this.quests = [];
  }

  joinGroup(user){
    this.members.push(user);

    groups.save(this, ()=>{});
  }



    save(fn){
    groups.save(this, ()=>fn());
  }




  static isOwner(userId, fn){
    groups.find({owner: userId}).toArray((err, owner)=>{
      fn(owner);
    });
  }

  static findAll(fn){
    groups.find().toArray((err, groups)=>{
      fn(groups);
  });
}

static findAllByGroupId(groupId, fn){
  console.log(groupId);
  var id = Mongo.ObjectID(groupId);
  groups.find({_id:id}, (err, group)=>{
    group = _.create(Group.prototype, group);
    fn(group);
  });
}

static findByGroupId(groupId, fn){
  var id = Mongo.ObjectID(groupId);
  groups.findOne({_id:id}, (err, group)=>{
    group = _.create(Group.prototype, group);
    fn(group);
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
