# Construcción de la app
# -----------------------------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

 
# app con nginx
# -----------------------------
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
#puerto de uso 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# Construir la imagen 
#    docker build -t sesame-juancueli .

# Ejecutar el contenedor del 80 al 8080
#    docker run -it -p 8080:80 sesame-juancueli

# Abrir en el navegador:
#    http://localhost:8080
