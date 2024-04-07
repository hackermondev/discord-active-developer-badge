# Stage 1: Build stage
FROM node:16 AS builder

# Set the working directory in the builder stage
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the builder stage
COPY package*.json ./

# Install npm dependencies in the builder stage
RUN npm install

# Copy the rest of the application code to the builder stage
COPY . .

# Stage 2: Production stage
FROM node:16-alpine

# Set the working directory in the production stage
WORKDIR /usr/src/app

# Copy the built artifacts from the builder stage to the production stage
COPY --from=builder /usr/src/app .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application in the production stage
CMD ["node", "index.js"]
