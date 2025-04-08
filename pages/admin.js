import { useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SoundWatcher() {
  const lastIdRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkNewSubmissions = async () => {
      const { data, error } = await supabase
        .from('submissions')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data?.id && data.id !== lastIdRef.current) {
        if (ready) {
          const audio = new Audio('/notify.mp3');
          audio.play();
        }
        lastIdRef.current = data.id;
      }
    };

    const interval = setInterval(checkNewSubmissions, 5000);
    setReady(true);

    return () => clearInterval(interval);
  }, [ready]);

  return (
    <div style={{ background: '#000', color: '#0f0', fontFamily: 'monospace', padding: 20 }}>
      <h2>🔔 Admin Sound Watcher</h2>
      <p>Sound will play on this Mac when new submission is detected.</p>
    </div>
  );
}

