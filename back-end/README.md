# Requisitos de Sistema

- Node
- Npm
- Docker
 

### Instalação NPM e Node
```
sudo apt-get update
sudo apt install npm
sudo apt-get install git-core curl build-essential openssl libssl-dev

sudo npm cache clean -f
sudo npm install -g n
sudo n latest
```
### Instalação Docker
https://docs.docker.com/install/linux/docker-ce/ubuntu/
```
sudo apt-get install  curl apt-transport-https ca-certificates software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose
```

## Executando 

Execute o docker-compose para criar as imagens e containers das imagens do MongoExpress e MongoDB:
```
sudo docker-compose up -d
```
Testar as conexões do MongoDB:
```
mongo --port 27018 -u root -p opens -authenticationDatabase admin
```
Insira o usuário master no sistema, responsável por criar e deletar usuários:
```
use opensapi
db.user.insert({"isMaster" : true, "login" : "master", "name" : "master", "email" : "master@master.com", "password" : "$2b$10$TLQH.vtlYQUfVX8EhpfYhegZA2J6Q1VV6u3m.jj7oR../JlXjfppK", "__v" : 0 })
```

Finalmente, instale as dependências npm install e execute a aplicação npm run start e faça a autenticação em POST:http://localhost:3000/auth com body
```json
{ 
    "email":"master@master.com",
    "password": "123456"
}
```
Resgate o token retornado da autenticação e utilize nos endpoints com autenticação Bearer:

- POST: http://localhost:3000/user  *
- DEL: http://localhost:3000/user/:id *
- PUT: http://localhost:3000/user/:id  
- GET:http://localhost:3000/user/:id

- POST: http://localhost:3000/imovel *
- PUT: http://localhost:3000/imovel/:id *
- DELETE: http://localhost:3000/imovel/:id *
- GET: http://localhost:3000/imovel/:id 
- POST: http://localhost:3000/imovel

"*" *(somente usuário master)*

## Acessar API via Swagger 

http://localhost:3000/api/

## Acessar dados via MongoExpress 

Testar mongoExpress (usuario express, senha opens):
``` 
http://localhost:8081
```

### Acessar documentação completa
```
npm run start:doc
```

## Postman Collection

opensapi.postman_collection.json
