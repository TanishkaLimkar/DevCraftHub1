const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const { home ,register, login} = authControllers; // Destructuring the authControllers object


const validate = require('../middlewares/validate-middleware');
const { signupSchema, loginSchema } = require("../validators/auth-validator"); // Destructuring the auth-validator object
const authMiddleware = require("../middlewares/authMiddleware");


//express instance is created named router will be used ro make get post etc requests

// router.get("/",(req,res) => {
//     res.status(200).send("WELCOME TO MERN PROJECT ROUTER")
// });

//another way to define the same route can use chaining in this
// router.route("/").get((req,res)=>{
//     res
//     .status(200)
//     .send("welcome to HOME page")
// })

//now use controller to futher simplify this by just copying the response path to the auth-controller.js
router.route("/").get(authControllers.home); // Using authControllers.home for the home route

router.route("/register").post(validate(signupSchema), register); // Using authControllers.register for the register route
router.route("/login").post(validate(loginSchema), login); // Using authControllers.login for the login route
router.route("/user").get(authMiddleware ,authControllers.user); 
module.exports =router; 