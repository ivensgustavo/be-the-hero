const connection = require('../database/connection');

module.exports = {

  async index(request, response){
    const {page = 1} = request.query;

    const [total_registers] = await connection('incidents').count();

    const incidents = await connection('incidents')
      //Sintaxe join: tabela que quero juntar, campo que quero comparar na 
      //tabela que quero juntar, condição de junção, campo que comparar na tabela atual
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])
      .limit(5)//de quantos em quantos vou mostrar
      .offset((page - 1) * 5);//a partir de qual começo a mostrar

    //Enviando o total de registros pelo cabeçalho de resposta da requisição
    response.header('X-Total-Count', total_registers['count(*)']);


    return response.json(incidents);
  },

  async create(request, response){
    const {title, description, value} = request.body;

    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },

  async delete(request, response){
    const {id} = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if(incident.ong_id != ong_id){
      return response.status(401).json({ eror: 'Operation not permitted.'});
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
      
  }
}