'use strict';
//
var publicArts = global.nss.db.collection('publicArts');



exports.import = (req, res)=>{
  console.log(req.body);

  publicArts.save(req.body, ()=>());




  // save(fn){
  //   teachers.save(this, ()=>fn());
  // }

};
