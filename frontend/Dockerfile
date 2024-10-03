# Use the official Node.js image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
