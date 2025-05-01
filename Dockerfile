# Imagem base oficial do Node
FROM node:20

# Diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos de dependência
COPY app/package*.json ./

# Define ambiente como produção e instala só o necessário
ENV NODE_ENV=production
RUN npm install --omit=dev

# Copia o restante do projeto
COPY app .

# Compila a aplicação
RUN npm run build

# Expõe a porta padrão
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]
