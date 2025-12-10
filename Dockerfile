# Use Node.js as the base image
FROM node:18-alpine AS base

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to optimize layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to access the app in development mode
EXPOSE 3000

# Start the Next.js development server
CMD ["npm", "run", "dev"]
