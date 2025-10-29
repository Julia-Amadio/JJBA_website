## Website-Enciclopédia JoJo's Bizarre Adventure 

Projeto de aplicação web dinâmica com front-end (HTML, CSS, JS) e back-end (Node.js, Express) conectado a um banco de dados PostgreSQL (Neon).

Este projeto foi desenvolvido para a disciplina de Bancos de Dados II, com o objetivo de exibir dinamicamente informações sobre o universo de JoJo's Bizarre Adventure.

## Tecnologias Utilizadas

### Front-End
* **HTML5**
* **CSS3**
* **JavaScript (Vanilla)**: Usando `fetch` para consumir a API do back-end.
* **Chart.js**: Biblioteca para renderização dos gráficos de radar.

### Back-End
* **Node.js**: Ambiente de execução do servidor.
* **Express.js**: Framework para criar o servidor web e as rotas da API.
* **node-postgres (`pg`)**: Driver para conectar o Node.js ao banco de dados PostgreSQL.

### Banco de Dados
* **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
* **Neon**: Plataforma de hospedagem serverless para o PostgreSQL na nuvem.

## Como Executar

É necessário ter o [Node.js](https://nodejs.org/) (versão 16 ou superior) instalado.

1.  **[to-do] Clone o repositório **
    No terminal, navegue até a pasta onde você deseja clonar o repositório e utilize o comando:
    ```bash
    git clone https://github.com/Julia-Amadio/JJBA_website.git
    ```

2.  **Instale as Dependências do Back-End**
    * No terminal, na raiz da pasta `jojo-app`, execute:
    ```bash
    npm install
    ```
    * *Isso irá ler o `package.json` e instalar o `express` e o `pg` na pasta `node_modules`.*