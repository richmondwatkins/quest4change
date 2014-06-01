'use strict';

//var locations = global.nss.db.collection('locations');

class Location{
  constructor(name, address, gis, description, category){
    this.name = name;
    this.address = address;
    this.gis = gis;
    this.description = description;
    this.category = category;
}}

module.exports = Location; //exporting Class out
