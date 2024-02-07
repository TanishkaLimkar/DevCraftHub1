 /*? In an Express.js application, a "controller" refers to a part of your code
that is responsible for handling the application's logic. Controllers are
typically used to process incoming requests, interact with models (data sources),
and send responses back to clients. They help organize your application by
separating concerns and following the MVC (Model-View-Controller) design pattern.*/
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const home = async (req,res) =>{
    try{
        res.status(200).send("WELCOME TO MERN PROJECT")
    }catch(error)
    {
        console.log(error)
    }
};
/*-------------------------------
REGISTRATION LOGIC
----------------------------------*/

/*// 1. Get Registration Data: 
Retrieve user data (username, email, password).
// 2.
Check Email Existence:
Check if the email is already registered.
/I 3.
Hash Password:
Securely hash the password.
// 4.
Create User:
Create a new user with hashed password.
// 5.
Save to DB:
Save user data to the database.
// 6.
Respond:
Respond with "Registration Successful" or handle errors. */
const register = async (req,res) =>{
    try{
        const {username,email ,phone , password} = req.body;//1
        const userExist= await User.findOne({email:email});//2  chceks if user has already registered
        if(userExist){
            return res.status(400).json( {message:"EMAIL ALREADY EXISTS!!"});
        }
        //3 hashing password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password,saltRound);
        //more easier way than the above

        const userCreated = await User.create({username,email,phone,password});//4

        res.status(201).json({message:userCreated, token :await userCreated.generateToken(),userId:userCreated._id.toString(),});//JWT
    }
    catch(error)
    {
       res.status(400).send({msg:"PAGE NOT FOUND!!"})
    }
}
/*-------------------------------
USER LOGIN  LOGIC
----------------------------------*/

const login = async(req, res)=>{
    try{
        const {email, password} = req.body;//destructure the data from the body
        const userExist= await User.findOne({email:email});//checks if the email has previously registered or not, if not then 
        if(!userExist){
            return res.status(400).json( {msg:"INVALID CREDENTIALS"});
        }
        //if user exists then check if password is correctg or not 
       // const user = await bcrypt.compare(password, userExist.password);
       const user = await userExist.comparePassword(password);

        if(user){
            res.status(201).json({
                message:"login Successful",
                 token :await userExist.generateToken(),
                 userId:userExist._id.toString(),});//JWT
    }
    else
    {
        res.status(401).json({message:" Invalid Email or Password"})
    }
        }

    
    catch(error)
    {
        // res.status(500).json("internal server error");
        next(error);
    }
}

/*-------------------------------
USER LOGIC - TO SEND USER DATA
----------------------------------*/
const user = async (req,res) => {
    try{
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});
    }
    catch(error)
    {
        console.log(`error from user route ${error}`);
    }
}

module.exports= {home,register,login,user};