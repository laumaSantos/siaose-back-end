const connection = require('../database/connection');

module.exports = {
    //CRIA UM USUÁRIO
    async create (req,res){
        const {cpf,name,email, password, profession, avatar} = req.body;
        console.log(email)
        
        //Realiza a busca no banco pelo email informado, se já está cadastrado, caso esteja, retorna um erro
        const emailExists = await connection('users').where('email', email).select('id').first()
        console.log(emailExists)
        if(emailExists)
            return res.json({error:"Email já cadastrado"})
            
        //Realiza a busca no banco pelo CPF informado, se já está cadastrado, caso esteja, retorna um erro
        const cpfExists = await connection('users').where('cpf',cpf).select('id').first()
        console.log(cpfExists)
        if(cpfExists)
            return res.json({error:"CPF já cadastrado"})
        
        //Insire os dados na tabela users
        const user_id = await connection('users').insert({
            cpf,
            name,
            email,
            password,
            profession,
            avatar
        });
        //returna o id de usuário (CPF)
        return res.json(user_id)
    },
    // LISTA TODOS OS USUÁRIOS
    async index (req,res){
        // realiza uma busca por todos os registros na tabela users
        const users = await connection('users').select('*');
        // retorna um array de usuários
        return res.json(users)
    },

    async get (req,res){
        const {id} = req.params;
        const user = await connection('users').where('id', id).select('*');
        
        return res.json(user)
    },


    async delete(req,res){
        const {id} = req.params;
        console.log('id',id)

        const user = await connection('users').where('id', id).first();

            if (user.id != id){
                return res.status(401).json({error:'Sem permissão'})
            }

            await connection('users').where('id',id).delete();

            return res.status(201).json({Message:'Deleted'})
    },

    async update(req,res){
        const {id} = req.params;
        let {name, email, password, avatar, profession} = req.body;
        console.log(avatar)

        const user = await connection('users').where('id',id).first();
        console.log(user.email)

        if(user.id != id){
            return res.json({error:'Sem permisão'});
        }

        if(name === '' || name === user.name){
            name = user.name
        }

        if(email === '' || email === user.email){
            email = user.email
        }

        if(password === '' || password === user.password){
            password = user.password
        }

        if(profession === '' || profession === user.profession){
            profession = user.profession
        }

        if(avatar === '' || avatar === user.avatar || avatar === 'undefined'){
            avatar = user.avatar
        }


        await connection('users').where('id',id).update({
            name,
            email,
            password,
            avatar,
            profession
        })

        return res.status(201).json({Message:'Alteraçao realizada com sucesso'})
    }
}