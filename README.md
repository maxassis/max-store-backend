# Max Store Backend 🚀

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3178C6?style=for-the-badge&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Node-Cache](https://img.shields.io/badge/Node--Cache-FF9900?style=for-the-badge&logoColor=white)

## 📌 Descrição

Este é o backend da aplicação **Max Store**, desenvolvido com **Node.js** e **Express**, utilizando **MongoDB** como banco de dados, **Mongoose** para modelagem, **Zod** para validação de dados e **Node-Cache** para cache local. Os testes são realizados com **Vitest**.

## 🛠️ Tecnologias Utilizadas

- 🟢 Node.js
- 🚀 Express.js
- 🍃 MongoDB
- 📦 Mongoose
- ✅ Zod
- 🔥 Node-Cache
- 🧪 Vitest

## 📦 Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/maxassis/max-store-backend.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd nome-do-repo-backend
   ```
3. Instale as dependências:
   ```sh
   npm install
   # ou
   yarn install
   ```

## 🚀 Executando o Projeto

1. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   ```
2. Inicie o servidor:
   ```sh
   npm run dev
   # ou
   yarn dev
   ```

O servidor será iniciado em `http://localhost:3000/`.

## 📂 Estrutura do Projeto
```
📦 nome-do-repo-backend
 ┣ 📂 src
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┣ 📂 services
 ┃ ┣ 📜 index.tsx
 ┣ 📜 package.json
 ┗ 📜 README.md
```

## ✅ Funcionalidades
- 🌍 API RESTful com Express
- 📂 Banco de dados MongoDB com Mongoose
- 🔍 Validação de dados com Zod
- ⚡ Cache local com Node-Cache
- 🛒 Funcionalidade de carrinho de compras integrada com o frontend
- 🧪 Testes automatizados com Vitest

## 🛒 Carrinho de Compras
- Adiciona, remove e atualiza produtos no carrinho.
- Persiste os dados no banco de dados MongoDB.
- Utiliza cache para otimizar a performance.

## 🧪 Testes
Para rodar os testes:
```sh
npm run test
# ou
yarn test
```

## 🔗 Repositório do Frontend
O frontend da aplicação pode ser encontrado no seguinte repositório:
[Frontend Repository](https://github.com/maxassis/max-store.git)

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:
1. Faça um **fork** do projeto
2. Crie uma **branch** para sua feature (`git checkout -b minha-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona minha feature'`)
4. Faça um **push** para a branch (`git push origin minha-feature`)
5. Abra um **Pull Request**

## 📜 Licença

Este projeto está sob a licença MIT. 

---
Feito com ❤️ por [Max Assis](https://github.com/maxassis)

