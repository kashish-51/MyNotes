const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user: {                        //like foreign key
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now           //gives the current date always
    }
})

module.exports = mongoose.model('notes', NotesSchema);  //in bracket first write modelname the schema
