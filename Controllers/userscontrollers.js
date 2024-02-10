const User = require("../Models/user")



const createuser = async (email) => {
    try {
        const existingUser = await User.findOne({ email: email });
  
        if (existingUser) {
            return existingUser;
        }
    
      const newUser = new User({
      email:email
  
        
      });
  
     
      await newUser.save();
  
        return true
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }
  
  module.exports = createuser;