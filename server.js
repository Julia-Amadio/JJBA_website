//Importar as bibliotecas (Express e o driver 'pg' do Postgres)
const express = require('express');
const { Pool } = require('pg');

//Inicializar o Express
const app = express();
const port = 3000; //Porta onde o servidor vai rodar

//Configurar a Conexão com o Banco
//ATENÇÃO: Pegar string de conexão no site do Neon 
//e colar ela aqui quando pronta.
const connectionString = "string_de_conexao_do_render"; 
//A STRING DE CONEXÃO DO RENDER FOI PASSADA NO ZAP
//A STRING DE CONEXÃO NÃO DEVE IR PRO GITHUB DE MANEIRA ALGUMA
//APENAS ESTE CÓDIGO DEVE.
//VOU DESCOBRIR OUTRA HORA COMO FAÇO PRA ELE NÃO APARECER NO RENDER.

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false //Necessário para o Neon
  }
});

//Servir Arquivos Estáticos (HTML/CSS)
//Isso faz a pasta 'public' ser a raiz do site
app.use(express.static('public'));

//Criar a Rota da API (Onde o front-end buscará os dados)
app.get('/api/stands', async (req, res) => {
  try {
    //Consulta SQL para buscar todos os stands
    const query = 'SELECT * FROM Stands';
    const result = await pool.query(query);

    //Envia os dados encontrados como JSON
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar stands:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

//Iniciar o Servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});