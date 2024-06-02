const DeleteService = async (Reqest, DataModel) => {
    try{
        let id = Reqest.params.id
        let email = Reqest.headers.email
        let querty = {}

        querty['_id'] = id
        querty['userEmail'] = email

        let data = await DataModel.deleteMany(querty)
        return {status:"success", data: data}
    }

    catch(error){
        return {status:"fail", data: error}
    }
}

module.exports = DeleteService
