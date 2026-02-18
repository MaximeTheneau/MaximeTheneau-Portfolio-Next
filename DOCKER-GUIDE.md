# Guide Docker - Portfolio Next.js

## Prérequis

- [Docker Desktop pour Mac](https://www.docker.com/products/docker-desktop/) installé et lancé

## Fichiers créés

| Fichier | Description |
|---------|-------------|
| `Dockerfile` | Build multi-stage (Node.js → Nginx) |
| `docker-compose.yml` | Orchestration du container |
| `nginx.conf` | Configuration du serveur web |
| `.dockerignore` | Fichiers exclus du build |

## Lancer l'application

### Option 1 : Une seule commande (recommandé)

```bash
docker compose up --build -d
```

L'application sera accessible sur **http://localhost:3000**

### Option 2 : Via Docker Desktop

1. Ouvrir **Docker Desktop**
2. Aller dans l'onglet **Images**
3. Cliquer sur **Build** ou utiliser le terminal intégré
4. Exécuter : `docker compose up --build -d`

## Commandes utiles

| Action | Commande |
|--------|----------|
| Lancer | `docker compose up -d` |
| Lancer + rebuild | `docker compose up --build -d` |
| Arrêter | `docker compose down` |
| Voir les logs | `docker compose logs -f` |
| Reconstruire | `docker compose build --no-cache` |
| Statut | `docker compose ps` |

## Arrêter l'application

```bash
docker compose down
```

## Vérifier que ça fonctionne

```bash
curl http://localhost:3000
```

Ou ouvrir **http://localhost:3000** dans le navigateur.

## Architecture

```
┌─────────────────────────────────────────┐
│           Docker Container              │
│  ┌───────────────────────────────────┐  │
│  │         Nginx (port 3000)         │  │
│  │    Sert les fichiers statiques    │  │
│  │         depuis /out               │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                    │
                    ▼
            http://localhost:3000
```

## Troubleshooting

### Le port 3000 est déjà utilisé

```bash
# Trouver le processus
lsof -i :3000

# Ou changer le port dans docker-compose.yml
ports:
  - "3001:3000"  # Accessible sur localhost:3001
```

### Erreur de build

```bash
# Nettoyer et reconstruire
docker compose down
docker system prune -f
docker compose up --build -d
```
