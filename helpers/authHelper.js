const bcrypt= require("bcrypt");

module.exports.hashPassword=(password)=>{
    try {
     const  saltRounds = 10;
     const hashedPassword=  bcrypt.hash(password,saltRounds)
     return hashedPassword
        
    } catch (error) {
        console.log(error);
     }
  }
  //==========compaire======================
  module.exports.comparePassword=(password,hashedPassword)=>{
    return  bcrypt.compare(password,hashedPassword)

  }