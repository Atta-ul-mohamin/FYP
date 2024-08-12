# Use an official Node.js image as the base
FROM node:16

# Set working directory
WORKDIR /app

# Install necessary global dependencies
RUN npm install -g parse-server

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of your application code
COPY . .

# Expose ports for Parse Server
EXPOSE 1336 1337

# Set environment variables (you can also use Render's dashboard to set these)
ENV databaseURI=postgres://postgres:myPassword@postgres-db:5432/myDatabase
ENV appId=myAppId
ENV masterKey=myMasterKey
ENV serverURL=http://localhost:1337/parse
ENV port=1336

# Command to start the server
CMD parse-server --appId $appId --masterKey $masterKey --databaseURI $databaseURI --serverURL $serverURL & node app.js
