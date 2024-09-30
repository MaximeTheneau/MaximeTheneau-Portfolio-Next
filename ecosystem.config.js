module.exports = {
  apps: [
    {
      name: 'theneaumaxime.fr',
      script: 'pnpm',
      args: 'run',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production', // Environnement de production
        PORT: '3002',
      },
    },
  ],
};
