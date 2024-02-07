 const {z} = require("zod");
 const loginSchema=z.object({
   email: z
   .string({required_error:"Username is required"})
   .trim()
   .email({message:"Invalid email address"})
   .min(3,{message:"Email must be atleast of 3 chars"}) 
   .max(255,{message:"Email must not be more than 255 characters"}),

   password: z
   .string({required_error:"Password is required"})
   .min(3,{message:"Password must be atleast of 3 chars"}) 
   .max(255,{message:"Password must not be more than 255 characters"})
});
 const signupSchema = loginSchema.extend({
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be atleast of 3 chars"}) 
    .max(255,{message:"Name must not be more than 255 characters"}),
    phone: z
    .string({required_error:"Phone is required"})
    .trim()
    .min(7,{message:"Phone Number must be atleast of 7 digits"}) 
    .max(10,{message:"Phone Number must not be more than 10 characters"}),
    
 });


 module.exports = {signupSchema,loginSchema};