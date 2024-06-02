
const bcrypt = require('bcrypt');

const UserCreateServices = async (Request, DataModel) => {
    
    try {
        const userData = Request.body
        // hash the password
        const hashPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashPassword
        //create data with hashed passwrd
        const data = await DataModel.create(userData)
        return {status:"success", data: data}
    }
    catch(error){
        return{status:"fail", data: error}
    }


}

module.exports = UserCreateServices