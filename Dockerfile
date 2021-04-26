FROM node:latest
                                                  
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000
EXPOSE 3001
EXPOSE 3000

CMD [ "node", "getData.js" ]
