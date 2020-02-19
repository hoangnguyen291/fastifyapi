// External Dependancies
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const carSchema = new mongoose.Schema({
  title: String,
  brand: String,
  price: String,
  age: Number,
  owner_id: ObjectId,
  services: {
    type: Map,
    of: String
  }
})

module.exports = mongoose.model('Car', carSchema)