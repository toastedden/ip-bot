# Use Node.js v22 LTS with Alpine as the base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only the package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run npm update each time the container is started to ensure dependencies are up to date
CMD npm install && node src/index.js