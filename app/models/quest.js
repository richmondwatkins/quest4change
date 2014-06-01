'use strict';

var quests = global.nss.db.collection('quests');
// var async = require('async');



class Quest{
//   constructor(){
//     this.users = [];
//     this.name = string;
//     this.creator = objectId;
//     this.checkIns = [objectId];
//     this.score = Number;
//     this.mode = string;
//   }

  static findById(questId, fn){
    quests.findOne({_id:questId}, (err, quest)=>{
      fn(quest);
    });
  }

  static findAllQuests(fn){
    quests.find({}).toArray((err, quests)=>{
      fn(quests);
    });
  }
}


module.exports = Quest; //exporting Class out
