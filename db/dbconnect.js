const mongoose = require('mongoose')
const connectdb=async()=>{
    if(process.env.MODE==="development"){
        await mongoose.connect(process.env.LOCAL_DB)
        .then(res=>{
            console.log("Development Mode: Connected to local MongoDB")
        }).catch(err=>console.log(err.message))
          
        }else if(process.env.MODE==="production"){
            await mongoose.connect(process.env.CLOUD_DB)
            .then(res=>{
                console.log("Development Mode: Connected to CLoud MongoDB")
            }).catch(err=>{err.message})
    }
}
module.exports = connectdb