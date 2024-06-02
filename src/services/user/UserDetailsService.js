const UserDetailsService = async (Reqest, DataModel) => {

    try{
            let data = await DataModel.aggregate(
                [
                    {$match: {  email: Reqest.headers.email  }},
                    {$project: {password: 0}}
                ]
            )
            return {status:"success", data: data}
    }

    catch(error){
        return {status:"fail", data: error}
    }

}

module.exports = UserDetailsService