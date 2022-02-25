Projeto criado para a Trybe como validação de conhecimento dos alunos.
Realizado em 20/fev/2022.


# Habilidades para a realização do projeto

Neste projeto, você será capaz de:

- Declarar variáveis e funções com tipagens _Typescript_;

- Construir uma _API Node Express_ utilizando o _Typescript_.

---

## O que deverá ser desenvolvido

Para este projeto, você vai desenvolver um **CRUD** (_Create, Read, Update_ e _Delete_) de itens medievais, no formato de uma _API_, utilizando _Typescript_.

Você irá criar alguns _endpoints_ que irão ler e escrever em um banco de dados, utilizando o **MySQL**.

---

## Desenvolvimento

Você vai desenvolver todas as camadas da aplicação (_Models_, _Service_ e _Controllers_) em seu código e, por meio dessa aplicação, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`, para as pessoas mais íntimas 😜).

O código para cadastro de pessoas usuárias deve ser criado por você utilizando os conhecimentos adquiridos nesse bloco.

### 1 - Crie um endpoint para o cadastro de pessoas usuárias

- O endpoint deve ser acessível através do caminho (`/users`);

- As informações de pessoas usuárias cadastradas devem ser salvas na tabela `Users` do banco de dados;

- Um token `JWT` deve ser gerado e retornado caso haja sucesso no _cadastro_. No seu _payload_ deve estar presente o _id_ e _username_.

- O endpoint deve receber a seguinte estrutura:
```json
{
  "username": "string",
  "classe": "string",
  "level": 1,
  "password": "string"
}
```
</details>

---

### 2 - Crie um endpoint para o login de pessoas usuárias

- O endpoint deve ser acessível através do caminho (`/login`).

- A rota deve receber os campos `username` e `password`, e esses campos devem ser validados no banco de dados.

- Um token `JWT` deve ser gerado e retornado caso haja sucesso no _login_. No seu _payload_ deve estar presente o _id_ e _username_.

- O endpoint deve receber a seguinte estrutura:
```json
  {
    "username": "string",
    "password": "string"
  }
```

</details>

---

### 3 - Crie um endpoint para o cadastro de produtos

- O endpoint deve ser acessível através do caminho (`/products`).

- Um produto só pode ser criado caso a pessoa usuária esteja _logada_ e o _token_ `JWT` validado.

- Os produtos enviados devem ser salvos na tabela `Products` do banco de dados;

- O endpoint deve receber a seguinte estrutura:
```json
  {
    "name": "Espada longa",
    "amount": "30 peças de ouro"
  }
```

</details>

---

### 4 - Crie um endpoint para a listagem de produtos

- O endpoint deve ser acessível através do caminho (`/products`);

- A rota pode ser acessada apenas por pessoas logadas e com token `JWT` válido;
