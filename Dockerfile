# Stage 1 - building the code
FROM node:10.16.2-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

# Stage 2
WORKDIR ./dist

EXPOSE 80
CMD npm run start:prod


