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
DATABASE_URL=postgresql://user:password@localhost:5432/shortener_db
JWT_SECRET=secreta
PORT=3000
```

---

## 📈 Scripts disponíveis

```bash
npm run start:dev       # Inicia o servidor em modo desenvolvimento
npm run test            # Roda os testes unitários (Jest ainda não implementado)
npm run test:e2e        # Roda os testes e2e (ainda não implementados)
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
* [ ] Testes unitários e2e
* [ ] Deploy cloud

---

## 📆 Branches principais

| Branch                       | Descrição                              |
| ---------------------------- | -------------------------------------- |
| `refactor/project-structure` | Setup inicial, Docker e estrutura base |
| `feature/auth-jwt`           | Autenticação completa via JWT          |
| `feature/urls-crud`          | CRUD de URLs + acesso opcional         |

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

> Estrutura para testes já configurada.

---

## 💡 Pontos para escalar horizontalmente

* Centralizar a configuração do Prisma para conexões concorrentes
* Cache de URLs curtas com Redis
* Separar domínio de users para microsserviço
* Adicionar rate limiter por IP/token
* Implementar logs estruturados e toggle de observabilidade via `.env`

---

## ⚠️ Considerações finais

O projeto foi entregue com foco em clareza, estrutura e extensão realista.
