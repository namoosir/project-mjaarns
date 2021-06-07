const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    typeUser: {
        type: Schema.Types.ObjectId,
        required: true
    }

})

module.exports = mongoose.model("User", UserSchema);