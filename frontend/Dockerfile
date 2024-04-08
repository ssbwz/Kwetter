# Stage 1: Download dependencies
FROM node:14 AS dependencies-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Build the application
FROM dependencies-stage AS build-stage
COPY . .
RUN npm run build

# Stage 3: Production stage
FROM build-stage AS production-stage
EXPOSE 3000
CMD ["npm", "start"]
