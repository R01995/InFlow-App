const mongoose = require("mongoose");

const DetailsServiceById =async (Reqest, DataModel) => {
    try{
        let id = Reqest.params.id
        let email = Reqest.headers.email
        const objectId = mongoose.Types.ObjectId

        let query  ={}
        
        query['_id'] = new objectId(id);
        query['userEmail'] = email;

        let data = await DataModel.aggregate ([
            {$match: query},
        ]) 

        return {status:"success", data: data}
    }

    catch(error){
        return {status:"fail", data: error}
    }
};


module.exports = DetailsServiceById