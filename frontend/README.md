# Pokemon Team Builder - Frontend

## Documentação

### Como funciona?
Esse é um aplicativo criado utilizando `create-react-app`, com o preset de TypeScript. Foram utilizadas bibliotecas do `firebase` (para autenticação via Google Auth) e `react-bootstrap` (estilos e responsividade).

#### Intuito da Aplicação
Oferecer uma interface entre o usuário e os dados armazenados no servidor. Cada usuário deve ser "dono" de um time de até 6 Pokémons. Ele deve ser capaz de incluir, remover e editar informações de membros do time.

#### Funcionalidades Implementadas

- Uso da API gratuita [PokéAPI](https://pokeapi.co/) para buscar os dados sobre os Pokemóns;
- Interface pensada para uso tanto no Desktop quanto em dispositivos Mobile;
- Autenticação no Frontend via Google, utilizando `firebase`;
- Cada usuário autenticado tem 01 time próprio, que é salvo automaticamente a cada alteração;
- Implementados métodos GET, POST, PATCH e DELETE à API, utilizando `axios`;
- Design responsivo, utilizando `react-bootstrap`;
- Componentes estilizados, com `react-bootstrap` em conjunto com CSS Modules;
- Tipagem definida para todos as variáveis e métodos, sem nenhuma tipagem `any` implícita;
- Utilização de componentes funcionais, com hooks nativos `useState`, `useEffect` e custom hooks introduzidos pela lib `firebase`;
- Algumas otimizações de performance básicas (early returns, utilização de keys únicas pra cada item num Array);

## Instruções para instalação

- Clone o repositório;
- Navegue até `caminho/do/repositório/frontend` e execute `npm install`;
- É necessário fornecer as credenciais de acesso ao Firebase, por meio do arquivo `/src/firebase_config.json`;
- Informe a URL da API por meio da variável de ambiente `REACT_APP_API_URL`;
- Para servir a aplicação em modo de desenvolvimento, utilize `npm start`;
- Pronto!