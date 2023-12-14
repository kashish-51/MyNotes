const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    name:{
         type: String,
         required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
   },
    password:{
    type: String,
    required: true
},
date:{
    type: Date,
    default: Date.now           //gives the current date always
}
});
const User = mongoose.model('user', UserSchema);   //in bracket first write modelname then schema
module.exports = User
