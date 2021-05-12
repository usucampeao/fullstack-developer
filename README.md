![UsuCampeão](logo.png)

# USUCAMPEÃO Tecnologia em Regularização Imobiliária

Somos mais que uma Startup de regularização de imóveis, nascemos para resolver um problema social que atinge mais de 50% da população brasileira.

Através da inovação, execução de qualidade e baixo custo realizamos o sonho da propriedade regularizada.

Nosso propósito é gerar segurança jurídica e #prosperidade a todas as pessoas.

*Venha fazer parte deste time CAMPEÃO!!!*

## Desenvolvedor Full Stack

Então, quer dizer que você gosta de desafios e quer se tornar um desenvolvedor full stack na UsuCampeão? Está no lugar certo!

Este teste faz parte do nosso processo de seleção e é a sua chance de nos mostrar todo o seu conhecimento como desenvolvedor full stack com angular e node.js. Este teste está dividido em duas etapas:

1. Desenvolver uma API REST simples, utilizando node.js
1. Desenvolver uma aplicação front-end simples, utilizando angular

Daremos um feedback a todos os que fizerem o Pull Request.

As especificações das aplicações estão logo abaixo.

A sua entrega será feita através de um Pull Request nesse repositório. Faça um fork do repositório, implemente o seu código e faça um pull request. Sinta-se a vontade para colocar quaisquer outras informações que você considere pertinente no README.

### Instruções:

1. Faça um fork deste repositório;
2. Construa uma API REST conforme solicitado, utilizando Node.js, dentro da pasta ```back-end```;
3. Construa uma aplicação front-end conforme solicitado, utilizando HTML, CSS e Angular, dentro da pasta ```front-end```;
4. Adicione quaisquer informações adicionais para executar sua aplicação no README.md;
5. Após terminar, submeta um pull request e aguarde seu feedback.

**PS:** Utilizamos este mesmo testes para os níveis (**júnior**, **pleno** ou **sênior**), apenas adequando o nível de exigência na avaliação de acordo com o perfil da vaga.

### Projeto 1: Criando uma API REST para uma classificado de imóveis

Neste primeiro projeto, seu objetivo é criar uma API REST para um mini classificado de imóveis, o UsuImóveis. Neste classificado, nossos usuários podem cadastrar e anunciar seus imóveis. Potenciais clientes podem pesquisar os imóveis e indicar quais os interessam.

Considerando a funcionalidade de um classificado de imóveis, construa uma API REST contendo as operações de básicas de CRUD: inclusão, atualização, exclusão e consulta - tanto de um único imóvel quanto uma listagem deles. O recurso em questão deve ter a seguinte estrutura:

Imóvel
- ID
- Data de Publicação
- Título
- Descrição
- Valor
- Área (em m²)
- Endereço
  - Logradouro
  - Número
  - Complemento
  - Bairro
  - CEP
  - Cidade
  - Estado

Você é livre para montar a aplicação como quiser, utilizando qualquer framework que lhe convier, mas temos alguns pré-requisitos:
- Utilização de Node.js 10+;
- Utilização de alguma banco de dados - sugerimos um banco de dados simples, em memória ou em JSON;

Além disso, vamos avaliar como você organiza e documenta o projeto, e a estrutura de módulos, componentes, serviços e rotas que você criou.

Ganhe pontos extras por:
- Validação do CEP e preenchimento do endereço usando o ViaCEP;
- Documentação da API;
- Documentação do código;
- Mecanismo de pesquisa - filtros e paginação;
- Postman Collection (para testes da API);
- Testes unitários e end to end;
- Scripts de deploy;
- Containerização usando Docker;
- Organização e mensagens dos commits.

### Projeto 2: Criando uma interface front-end para seu classificado de imóveis

Agora que nós temos uma API REST, já podemos pensar em uma aplicação para nossos usuários finais. Neste segundo projeto, seu objetivo é criar uma pequena aplicação front-end para o nosso mini classificado de imóveis, o UsuImóveis. Agora, nossos usuários poderão cadastrar seus imóveis, e potenciais clientes podem pesquisar os imóveis e indicar quais os interessam.

chegou a hora de montarmos uma aplicação front-end para que nossos usuários finais consigam utilizá-la.

Você é livre para montar a aplicação como quiser, mas gostaríamos de ver a listagem de todos os imóveis, com informações básicas, em uma página inicial e detalhes do imóvel selecionado em outra página.

Temos alguns pré-requisitos:
- Utilização de Angular 8+;
- Uso de SASS/SCSS para CSS da aplicação;
- Design responsivo;
- Pelo menos um filtro de pesquisa deve estar disponível;

Além disso, vamos avaliar como você organiza e documenta o projeto, e a estrutura de módulos, componentes, serviços e rotas que você criou.

Ganhe pontos extras por:
- Uso de Angular Material;
- Filtros de pesquisa adicionais;
- Paginação dos resultados;
- Layout diferenciado e animações;
- Mecanismo de pesquisa;
- Cache e persistência dos dados no ``localStorage`` ou ``IndexedDB``;
- Funcionamento offline com os dados cacheados - melhor ainda se for um PWA!;
- Testes unitários e end to end;
- Scripts de deploy;
- Organização e mensagens dos commits.

**Boa sorte! =)**

