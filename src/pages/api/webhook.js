import { spawn } from 'child_process';

export default async function handler(req, res) {
  const branch = 'main'; // La branche que vous souhaitez mettre à jour
  const gitPull = spawn('git', ['pull', 'origin', branch]);

  gitPull.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  gitPull.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  gitPull.on('close', (code) => {
    if (code === 0) {
      console.log('Git pull successful.');
      res.status(200).send('Git pull successful.');
    } else {
      console.error(`Git pull failed with code ${code}`);
      res.status(500).send(`Git pull failed with code ${code}`);
    }
  });
}
