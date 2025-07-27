FROM node:22.16-alpine3.21

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN ls -la

EXPOSE 80

CMD [ "pnpm", "dev", "--port", "80" ]
