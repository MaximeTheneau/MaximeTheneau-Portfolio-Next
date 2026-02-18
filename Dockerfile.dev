FROM node:20-alpine

WORKDIR /app

# Installer pnpm
RUN npm install -g pnpm

# Copier les fichiers de dépendances
COPY package.json pnpm-lock.yaml* ./

# Installer les dépendances
RUN pnpm install

# Le code source sera monté en volume
EXPOSE 3000

CMD ["pnpm", "run", "dev"]
