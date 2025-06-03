FROM node:22.11.0-alpine

RUN npm install -g yarn@1.22.22 --force

WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# Expose the port your dev server listens on (commonly 3000)
EXPOSE 3000

CMD ["yarn", "dev"]
