# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json pnpm-lock.yaml* ./

# Installer pnpm et les dépendances
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copier le reste des fichiers
COPY . .

# Build de l'application
RUN pnpm run build

# Stage 2: Serveur de production
FROM nginx:alpine AS production

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés depuis le stage builder
COPY --from=builder /app/out /usr/share/nginx/html

# Exposer le port 3000
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
