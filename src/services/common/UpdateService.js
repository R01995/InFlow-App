const UpdateService = async (Reqest, DataModel) => {

    try{
        let id = Reqest.params.id
        let email = Reqest.headers.email
        let body = Reqest.body

        let data = await DataModel.updateOne({_id: id, userEmail: email}, body)
        return {status:"success", data: data}
    }

    catch(error){
        return {status:"fail", data: error}
    }

}

module.exports = UpdateService