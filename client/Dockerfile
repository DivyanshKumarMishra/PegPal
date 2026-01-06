FROM node:latest

WORKDIR /pegpal_client

COPY package*.json .

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# docker build -t pegpal_client_image .
# docker run -d --rm --name "pegpal_client_container" -p 3000:3000 -e SERVER_URL="http://pegpal_server_container:3001" pegpal_client_image:latest