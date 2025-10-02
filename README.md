# PROJETO MULTIBUS

Em breve conteudo

## DEV Tips

Para inicializar de
```
npm install
npm install express pg dotenv
npm install nodemon -D
```

As portas do docker estão configuradas em "5433:5432" no db
e "3000:3000" para a api
Use esses comandos para ligar o serviço, também pode ser feito
pelo app do Docker
```
docker-compose up --build
```

E para desligar o serviço
``` 
docker-compose down -v
```

