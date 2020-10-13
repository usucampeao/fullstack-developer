FROM node:14 As development
WORKDIR /home/node/usucampeao_api
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]