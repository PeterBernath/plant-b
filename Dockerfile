FROM mhart/alpine-node:12

WORKDIR /srv

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
