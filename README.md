# URL Shortener API

API REST desenvolvida com NestJS para encurtamento de URLs. O sistema suporta autenticação JWT e acesso anônimo, com estrutura preparada para evoluir.

---

## 🚀 Como rodar localmente

### Via Docker

```bash
docker-compose up --build
```

### Local (Node.js v20+ e PostgreSQL local rodando)

```bash
npm install
npm run start:dev
```

> O banco precisa estar rodando com as credenciais definidas no `.env`. Veja abaixo.

---

## 🔐 Variáveis de ambiente

Copie o `.env` de exemplo e ajuste conforme o ambiente:

```env
# URL de conexão com banco PostgreSQL usado pelo Prisma
DATABASE_URL=postgresql://user:password@db:5432/shortener_db
JWT_SECRET=secret
# Define o ambiente da aplicação (development | production)
NODE_ENV=development
PORT=3000
```
Essas são as únicas variáveis obrigatórias para o funcionamento da aplicação.
Nenhum Redis, toggle ou config adicional é necessário.
---

## 📈 Scripts disponíveis

```bash
npm run start:dev       # Inicia o servidor em modo desenvolvimento
npm run test            # Roda os testes unitários (Jest apenas para urls.service)
npm run lint            # Executa o lint
```

---

## 🔬 Documentação da API

Swagger está disponível na rota:

```
GET http://localhost:3000/api
```

Inclui descrições, exemplos e esquema das entidades.

---

## ⚙️ Estrutura de pastas (resumo)

```
src
├── auth          # Módulo de autenticação (JWT)
├── urls          # CRUD de URLs com acesso anônimo ou autenticado
├── users         # Módulo de usuários (esqueleto)
├── core          # AppModule, controller base
├── prisma        # Conexão com o banco via PrismaService
```

---

## ✅ Funcionalidades implementadas

* [x] Estrutura limpa com NestJS e Prisma
* [x] Docker com `docker-compose` funcional
* [x] Autenticação JWT (login e registro)
* [x] CRUD de URLs com acesso público ou autenticado
* [x] Proteção com guards e validação via DTOs
* [x] Validação via DTO com class-validator em todas as entradas
* [x] Documentação Swagger na rota `/api`
* [x] Testes unitários (apenas para urls.service)

---

## 📆 Branches principais

| Branch                       | Descrição                              |
| ---------------------------- | -------------------------------------- |
| `refactor/project-structure` | Setup inicial, Docker e estrutura base |
| `feature/auth-jwt`           | Autenticação completa via JWT          |
| `feature/urls-crud`          | CRUD de URLs + acesso opcional         |
| `test/unit-urls`             | Testes unitários para url.service      |
---

## ✅ Entregas conforme solicitado no desafio técnico

Este projeto atende aos seguintes pontos obrigatórios:

* ✅ Cadastro e autenticação JWT
* ✅ Encurtamento com e sem autenticação
* ✅ Associação de URLs a usuários autenticados
* ✅ CRUD de URLs com soft delete
* ✅ Redirecionamento e contagem de cliques
* ✅ Docker + Docker Compose funcional
* ✅ Maturidade REST nível 2
* ✅ README com instruções e pontos de escalabilidade
* ✅ Validações de entrada com decorators (`class-validator`)
* ✅ Documentação completa com Swagger (`/api`)
⚠️ Testes unitários implementados apenas para url.service

---

## 💡 Pontos para escalar horizontalmente

* Centralizar a configuração do Prisma para conexões concorrentes
* Implementar logs estruturados

---

## ⚠️ Considerações finais

O projeto foi entregue com foco em clareza, estrutura e extensão realista.
