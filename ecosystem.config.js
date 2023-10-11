module.exports = {
    apps: [
      {
        name: 'theneaumaxime.fr', // Nom de l'application
        script: 'npm',    // Commande à exécuter
        args: 'start',    // Argument de la commande (start)
        instances: 1,     // Nombre d'instances (1 pour l'exemple)
        autorestart: true, // Redémarrage automatique
        watch: false,      // Désactiver la surveillance des modifications
        max_memory_restart: '1G', // Redémarrage en cas d'utilisation mémoire excessive
        env: {
          NODE_ENV: 'production' // Environnement de production
        }
      }
    ]
  };