ARG environment=prod
FROM node:18 as node
ARG environment
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build:${environment}

FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist /usr/share/nginx/html
