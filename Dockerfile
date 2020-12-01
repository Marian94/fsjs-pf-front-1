FROM node:12-alpine
WORKDIR /app
COPY package.json .
RUN while true; do npm install && break; done
COPY . .
RUN npm install react-scripts@3.4.1 -g --silent
ENTRYPOINT [ "npm", "run" ]
CMD ["start"]
