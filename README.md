# Todo App com Spring e React

## Conteúdo

- [Sobre](#sobre)
- [Instalando](#instalando)
- [Requisitos](#requisitos)

## Sobre

Esse foi um pequeno projeto pra iniciar no desenvolvimento de APIs com Spring

## Instalando

- Frontend
  - É necessário clonar o repositório:
  `git clone https://github.com/mateusmsant/spring-react-todo.git`
  - Instalar as dependências:\
  `cd frontend`\
  `npm install`\
  `npm start`
  - A aplicação estará rodando em localhost:3000

- Backend
  - É necessário clonar o repositório:
  `git clone https://github.com/mateusmsant/spring-react-todo.git`
  - Instalar as dependências:\
  `cd backend`\
  `mvn install`\
  `mvn spring-boot:run`
  - A aplicação estará rodando em localhost:8080

- Banco de dados
  - A conexão com o banco de dados usa MySQL na porta **3306**, com username **root** e password **vazio**.
  - Você pode alterar essas variáveis de conexão em `backend/src/main/resources/application.properties`:
  
  ![application.properties](https://i.imgur.com/VM3jzhK.png)

### Requisitos

- Java
- Node e NPM
- Maven
