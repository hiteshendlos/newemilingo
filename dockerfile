# Use an official Node.js runtime as a parent image
FROM node:alpine

# # Install yarn globally
# RUN npm install -g yarn

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY . .

# Install app dependencies using yarn
RUN yarn

# Build the Next.js application
RUN yarn build

# Set the command to start the server
CMD ["yarn", "start"]