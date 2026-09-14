# Harta Muzeelor Școlare + Muzeul pe raioane și sate — ghid

## Site-ul (o singură pagină: `muzeu.html`)
- **Poarta e harta**: Harta Muzeelor Republicii Moldova (zoom `+`/`-`, pan cu degetul, pinch). Click pe raionul pilot (Chișinău) → ușile se deschid spre muzeul raionului. Celelalte raioane arată „în curând”.
- Muzeul: sus sălile (+ buton **← HARTA** care închide ușile și arată iar harta), la mijloc caruselul cu rame, jos raionul și satul.
- Panoul **SATELE** (chip jos, lângă sunet) deschide fereastra cu sate pe stânga. Butonul **DESCHIDE DOSARUL** închide satele și deschide dosarul pe dreapta.

## Cum schimbi pozele demo cu cele reale
1. Pune pozele în folderul `images/`, ex: `images/clopotel-1.jpg`, `images/clopotel-2.jpg`
   (nume fără spații și fără diacritice).
2. În `data/obiecte.json`, la obiectul respectiv, înlocuiește lista:
   `"imagini": ["images/clopotel-1.jpg", "images/clopotel-2.jpg", "images/clopotel-3.jpg"]`
3. Regenerează `js/data.js` (o singură comandă, din folderul muzeului):
```
python3 -c "import json; d=json.load(open('data/obiecte.json',encoding='utf-8')); open('js/data.js','w',encoding='utf-8').write('const MUZEU = '+json.dumps(d,ensure_ascii=False,indent=2)+';')"
```
4. Refresh în browser. Prima poză din listă apare și în carusel.

## Cum adaugi un obiect nou
Copiază un bloc `{...}` din `data/obiecte.json`, schimbă `id`-ul (unic, fără spații),
pune `sala` una din cele 6 (`sala-documentelor`, `sala-scolii`, `sala-naturii`,
`sala-mestesugurilor`, `sala-gospodariei`, `sala-marturiilor`), pune `raion` (ex: `chisinau`) și
`sat` (ex: `truseni`, sau `null` dacă e al întregului raion), scrie povestea la
persoana I, completează `autor` (cine a scris fișa; apare în dosar la „Autor")
și lista `imagini` (maxim 5, prima apare și în carusel). Codul articolului
(`#00001`, `#00002`…) se generează singur din ordinea obiectelor în fișier —
obiectele noi puse la final primesc automat următorul număr. Regenerează `data.js` ca mai sus. Rama i se atribuie singură.

## Cum adaugi un sat / raion nou
Toate raioanele, municipiile, Găgăuzia și Transnistria sunt deja pilot, fiecare
cu lista completă de orașe și sate (verificată după CUATM). În
`data/raioane.json`, la raionul respectiv, poți adăuga în lista `sate`:
`{"id": "nume-scurt", "nume": "Nume Sat"}`, apoi regenerează `js/raioane.js`:
```
python3 -c "import json; d=json.load(open('data/raioane.json',encoding='utf-8')); open('js/raioane.js','w',encoding='utf-8').write('const RAIOANE = '+json.dumps(d,ensure_ascii=False,indent=2)+';')"
```
Pentru un raion nou complet: schimbă `stare` din `curand` în `pilot` și scrie satele lui.

## Culorile sălilor (perete + podea)
Fiecare sală are culorile ei în `data/obiecte.json`, la sala respectivă:
`perete` (peretele) și `lambriu` (podeaua/brâul de jos). Alege tonuri
medii-saturate (fundalul le mai închide singur); după modificare regenerează
`js/data.js` ca mai sus. Spotul de lumină și praful se iau din `css/muzeu.css`
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
