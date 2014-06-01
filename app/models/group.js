'use strict';

// var quests = global.nss.db.collection('quests');
//
//
class Group{
  constructor(ownerId, groupName, fn){
    this.name = groupName;
    this.owner = ownerId;
    this.members = [];
    this.isLocked = false;
    this.quests = [];
  }
}
//
//
module.exports = Group; //exporting Class out
