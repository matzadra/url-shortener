# Usa imagem oficial do Node
FROM node:20

# Cria pasta de trabalho
WORKDIR /app

# Copia apenas o package.json e package-lock.json da pasta app
COPY app/package*.json ./

# Instala dependências
RUN npm install

# Copia todo o projeto da pasta app
COPY app .

# Builda o projeto NestJS (gera /dist)
RUN npm run build

# Expor a porta usada pelo app
EXPOSE 3000

# Rodar o app compilado
CMD ["node", "dist/main"]
