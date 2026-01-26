# usa o node.js 20
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (para aproveitar o cache do Docker)
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Expõe a porta que o Next.js usa
EXPOSE 3000

# Comando para iniciar em modo de desenvolvimento
CMD ["npm", "run", "dev"]