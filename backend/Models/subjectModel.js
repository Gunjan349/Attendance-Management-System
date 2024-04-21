const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subject: [{
        type: String,
    }],
    course : {
        type : String
    },
    teacher : {
        type : String
    }
});

module.exports = mongoose.model('Subject' , subjectSchema);