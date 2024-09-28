# Usar uma imagem base do Node.js
FROM node:18-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar todos os arquivos da aplicação para o diretório de trabalho
COPY . .

# Gerar o Prisma Client
RUN npx prisma generate

# Compilar o código TypeScript
RUN npm run build

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
