## USA VERSÃO 20.18 DO NODE
FROM node:20.18.0

## DEFINE O DIRETÓRIO
WORKDIR /backend

COPY package*.json ./
RUN npm install 

COPY . .


# PRA USAR NODEMON NO MODO DEV
# PARA TESTE VIA NODEMON, SUBSTITUA PARA ( CMD ["npm", "run", "dev"] )
# ESSE É O COMANDO DE PROD 
CMD ["npm", "run", "dev"]

EXPOSE 3000