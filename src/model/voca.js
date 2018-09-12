const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vocaSchema = new Schema({
    voca: {
        type: String,
        default: "",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Voca', vocaSchema);