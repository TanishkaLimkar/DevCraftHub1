const express = require("express");
const {getAllUsers,getAllContacts,updateUserById,deleteUserById,deleteContactById,getUserById} = require("../controllers/admin-controller");
const authmiddleware = require("../middlewares/authMiddleware")
const router = express.Router();

router.route('/users').get(authmiddleware ,getAllUsers);//go to admin-controller
router.route('/contacts').get(authmiddleware ,getAllContacts);//go to admin-controller
router.route('/users/delete/:id').delete(authmiddleware ,deleteUserById);
// router.route('/users/delete/:id').delete(authmiddleware,adminmiddleware,deleteUserById);
router.route('/contacts/delete/:id').delete(authmiddleware,deleteContactById);
router.route('/users/:id').get(authmiddleware ,getUserById);//go to admin-controller
router.route('/users/update/:id').patch(authmiddleware,updateUserById);
module.exports = router;