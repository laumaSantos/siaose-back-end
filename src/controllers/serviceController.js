const connection = require('../database/connection');

module.exports ={
    async create(req,res){
        const {name,location,description,value,stars} = req.body;
        const user_id = req.headers.user_id;
        
        const [id] = await connection('services').insert({
            name,
            description,
            location,
            value,
            stars,
            user_id
        });

        return res.json({id})
    },

    async index (req,res){
        const services = await connection('services').select('*');
    
        return res.json(services)
    },

    async delete(req,res){
        const {id} = req.params;
        const user_id = req.headers.user_id;

        console.log('id',id)

        const service = await connection('services').where('id', id).select('user_id').first();

            console.log(service.user_id)
            if (service.user_id != user_id){
                return res.json({message:'Ocorreu um erro, tente novamente.'})
            }

            await connection('services').where('id',id).delete();

            return res.json({message:'Excluído com sucesso!'})
    },

    async update(req,res){
        const {id} = req.params;
        const {user_id} = req.headers;
        let {name,location,description,value, stars} = req.body;
        console.log(user_id)

        const service = await connection('services').where('id',id).select('*').first();
        console.log(service)

        if(service.user_id != user_id){
            return res.json({error:'Ocorreu um erro, tente novamente mais tarde.'});
        }

        if(name === '' || name === service.name){
            name = service.name
        }
        if(location === '' || location === service.location){
            location = service.location
        }
        if(description === '' || description === service.description){
            description = service.description
        }
        if(value === '' || value === service.value){
            value = service.value
        }
        if(stars === '' || stars === service.stars){
            stars = service.stars
        }

        await connection('services').where('id',id).update({
            name,location,description,value, stars
        })

        return res.json({message:'Alteraçao realizada com sucesso'})
    }

}