# Usa imagem oficial do Node
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Insatala netcat no container pra esperar db subir
RUN apt-get update && apt-get install -y netcat-openbsd

# Copia arquivos de dependência
COPY package*.json ./

# Define ambiente de produção e instala só dependências necessárias
ENV NODE_ENV=production
RUN npm install --omit=dev

# Copia o restante do projeto
COPY . .

# Compila o projeto (gera /dist)
RUN npm run build && npx prisma generate --schema=./prisma/schema.prisma

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Expõe a porta padrão da aplicação
EXPOSE 3000

# Inicia a aplicação compilada
CMD ["./entrypoint.sh"]
