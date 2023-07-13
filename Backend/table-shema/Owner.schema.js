const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

//create table 

const OwnerSchema = new mongoose.Schema({
    id : {type : String},
    username : {type : String},
    owner : {type : String},
    ownerNumber : {type : String},
    buzSocials : {type : String},
    location : {type : String},
    website : {type : String},
    city : {type : String},
    niche : {type : String},
    isVisible : {type : Boolean , default : true},
    createAt : {type : Date}
})

//For Constrainte


const population = []

//send table

const Owner = mongoose.model('Owner',OwnerSchema,'Owner')

module.exports = Owner