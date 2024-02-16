const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    fname : {
       type : String,
       required: true
    },

    lname : {

        type : String,
        required: true

    },

    email : {
        type : String,
        match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        required : true
    },

    password: {

        type : String
    }

});

const User = new mongoose.model("User",userSchema);

module.exports = User;