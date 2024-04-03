# Use a imagem nginx como base
FROM nginx:alpine

# Copie os arquivos do projeto para o diretório de trabalho padrão do Nginx
COPY . /usr/share/nginx/html

# Exponha a porta 80 para acesso externo
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]