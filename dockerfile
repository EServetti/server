FROM node

WORKDIR /e-commerce-proyect

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD [ "npm", "start" ]