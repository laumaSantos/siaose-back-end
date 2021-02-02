const connection = require('../database/connection');

module.exports ={
     
    async login(req,res){
        const {email, password} = req.body;
        console.log(email)
        const user = await connection('users').where('email', email).andWhere('password', password).select('id').first();
        console.log(user)

        if(!user)
            return res.json({error:"User not found"})   

        return res.json(user);
    }
}