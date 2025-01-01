FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN --mount=type=secret,id=BACKEND_URL,env=BACKEND_URL \
    npm run build
RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

FROM gcr.io/distroless/nodejs22:nonroot

WORKDIR /app

COPY --from=build --chown=nonroot:nonroot /app/.next/standalone ./

ENTRYPOINT [ "/nodejs/bin/node", "server.js" ]