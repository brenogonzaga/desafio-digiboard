
FROM node:latest

WORKDIR /back

COPY package*.json ./
RUN npm install


COPY . .

RUN npm run build

CMD ["node", "dist/main"]