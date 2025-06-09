FROM node:22.11.0-alpine

ARG NEXT_PUBLIC_API_BASE
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE
ENV NEXTJS_IGNORE_ESLINT=1
ENV NEXTJS_DISABLE_TYPECHECK=1

RUN npm install -g yarn@1.22.22 --force

WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build || true

EXPOSE 3000

CMD ["yarn", "start"]
