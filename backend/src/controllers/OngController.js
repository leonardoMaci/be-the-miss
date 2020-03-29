const generateUniqueID = require('../utils/generateUniqueId')
const connection = require('../database/conection');

module.exports = {
    async index(request, response){
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);    
    },    
    async create(request, response){
        const {name,email,whatsapp,city,UF} = request.body;

        const id = generateUniqueID();
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            UF,
        });
         
        return response.json({ id });
    }
}