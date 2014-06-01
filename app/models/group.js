'use strict';

var groups = global.nss.db.collection('groups');
var _ = require('lodash');
//
class Group{
  constructor(ownerId, groupName, fn){
    this.name = groupName;
    this.groupNumber = groupNumber();
    this.owner = ownerId;
    this.members = [];
    this.isLocked = false;
    this.quests = [];
  }

}

function groupNumber(){
  var num = _.random(0,5);
  groups.findOne({groupNumber:num}, (err, number)=>{
    if(number){
      groupNumber();
    }else{
      return num;
    }
  });
}
//
//
module.exports = Group; //exporting Class out
