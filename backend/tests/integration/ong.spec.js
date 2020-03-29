const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/conection');

describe('ONG', ()=>{
    beforeEach( async()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll( async()=> {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async ()=>{
        const response = await request(app).post('/ongs')
        // .set('authorization','valor') caso precise enviar algo no header da requisição
        .send({
            name: "leonardo",
            email: "leo@hotmail.com",
            whatsapp: "3333333333",
            city: "porto",
            UF: "RS"            
        });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});