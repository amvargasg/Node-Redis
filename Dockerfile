FROM node:15
                                                  
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm update 

COPY . .

EXPOSE 3001
EXPOSE 8000


CMD [ "node", "getData.js" ]
