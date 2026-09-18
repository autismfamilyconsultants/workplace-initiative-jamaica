import fs from 'node:fs';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

fs.writeFileSync(
  'static/config.js',
  `window.SUPABASE_CONFIG = ${JSON.stringify({ url, anonKey })};\n`
);
