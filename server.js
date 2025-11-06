//Importar as bibliotecas (Express e o driver 'pg' do Postgres)
const express = require('express');
const { Pool } = require('pg');

//Inicializar o Express
const app = express();
const port = 3000; //Porta onde o servidor vai rodar

//Configurar a Conexão com o Banco
//ATENÇÃO: Pegar string de conexão no site do Neon 
//e colar ela aqui quando pronta.
const connectionString = "string_de_conexao_esta_no_zipzop"; 
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

//ROTA DA API (PÁGINA 1 - PERSONAGENS): Buscar TODOS os personagens (em ordem alfabética)
app.get('/api/personagens', async (req, res) => {
  try {
    //Busca todos os nomes da tabela Personagens, ordenados pelo nome
    const query = 'SELECT nome FROM Personagens ORDER BY nome ASC';
    const result = await pool.query(query);
    
    //Envia a lista de nomes como JSON
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar personagens:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

//ROTA DA API (PÁGINA 2 - PERSONAGENS): Buscar UM personagem específico
//O ':nome' é um parâmetro dinâmico
app.get('/api/personagem/:nome', async (req, res) => {
  try {
    //Pega o nome da URL (ex: /api/personagem/Kujo%20Jotaro)
    const nomePersonagem = req.params.nome; 

    //Query parametrizada para segurança (impede SQL Injection)
    //Busca TODOS os dados de UM personagem, baseado no nome
    const query = 'SELECT * FROM Personagens WHERE nome = $1';
    const result = await pool.query(query, [nomePersonagem]);

    if (result.rows.length === 0) {
      //Se não encontrar o personagem, retorna 404
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }

    //Envia os dados completos do personagem (o primeiro resultado)
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar detalhe do personagem:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

//Iniciar o Servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});