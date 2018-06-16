FROM node:6
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9001
CMD [ "npm", "start" ]
ENV NODE_ENV=production
