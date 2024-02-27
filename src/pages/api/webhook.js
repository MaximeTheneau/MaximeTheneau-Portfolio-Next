import { spawn } from 'child_process';
import { createHmac } from 'crypto';

export default async function handler(req, res) {
  const authToken = process.env.AUTH_TOKEN;

  const signature = req.headers['X-Hub-Signature-256'];
  const body = JSON.stringify(req.body);
  
  const hmac = createHmac('sha256', authToken);
  hmac.update(body);
  const calculatedSignature = `sha256=${hmac.digest('hex')}`;

  if (signature !== calculatedSignature) {
    res.status(401).send(signature);
    
    return;
  }

  const branch = 'main'; 
  const gitStash = spawn('git', ['stash']);

  gitStash.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  const gitPull = spawn('git', ['pull', 'origin', branch]);

  gitPull.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  gitPull.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  gitPull.on('close', (code) => {
    if (code === 0) {
      console.log('Git pull successful :).');
      res.status(200).send('Git pull successful :).');

    } else {
      console.error(`Git pull failed with code ${code}`);
      res.status(500).send(`Git pull failed with code ${code}`);
    }
  });
}
