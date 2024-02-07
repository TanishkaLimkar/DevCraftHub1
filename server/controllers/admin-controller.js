const User = require("../models/user-model");
const Contact = require("../models/contact-model")
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({},{password:0});
        //console.log(users);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found!!" });
        }
        return res.status(200).json(users);

    } catch (error) {
        next(error); // Include the next parameter here
    }
};
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({},{password:0});
        //console.log(contacts);
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No Users Found!!" });
        }
        return res.status(200).json(contacts);

    } catch (error) {
        next(error); // Include the next parameter here
    }
};
const getUserById = async(req,res)=>{
    try {
        const id  = req.params.id;
        const data = await User.findOne({_id:id}, {password:0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}
const deleteUserById= async( req,res)=> {
    try {
        const id  = req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"User deleted succefully!"});
    } catch (error) {
        next(error);
    }
}
const deleteContactById= async( req,res)=> {
    try {
        const id  = req.params.id;
        await Contact.deleteOne({_id:id});
        return res.status(200).json({message:"Contact deleted succefully!"});
    } catch (error) {
        next(error);
    }
}
const updateUserById = async(req,res) =>{
    try {
        const id  = req.params.id;
        const updatedUserData = req.body;

        const updatedData= await User.updateOne({_id:id},{$set:updatedUserData});
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error)
    }
}
module.exports = {getAllUsers,getAllContacts, deleteUserById, deleteContactById,getUserById,updateUserById};
/*email
: 
"manva@gmail.com"
isAdmin
: 
false
phone
: 
"9122636753"
username
: 
"Manva"
__v
: 
0
_id
: 
"65942420a6abfd9b9f448e32 */