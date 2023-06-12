const bcrypt = require('bcrypt');
// import config from "../config/index";


class bcryptHelper {

 generateHash = async(password:string)=> {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// Function to compare a password with a hash
 comparePassword= async(password:string, hash:string)=> {
  const match = await bcrypt.compare(password, hash);
  return match;
}




}
const  BcryptHelper = new bcryptHelper();

export default BcryptHelper;
// export default bcryptHelper;

