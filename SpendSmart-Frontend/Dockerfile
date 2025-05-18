# Build stage
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (default React port)
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 