<img src="https://i.imgur.com/DgwFrC9.png"/>

This is final project of 9 weeks **Node.js** workshop operated by [STRV](https://www.strv.com)

[![Build Status](https://travis-ci.com/jozefcipa/strv-task.svg?token=s4QdpQx7n36q53UZ51Mk&branch=master)](https://travis-ci.com/jozefcipa/strv-task) 

Live demo at [https://addressbook-api-strv.herokuapp.com](https://addressbook-api-strv.herokuapp.com)

#### Setup
1. `git clone https://github.com/jozefcipa/strv-task.git`
1. `cd strv-task`
1. `cp .env.example .env` Set environment variables  
1. `yarn install`
1. `yarn infra:start`
1. `yarn dev`
1. API is available on address `http://localhost:3000` 🎉

#### Endpoints
##### REST
- `POST /login` Authenticates user by email and password
- `POST /users` Registers new user
- `POST /contacts` **(protected)** Creates new contact for user

##### GraphQL
- `POST /graphql`
- `GET /graphql` GraphQL playground, in development environment

#### Tests

- `yarn test` Runs tests 
- `yarn test:coverage` Runs tests and make code coverage analysis
- `yarn test:coverage:show` Opens generated coverage analysis in browser

#### Documentation
- `yarn docs` Generates code documentation
- `yarn docs:show` Opens generated code documentation in browser

#### Used technologies
- Node.js
- Jest
- Docker
- MongoDB
- Heroku
- Travis
- Firebase
- JWT token authentication

<hr>
2018 - Jozef Cipa &lt;<a href="mailto:cipajozef@gmail.com">cipajozef@gmail.com</a>&gt;