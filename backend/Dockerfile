# 1️⃣ Use official Node image
FROM node:20-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package files first (better caching)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy rest of the code
COPY . .

# 6️⃣ Expose backend port
EXPOSE 5002

# 7️⃣ Start the server
CMD ["npm", "run", "dev"]