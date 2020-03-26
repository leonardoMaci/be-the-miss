const connection = require('../database/conection');

module.exports = {
    async index(request, response){

        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const indicents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1)* 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.UF'
        ]);

        response.header('X-Total-Count',count['count(*)']);
        
        return response.json(indicents);
    },
    async create(request, response){
        const {title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            ong_id,
            title,
            description,
            value,
        });

        return response.json({ id });
    },
    async delete(request, response){
        const ong_id = request.headers.authorization;
        const { id } = request.params;

        const indicent = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(indicent.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        };

        await connection('incidents').where('id',id).delete();

        return response.status(204).send();
    }
};