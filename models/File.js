const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    created_at: {type: Date, default: Date.now},
    text: {type: String, required: true},
    link: {type: String, required: true},
})

module.exports = model('File', schema)