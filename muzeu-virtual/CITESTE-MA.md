# Harta Muzeelor Școlare + Muzeul pe raioane și sate — ghid

## Site-ul (o singură pagină: `muzeu.html`)
- **Poarta e harta**: Harta Muzeelor Republicii Moldova (zoom `+`/`-`, pan cu degetul, pinch). Click pe raionul pilot (Chișinău) → ușile se deschid spre muzeul raionului. Celelalte raioane arată „în curând”.
- Muzeul: sus sălile (+ buton **← HARTA** care închide ușile și arată iar harta), la mijloc caruselul cu rame, jos raionul și satul.
- Panoul **SATELE** (chip jos, lângă sunet) deschide fereastra cu sate pe stânga. Butonul **DESCHIDE DOSARUL** închide satele și deschide dosarul pe dreapta.

## Cum editezi totul din Pages CMS (recomandat)

1. Urcă proiectul pe GitHub și conectează repo-ul la https://pagescms.org (GitHub App).
2. Configul e deja la rădăcină: `.pages.yml`. Din CMS editezi:
   - **🏺 Obiecte**: `content/obiecte/<id>.json` — fiecare articol cu locație (`locatie_fizica`),
     sală, poze (`imagine` + galerie `imagini`, max 5), descriere (`descriere_scurta` + `poveste`),
     raion/sat, perioadă, material, donator, autor, etichete, expunere, vedetă, ordine (`#0000x`).
   - **🏛️ Săli**: `content/sali/<id>.json` — nume, descriere, culori `perete`/`lambriu`, invitație.
   - **🗺️ Raioane, municipii și sate**: `content/raioane/<id>.json` — stare `pilot`/`curand`,
     lista `sate` (vezi / adaugă / ștergi satele fiecărui raion).
   - **🔤 Textele site-ului**: `data/texte.json` — pagina principală cu hartă, navigare, carusel,
     dosar, panoul satelor, cartușul sălii (#cartus-sala), subsol, tipuri, erori.
   - **⚙️ Setări / 🧭 Trasee / ❓ Quiz**: `data/muzeu.json`, `data/trasee.json`, `data/quiz.json`.
3. La fiecare salvare, GitHub Action (`build-data.yml`) regenerează automat
   `data/obiecte.json`, `data/raioane.json`, `js/data.js`, `js/raioane.js`. Site-ul citește
   `data/*.json` direct (fetch) — nu mai e nevoie de comenzi manuale.
4. Pozele noi se urcă din CMS în `images/` (nume fără spații/diacritice). URL-urile vechi
   externe (picsum) continuă să meargă — câmp mixt.

## Metoda raion → sat în dosare (de ce satul e câmp text)

Pages CMS hosted nu are dropdown dependent (ar cere CMS self-hosted cu câmp custom).
De aceea fluxul e în 2 pași: alegi **raionul** (listă completă, cu căutare), apoi copiezi
**ID-ul satului** din fișierul raionului (🗺️ Raioane → raionul ales → lista sate).
La fiecare build se verifică automat că satul există în raionul ales; greșelile apar ca
`WARN ... nu exista in raionul ...` în log (local sau GitHub Action). Gol = exponat al
întregului raion. Câmpul **sală** e referință dinamică: sălile noi apar automat în listă.

## Cum schimbi pozele demo cu cele reale (manual, fără CMS)
1. Pune pozele în folderul `images/`, ex: `images/clopotel-1.jpg`, `images/clopotel-2.jpg`
   (nume fără spații și fără diacritice).
2. În `content/obiecte/<id>.json`, la obiectul respectiv, înlocuiește lista:
   `"imagini": ["images/clopotel-1.jpg", "images/clopotel-2.jpg", "images/clopotel-3.jpg"]`
3. Regenerează artefactele (o singură comandă, din folderul muzeului):
```
node tools/build-data.js
```
4. Refresh în browser. Prima poză din listă apare și în carusel.

## Cum adaugi un obiect nou (manual, fără CMS)
Copiază `content/obiecte/clopotel-arama.json` într-un fișier nou, schimbă `id`-ul (unic, fără spații),
pune `sala` una din cele 6 (`sala-documentelor`, `sala-scolii`, `sala-naturii`,
`sala-mestesugurilor`, `sala-gospodariei`, `sala-marturiilor`), pune `raion` (ex: `chisinau`) și
`sat` (ex: `truseni`, sau `null` dacă e al întregului raion), scrie povestea la
persoana I, completează `autor` (cine a scris fișa; apare în dosar la „Autor")
și lista `imagini` (maxim 5, prima apare și în carusel). Codul articolului
(`#00001`, `#00002`…) se generează singur din câmpul `ordine` —
obiectele noi primesc următorul număr liber (ex: `16`). Regenerează cu
`node tools/build-data.js` ca mai sus. Rama i se atribuie singură.

## Cum adaugi un sat / raion nou (manual, fără CMS)
Toate raioanele, municipiile, Găgăuzia și Transnistria sunt deja pilot, fiecare
cu lista completă de orașe și sate (verificată după CUATM). În
`content/raioane/<id>.json`, la raionul respectiv, poți adăuga în lista `sate`:
`{"id": "nume-scurt", "nume": "Nume Sat"}`, apoi regenerează cu
`node tools/build-data.js` ca mai sus.
Pentru un raion nou complet: schimbă `stare` din `curand` în `pilot` și scrie satele lui.

## Culorile sălilor (perete + podea)
Fiecare sală are culorile ei în `content/sali/<id>.json`:
`perete` (peretele) și `lambriu` (podeaua/brâul de jos). Alege tonuri
medii-saturate (fundalul le mai închide singur); după modificare regenerează
cu `node tools/build-data.js` ca mai sus. Spotul de lumină și praful se iau din `css/muzeu.css`
(regulile `body[data-sala=...]`) și din harta `prafuri` din `js/muzeu.js`.

## Linkuri directe (pot fi puse în QR-uri pentru vitrine)
Poți genera gratuit un QR (ex. pe qr-code-generator.com) către adresa obiectului:
`muzeu.html?obiect=minge-1985` — deschide direct fereastra lui.
După ce urci site-ul pe net (Vercel/Netlify, gratuit), folosește adresa reală.

## Linkuri directe
- Muzeul unui raion: `muzeu.html?raion=chisinau`
- Un sat: `muzeu.html?raion=chisinau&sat=truseni`
- O sală: `muzeu.html?raion=chisinau#sala=sala-naturii`
- Un obiect: `muzeu.html?obiect=minge-1985`
