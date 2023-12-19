const ContactModel = require('../Models/contactSchema');

const contactUs = async (req,res) => {
    const newData = new ContactModel(req.body);

    try{
        const data = await newData.save();
        res.status(200).json({success:true,data});
    } catch(error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {contactUs};