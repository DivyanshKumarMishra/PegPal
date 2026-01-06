FROM node:latest

WORKDIR /pegpal_server

COPY package*.json  ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]


# docker build -t pegpal_server_image .
# docker run -d --rm --name "pegpal_server_container" -p 3001:3001 -e PORT=3001 -e ORIGINS="http://localhost:3000,http://localhost:5173" -e JWT_SECRET="K6Alo5Ujy6F1N6a0QCWIqX+RyNzeyMxSd8GI6Io75rA=" -e DATABASE_URL="postgresql://postgres.zvnxuyhicdudobelzjom:B1RHzKZ4TbHGtmey@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true" -e DIRECT_URL="postgresql://postgres.zvnxuyhicdudobelzjom:B1RHzKZ4TbHGtmey@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres" --network "pegpal_network" pegpal_server_image:latest