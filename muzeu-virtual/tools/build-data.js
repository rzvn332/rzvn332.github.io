#!/usr/bin/env node
/* Agregheaza sursele editabile din Pages CMS (content/) in fisierele citite de site.
 * Rulare locala:  node tools/build-data.js
 * Rulare automata: .github/workflows/build-data.yml la fiecare push pe content/**, data/*.json
 * Surse:  content/sali/*.json, content/obiecte/*.json, content/raioane/*.json,
 *         data/muzeu.json, data/trasee.json, data/quiz.json
 * Artefacte: data/obiecte.json, data/raioane.json, js/data.js, js/raioane.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const readJSON = (p, fallback) => {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { if (fallback !== undefined) return fallback; throw e; }
};
const listJSON = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .sort()
    .map(f => readJSON(path.join(dir, f)));
};

const sali = listJSON(path.join(root, 'content', 'sali'));
const obiecte = listJSON(path.join(root, 'content', 'obiecte'))
  .sort((a, b) => ((a.ordine ?? 9999) - (b.ordine ?? 9999)) || String(a.id).localeCompare(String(b.id)));
const raioane = listJSON(path.join(root, 'content', 'raioane'));
const muzeu = readJSON(path.join(root, 'data', 'muzeu.json'), { nume: 'Muzeul Scolar', subtitlu: '', sunet: true });
const trasee = readJSON(path.join(root, 'data', 'trasee.json'), []);
const quiz = readJSON(path.join(root, 'data', 'quiz.json'), []);

// Validari minime (nu opresc build-ul, doar avertizeaza)
const ids = new Set();
for (const o of obiecte) {
  if (!o.id || !/^[a-z0-9-]+$/.test(o.id)) console.warn('WARN obiect cu id invalid:', o.id);
  if (ids.has(o.id)) console.warn('WARN id duplicat:', o.id);
  ids.add(o.id);
  if (!o.titlu) console.warn('WARN obiect fara titlu:', o.id);
  if (!o.sala) console.warn('WARN obiect fara sala:', o.id);
}

const siteObiecte = { muzeu, sali, obiecte, trasee, quiz };
const siteRaioane = { raioane };

fs.writeFileSync(path.join(root, 'data', 'obiecte.json'), JSON.stringify(siteObiecte, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'data', 'raioane.json'), JSON.stringify(siteRaioane, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'js', 'data.js'), 'const MUZEU = ' + JSON.stringify(siteObiecte, null, 2) + ';\n');
fs.writeFileSync(path.join(root, 'js', 'raioane.js'), 'const RAIOANE = ' + JSON.stringify(siteRaioane, null, 2) + ';\n');

console.log(`OK: ${sali.length} sali, ${obiecte.length} obiecte, ${raioane.length} raioane -> data/obiecte.json, data/raioane.json, js/data.js, js/raioane.js`);
