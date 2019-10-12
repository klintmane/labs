FROM node:alpine

WORKDIR /app

# Copy npm files and install deps
COPY package*.json ./
RUN npm ci

# Copy project to WORKDIR
COPY . .

CMD [ "npm", "run" , "start" ]
