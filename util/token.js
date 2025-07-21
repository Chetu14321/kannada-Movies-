const jwt=require('jsonwebtoken');

const genarateToken= async (id)=>{
    return await jwt.sign({id},process.env.SECRET_KEY,
        {expiresIn:'1d'})
}
module.exports = genarateToken