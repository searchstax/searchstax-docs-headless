FROM node:lts-alpine
ENV NODE_ENV development

# Set working directory
WORKDIR /app

COPY package.json /app/package.json

RUN yarn

COPY . /app

ENV CI=true
EXPOSE 3006

CMD ["yarn", "dev"]
