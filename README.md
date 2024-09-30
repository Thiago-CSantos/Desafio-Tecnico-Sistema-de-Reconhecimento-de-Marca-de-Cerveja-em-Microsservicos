# Desafio Técnico

## Sistema de Reconhecimento de Marca de Cerveja em Microsserviços

----------

1. Como executar o projeto
2. Arquitetura e tecnologias utilizadas
3. Exemplos

----------

## Como executar o projeto

1. Primeiro inicie o Docker na sua maquina, quando docker já estiver tudo OK!
execute o seguintes comando na raiz do projeto(onde se localiza o arquivo **docker-compose**) ` docker-compose up -d `.
2. Espere terminar de criar os serviços e execute o comando ` docker-compose up app ` para executar o serviço do **NestJS** e rodar as migrations do banco.
3. Com isso já pode consumir a API.

----------

## Arquitetura e tecnologias utilizadas

- ### O **NestJS** usa uma arquitetura modular, baseada em módulos, para organizar o desenvolvimento de aplicativos

- ### Em **NestJS** foi usado o padrão MVC

- ### TypeScript(NestJS), Python(Flask), Tesseract(Reconhecer caracteres), Docker

----------

## Exemplos

### Post(/upload) - Os tipos aceitos são image/jpeg', 'image/png', 'image/jpg'

![alt text](image-1.png)

### Get(/logs) - Consulta o log salvo da consulta /upload

para buscar pelo id basta passar (/logs/id)

![alt text](image-2.png)
