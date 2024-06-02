const AssocialteVerificationService = async (query, associateModel) => {

    try{

        let data = await associateModel.aggregate([
            {$match: query}
        ])

        return data.length> 0 ? true : false
    }

    catch(error){
        return {status:"fail", data: error}
    }


}


module.exports = AssocialteVerificationService