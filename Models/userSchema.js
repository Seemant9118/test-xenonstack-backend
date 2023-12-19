const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        user_name:{
            type:String,
            required:[true,"User name is required"]
        },
        user_email:{
            type:String,
            required:[true,"User email is required"]
        },
        user_password:{
            type:String,
            required:[true,"User pass is required"]
        },
    },
    {timestamps:true}
);

const UserModel = mongoose.model("Users", userSchema);
module.exports = UserModel;