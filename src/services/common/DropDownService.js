const  DropDownService = async (Reqest, DataModel, projection) => {
    try{
        let userEmail = Reqest.headers.email

        let data = await DataModel.aggregate([
            {$match: {userEmail: userEmail}},
            {$project: projection}
        ])

        return {status:"success", data: data}

    }

    catch(error){
        return {status:"fail", data: error}
    }
}

module.exports = DropDownService