// Ology — M0 local dev server
// Serves the mockup + program output view for local OBS testing.
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const PUBLIC = path.join(__dirname);

// Permissive headers so OBS's embedded Chromium (CEF) loads cleanly.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store'); // always serve fresh during dev
  next();
});

app.use(express.static(PUBLIC, { extensions: ['html'] }));

// Explicit routes (nice-to-have aliases)
app.get('/', (_req, res) => res.sendFile(path.join(PUBLIC, 'index.html')));
app.get('/output', (_req, res) => res.sendFile(path.join(PUBLIC, 'output.html')));

app.listen(PORT, () => {
  console.log('\n  Ology M0 dev server');
  console.log('  ───────────────────────────────────────────');
  console.log('  Controller (Stage + Mobile): http://localhost:' + PORT + '/');
  console.log('  OBS Program Output view:      http://localhost:' + PORT + '/output.html?ar=16:9&res=1080&fps=30');
  console.log('  ───────────────────────────────────────────');
  console.log('  Stop with Ctrl+C\n');
});
