# Use a imagem base
FROM node:16-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos do código-fonte do backend para o diretório de trabalho do contêiner
COPY backend ./backend

# Instale as dependências do backend
WORKDIR /usr/src/app/backend
RUN npm install

# Exponha a porta do aplicativo
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD [ "node", "app.js" ]