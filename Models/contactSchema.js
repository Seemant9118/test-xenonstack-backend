const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        user_name:{
            type:String,
            required:[true,"User name is required"]
        },
        user_email:{
            type:String,
            required:[true,"User email is required"]
        },
        user_number:{
            type:String,
            required:[true,"User number is required"]
        },
        user_queries:{
            type:String,
            required:[true,"User Query is required"]
        }
    },
    {timestamps:true}
);

const ContactModel = mongoose.model("contacts", contactSchema);
module.exports = ContactModel;