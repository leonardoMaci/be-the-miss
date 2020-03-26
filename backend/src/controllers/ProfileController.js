const connection = require('../database/conection');

module.exports = {
    async listIncidentsByIdOng(request, response){
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*');

        return response.json(incidents);    
    }
}