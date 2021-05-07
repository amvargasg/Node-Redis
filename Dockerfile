FROM node:15
                                                  
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6379
EXPOSE 5000


CMD [ "node", "getData.js" ]
