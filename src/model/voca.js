const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const option = {
    capped: {
        size: 31457280, //30MB
        max: 100
    }
}

const vocaSchema = new Schema({
    category: {
        type: String,
        enum: ['ETC', 'TOEIC', 'TEPS', 'JPLT'],
        default: "ETC"
    },
    voca: {
        type: String,
        default: "",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
}, option);

module.exports = mongoose.model('Voca', vocaSchema);