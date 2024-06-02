const CreateService = async (Reqest, DataModel) => {
    try{
        let body = Reqest.body
        body.userEmail = Reqest.headers.email

        let data = await DataModel.create(body)
        return {status:"success", data: data}
    }

    catch(error){
        return {status:"fail", data: error}
    }
}


module.exports = CreateService