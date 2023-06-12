# Defina a imagem base do Docker
FROM node:18

# Crie uma pasta para o projeto
RUN mkdir -p /app

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o conteúdo do projeto para a pasta do container
COPY . /app

# Instale as dependências do projeto
RUN npm install
# Exponha a porta necessária para o seu projeto
EXPOSE 4421

# Comando para iniciar o projeto
CMD ["npm", "run", "dev"]
