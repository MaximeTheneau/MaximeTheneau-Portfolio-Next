import { spawn } from 'child_process';
import { createHmac } from 'crypto';

export default async function handler(req, res) {
  const authToken = process.env.AUTH_TOKEN;

  const signature = req.headers['x-hub-signature-256'];
  const body = JSON.stringify(req.body);
  
  console.log(signature);
  const hmac = createHmac('sha256', authToken);
  hmac.update(body);
  const calculatedSignature = `sha256=${hmac.digest('hex')}`;

  if (signature !== calculatedSignature) {
    res.status(401).send('Signature mismatch. Request not from GitHub.');
    return;
  }

  const branch = 'main'; 
  const gitPull = spawn('git', ['pull', 'origin', branch]);
  console.log('Requête HTTP entrante :');
  console.log(req.method); // Méthode HTTP (GET, POST, etc.)
  console.log(req.url); // URL demandée
  console.log(req.headers);
  console.log(req.headers['x-hub-signature-256']); // En-têtes de la requête HTTP
  console.log(req.httpVersion); 
  // if (token !== `Bearer ${authToken}`) {
  //   res.status(401).send('Non autorisé');
  //   return;
  // }
  gitPull.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  gitPull.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  gitPull.on('close', (code) => {
    if (code === 0) {
      console.log('Git pull successful :).');
      res.status(200).send(  authToken);

    } else {
      console.error(`Git pull failed with code ${code}`);
      res.status(500).send(`Git pull failed with code ${code}`);
    }
  });
}
