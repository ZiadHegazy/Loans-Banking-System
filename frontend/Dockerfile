# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Define the command to run your app using CMD which runs npm start
CMD ["npm", "start"]
