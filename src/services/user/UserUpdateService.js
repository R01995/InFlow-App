

const UserUpdateService= async (Request, DataModel)=>{

    try{
        let data = await DataModel.updateOne({email: Request.headers.email}, Request.body)
        return {status:"success", data: data}
    }
    catch{ 
        return {status:"fail", data: error}
    }
}


module.exports = UserUpdateService 