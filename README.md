# AmazonIA-API-

Este projeto é um desafio lançado em um processo seletivo para Desenvolvedor Front-End na empresa Alest.

  "Seu desafio é construir uma interface frontend (em angular ou react) que deverá mostrar produtos a serem vendidos. Os dados devem ser salvos e pegos pelo backend que acessa o banco de Dados NoSQL Firestore da Google. Essa aplicação deve permitir visualizar, adicionar, atualizar e deletar os produtos utilizando a API HTTP do backend.
  O backend deve ser feito em Node.js ou Typescript utilizando o framework express para construir uma API que realize um CRUD com os produtos no Firestore."

  Foi disponibilizado 72 horas para a realização do projeto.

  A ideia para o projeto foi desenvolver uma aplicação de doação de animais de estimação, utilizando os requisitos técnicos propostos pelo desafio. Onde o usuário poderia visualizar os pets disponíveis para adoção, cadastrar os pets, podendo editar suas informações ou remover o pet. 
  
-----------------
  
-- INSTRUÇÕES DE EXECUÇÃO DO PROJETO --

  - Baixe o projeto;
  - Envie a pasta "AmazonIA API" para a Área de Trabalho;
  - Abra a pasta no editor de código;
  - Execute o seguinte comando no terminal (sem as aspas):
    - "npm install";
    - "npm install -g firebase-tools";
    - "firebase login";
    - "firebase emulators:start";
  - Se ocorrer o erro "sistema operacional não pode executar o script", deve-se seguir o tutorial do link:
    - https://social.technet.microsoft.com/wiki/pt-br/contents/articles/35641.windows-10-permitir-a-execucao-de-scripts-no-powershell.aspx;
  - Pronto, o arquivo já está executando.

-----------------

Dentro do prazo, foi possível:

- Criar, no Back-end, uma API em Node.js com o framework Express, que salva os dados no Banco de dados Cloud Firestore do Google, com as seguintes funções:
  - Realizar login considerando os usuários registrados no Banco, API da qual retorna um token, utilizado para as outras APIs;
  - Realizar logout, destruindo o token, o inutilizando para chamar as outras APIs.
  - Visualizar todos os dados cadastrados no banco Firestore, com autenticação JWT;
  - Visualizar um dado específico do banco Firestore, com autenticação JWT;
  - Enviar dados ao banco Firestore, com autenticação JWT;
  - Deletar dados do banco Firestore, com autenticação JWT;
  - Atualizar dados do banco Firestore, com autenticação JWT;
  - Inserção de imagem do pet passando a URL na API de POST do pet.

- Desenvolver uma interface Front-end com fluxo de navegação, sendo que a navegação pod ser feita:
  - Pelos botões no menu superior;
  - Pelo botão de doação na tela "Adote um Pet";
  - Pelos cards na tela "Adote um Pet".

- Desenvolver a tela:
  - Login (signin.html);
  - Adote um Pet (index.html), contendo a aba Adote um Pet e a aba Detalhes do Pet;
  - Formulário Casdastro de Pet (danate.html).

- Visualizar os pets cadastrados no Banco Firestore no Front-end utilizando a API criada na tela "Adote um Pet" (index.html).

Dentro do prazo, não foi possível:

  - Integrar a API no Front-end para cadastrar, editar e remover os pets;
  - Tornar o conteúdo da aba de detalhes do pet dinâmico (essa página é quando se clica em cima dos cards);
  - Realizar login validando os dados utilizando a API;
  - Destruir o token da sessão, pois não houve login via API.

Motivo pela falta da entrega de alguns requisitos:
  - Estruturei o projeto em React, porém ainda estou aprendendo a tecnologia e meu conhecimento não foi suficiente para conseguir entregar alguns itens dentro do prazo, mais especificamente a chamada das APIs.
