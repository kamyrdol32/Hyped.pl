# Image
FROM node:alpine as builder

# Work directory
WORKDIR /frontend

# Requirements
COPY package*.json ./

# Installations
RUN npm install -g npm@latest

# Export environment variables
ENV NODE_OPTIONS="--openssl-legacy-provider"

# Copy source code
COPY ./ ./

# Expose
EXPOSE 3000

# Run
RUN npm start


## Build
#RUN npm run build
#
#
## Image Nginx
#FROM nginx:alpine
#
## Copy build
#COPY --from=builder /frontend/build /usr/share/nginx/html
#
## Expose port
#EXPOSE 80