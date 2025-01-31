FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the default Angular port
EXPOSE 4200

# Run the Angular app
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]