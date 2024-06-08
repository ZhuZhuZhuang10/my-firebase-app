FROM node:latest
WORKDIR /workspace
COPY src/ .
RUN npm install
CMD ["node", "server.js"]
