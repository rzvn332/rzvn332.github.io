const MUZEU = {
  "muzeu": {
    "nume": "Muzeul Liceului Alexandru cel Bun",
    "subtitlu": "Obiectele povestesc",
    "sunet": true
  },
  "texte": {
    "pagina_principala": {
      "titlu_harta": "HARTA MUZEELOR DIN REPUBLICA MOLDOVA",
      "subtitlu_harta": "Alege raionul și intră în muzeu",
      "text_buton_contribuie": "ADAUGĂ UN OBIECT ÎN COLECȚIA NOASTRĂ VIRTUALĂ",
      "mesaj_contribuie": "Mulțumim! Formularul de contribuire va fi disponibil în curând.",
      "template_mesaj_curand": "{tip} {nume} intră în curând în muzeu.",
      "titlu_pagina": "Muzeul Liceului Alexandru cel Bun — Anno MCMXXXII",
      "descriere_meta": "Muzeul virtual al Liceului Alexandru cel Bun: 5 săli, obiecte care povestesc. Intră în arhivă."
    },
    "navigare": {
      "inapoi_harta": "← HARTA",
      "titlu_inapoi": "Înapoi la harta Moldovei"
    },
    "carusel": {
      "prefix_fila": "FILA",
      "conector_din": "DIN",
      "gol_titlu": "Nu există încă obiecte aici.",
      "gol_subtitlu": "Alege alt sat sau adaugă primul exponat.",
      "gol_contor": "—"
    },
    "dosar": {
      "deschide": "DESCHIDE DOSARUL",
      "inchide": "ÎNCHIDE DOSARUL",
      "inchide_aria": "Închide dosarul",
      "inchide_titlu": "Sigilează dosarul",
      "fila_anterioara": "← Fila anterioară",
      "fila_urmatoare": "Fila următoare →",
      "mareste": "Mărește dosarul",
      "revino": "Revino la panoul lateral",
      "citeste_tot": "Citește toată descrierea ↓",
      "arata_putin": "Arată mai puțin ↑",
      "et_material": "Material",
      "et_dimensiuni": "Dimensiuni",
      "et_autor": "Autor",
      "et_locatie": "Locația obiectului",
      "conector_an": " · Anul ",
      "valoare_lipsa": "-",
      "prefix_imagine": "Imagine",
      "template_caption": "{titlu} · Imagine {k} din {n}",
      "alt_obiect": "Imagine obiect",
      "hint_fullscreen": "Deschide imaginea fullscreen",
      "alt_marita": "Imagine mărită",
      "vizor_inchide": "Închide imaginea",
      "vizor_anterioara": "Imaginea anterioară",
      "vizor_urmatoare": "Imaginea următoare"
    },
    "panou_sate": {
      "eticheta_selecteaza": "SELECTEAZĂ SATUL",
      "toate_satele": "Toate satele",
      "vezi_satele": "Vezi satele raionului",
      "template_schimba_satul": "Schimbi satul ({sat})",
      "inchide_lista": "Închide lista"
    },
    "cartus_sala": {
      "eticheta_detalii": "ⓘ DETALII",
      "prefix_sala": "SALA ",
      "antet_muzeu": "MUZEUL ȘCOLAR",
      "titlu_tipice": "CE OBIECTE POT FI AICI",
      "titlu_acum": "ÎN SALĂ ACUM",
      "text_un_obiect": "Un singur obiect te așteaptă aici:",
      "template_mai_multe": "{n} obiecte te așteaptă aici:",
      "gol_sala": "Sala e încă goală — prima poveste poate fi a ta.",
      "adauga_primul": "Adaugă primul obiect prin butonul de pe hartă"
    },
    "footer": {
      "nume_implicit": "Muzeul Liceului Alexandru cel Bun",
      "sunet_da": "SUNET: DA",
      "sunet_nu": "SUNET: NU",
      "titlu_buton_sunet": "Sunet arhivă pornit/oprit",
      "semnatura": "arhiva Bou Elena",
      "template_titlu_pagina": "{raion} — Muzeul Școlar",
      "template_titlu_pagina_sat": "{sat} · {raion} — Muzeul Școlar"
    },
    "tipuri": {
      "tip_municipiu": "Municipiul",
      "tip_autonomie": "Unitatea",
      "tip_raion": "Raionul",
      "fallback_nume_raion": "Chișinău"
    },
    "erori": {
      "titlu_date": "Nu s-au putut încărca datele muzeului.",
      "subtitlu_date": "Verifică data/obiecte.json și data/raioane.json."
    }
  },
  "sali": [
    {
      "id": "sala-documentelor",
      "nume": "Sala Documentelor",
      "icon": "📜",
      "perete": "#2b4f46",
      "lambriu": "#4f3d22",
      "descriere": "Acte, cataloage, hărți și fotografii. Amintiri pe hârtie.",
      "imagine": "https://picsum.photos/seed/sala-documente/800/500",
      "obiecte_tipice": [
        "Acte și adeverințe vechi",
        "Cataloage școlare",
        "Fotografii de familie",
        "Hărți și planuri",
        "Ziare și reviste de epocă",
        "Diplome și certificate"
      ],
      "invitatie": "Ai un act vechi, o fotografie de familie sau un catalog de la școala ta? Poveștește-ne despre el — devine filă în sala asta."
    },
    {
      "id": "sala-gospodariei",
      "nume": "Sala Gospodăriei",
      "icon": "🏺",
      "perete": "#7a5c22",
      "lambriu": "#7a5426",
      "descriere": "Vase, lămpi, ceasuri și aparate de odinioară. Casa bunicii.",
      "imagine": "https://picsum.photos/seed/sala-gospodarie/800/500",
      "obiecte_tipice": [
        "Vase și oale de fontă",
        "Lămpi cu petrol",
        "Ceasuri cu cuc",
        "Aparate radio vechi",
        "Monede și bancnote",
        "Fiere de călcat și samovare"
      ],
      "invitatie": "Casa bunicii e un muzeu întreg. Alege un obiect — lampa, ceasul, radio-ul — și spune-ne povestea lui."
    },
    {
      "id": "sala-marturiilor",
      "nume": "Sala Mărturiilor",
      "icon": "🕊️",
      "perete": "#4c2650",
      "lambriu": "#3a1f33",
      "descriere": "Scrisori de pe front, daruri și povești trăite.",
      "imagine": "https://picsum.photos/seed/sala-marturii/800/500",
      "obiecte_tipice": [
        "Scrisori de pe front",
        "Fotografii de război",
        "Medalii și insigne",
        "Jucării vechi",
        "Trofee și mingi",
        "Daruri de la absolvenți"
      ],
      "invitatie": "O scrisoare, o medalie, un trofeu — mărturiile trăite merită să fie auzite. Trimite-ne povestea ta."
    },
    {
      "id": "sala-mestesugurilor",
      "nume": "Sala Meșteșugurilor",
      "icon": "⚒️",
      "perete": "#6b3220",
      "lambriu": "#2a160e",
      "descriere": "Război de țesut, ceramică și costume. Mâinile bunicilor.",
      "imagine": "https://picsum.photos/seed/sala-mestesug/800/500",
      "obiecte_tipice": [
        "Costume populare",
        "Războaie de țesut",
        "Ceramică și oale",
        "Unelte de lemn",
        "Broderii și ștergare",
        "Coșuri împletite"
      ],
      "invitatie": "Ai în casă o țesătură, o oală pictată sau uneltele bunicului? Mâinile lor au povestit destul — lasă-ne pe noi să continuăm."
    },
    {
      "id": "sala-naturii",
      "nume": "Sala Naturii",
      "icon": "🌿",
      "perete": "#3d5c2a",
      "lambriu": "#37411f",
      "descriere": "Ierbare, pietre și microscoape. Cabinetul curioșilor.",
      "imagine": "https://picsum.photos/seed/sala-natura/800/500",
      "obiecte_tipice": [
        "Ierbare și plante presate",
        "Pietre și minerale",
        "Microscoape și lupe",
        "Panouri cu insecte",
        "Hărți de relief"
      ],
      "invitatie": "Ai un ierbar al bunicii sau o piatră adusă din excursii? Naturii îi stau bine poveștile trăite."
    },
    {
      "id": "sala-scolii",
      "nume": "Sala Școlii",
      "icon": "🎓",
      "perete": "#2a3a62",
      "lambriu": "#633917",
      "descriere": "Bănci, clopoțel și rechizite. Clasa de acum 50 de ani.",
      "imagine": "https://picsum.photos/seed/sala-scoala/800/500",
      "obiecte_tipice": [
        "Clopoțel de clasă",
        "Bănci și scaune vechi",
        "Abac și penare",
        "Manuale și caiete",
        "Aparate didactice",
        "Steme și diplome"
      ],
      "invitatie": "Păstrezi ceva de la școala ta — un clopoțel, un penar, o bancă? Adu-l în colecție cu povestea lui."
    }
  ],
  "obiecte": [
    {
      "id": "clopotel-arama",
      "titlu": "Clopoțelul de aramă, 1932",
      "ordine": 1,
      "sala": "sala-scolii",
      "perioada": "Interbelic",
      "an": "1932",
      "material": "Metal",
      "dimensiuni": "12 cm",
      "donator": "Familia înv. Ion Popescu",
      "autor": "",
      "locatie_fizica": "Sala 1, Vitrina A",
      "descriere_scurta": "Cu mine începeau toate orele, 1932-1989.",
      "poveste": "Eu sunt clopoțelul de aramă. 57 de ani am sunat la ora 8 fix. Am căzut pe scări în 1971 și am un mic semn — caută-l! Elevii mă ating și azi pentru noroc.",
      "imagine": "https://picsum.photos/seed/muzeu-clopotel/800/600",
      "etichete": [
        "vedetă",
        "sunet"
      ],
      "expunere": "soclu",
      "vedeta": true,
      "imagini": [
        "https://picsum.photos/seed/muzeu-clopotel-1/800/600",
        "https://picsum.photos/seed/muzeu-clopotel-2/800/600",
        "https://picsum.photos/seed/muzeu-clopotel-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "catalog-1974",
      "titlu": "Catalog 1974",
      "ordine": 2,
      "sala": "sala-documentelor",
      "perioada": "Comunism",
      "an": "1974",
      "material": "Hârtie",
      "dimensiuni": "A4, 48 pag.",
      "donator": "Arhiva școlii",
      "autor": "",
      "locatie_fizica": "Sala 1, Vitrina B",
      "descriere_scurta": "Note cu penița și o pagină ruptă misterios.",
      "poveste": "Eu sunt catalogul din '74. La pagina 21 lipsește un colț — legenda zice că un elev l-a rupt ca să scape de un 4. Am 32 de nume, trei au ajuns profesori aici.",
      "imagine": "https://picsum.photos/seed/muzeu-catalog/800/600",
      "etichete": [
        "document"
      ],
      "expunere": "rama",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-catalog-1/800/600",
        "https://picsum.photos/seed/muzeu-catalog-2/800/600",
        "https://picsum.photos/seed/muzeu-catalog-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "banca-lemn-1960",
      "titlu": "Banca cu călimară",
      "ordine": 3,
      "sala": "sala-scolii",
      "perioada": "Comunism",
      "an": "1960",
      "material": "Lemn",
      "dimensiuni": "110x45x75 cm",
      "donator": "Școala Veche",
      "autor": "",
      "locatie_fizica": "Sala 2, colț dreapta",
      "descriere_scurta": "Doi elevi, o călimară, mii de secrete.",
      "poveste": "Eu sunt banca. Pe spatele meu scrie M+E 1968 cu briceagul. În gaura mea stătea călimara cu cerneală. Stai 5 minute fără să te miști, ca atunci!",
      "imagine": "https://picsum.photos/seed/muzeu-banca/800/600",
      "etichete": [
        "mobilier"
      ],
      "expunere": "rama",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-banca-1/800/600",
        "https://picsum.photos/seed/muzeu-banca-2/800/600",
        "https://picsum.photos/seed/muzeu-banca-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "harta-1938",
      "titlu": "Harta România Mare",
      "ordine": 4,
      "sala": "sala-documentelor",
      "perioada": "Interbelic",
      "an": "1938",
      "material": "Hârtie+pânză",
      "dimensiuni": "150x120 cm",
      "donator": "Cancelaria",
      "autor": "",
      "locatie_fizica": "Sala 1, perete nord",
      "descriere_scurta": "Cea mai mare piesă din muzeu.",
      "poveste": "Eu sunt harta. Am văzut granițe desenate cu creionul peste mine. Petele sunt de la degetele care căutau orașele natale.",
      "imagine": "https://picsum.photos/seed/muzeu-harta/800/600",
      "etichete": [
        "hartă",
        "mare"
      ],
      "expunere": "rama",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-harta-1/800/600",
        "https://picsum.photos/seed/muzeu-harta-2/800/600",
        "https://picsum.photos/seed/muzeu-harta-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "costum-oltenesc",
      "titlu": "Costum oltenesc 1925",
      "ordine": 5,
      "sala": "sala-mestesugurilor",
      "perioada": "Interbelic",
      "an": "1925",
      "material": "Textil",
      "dimensiuni": "Mărime adult",
      "donator": "Bunica Mariei, VI-a",
      "autor": "",
      "locatie_fizica": "Sala 3, Manechin 1",
      "descriere_scurta": "Ie cusută 3 luni la lampă.",
      "poveste": "Eu sunt ia din 1925. Romburile mele sunt spice de grâu, pentru belșug. M-a cusut o fată de 16 ani pentru nuntă.",
      "imagine": "https://picsum.photos/seed/muzeu-costum/800/600",
      "etichete": [
        "port",
        "tradiție"
      ],
      "expunere": "rama",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-costum-1/800/600",
        "https://picsum.photos/seed/muzeu-costum-2/800/600",
        "https://picsum.photos/seed/muzeu-costum-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "microscop-1982",
      "titlu": "Microscop 1982",
      "ordine": 6,
      "sala": "sala-naturii",
      "perioada": "Comunism",
      "an": "1982",
      "material": "Metal+Sticlă",
      "dimensiuni": "28 cm",
      "donator": "Lab. biologie",
      "autor": "",
      "locatie_fizica": "Sala 4, Vitrina C",
      "descriere_scurta": "Funcționează și azi!",
      "poveste": "Eu sunt microscopul. Am o lentilă zgâriată de la o gumă de mestecat. Cere voie și privește o frunză prin mine!",
      "imagine": "https://picsum.photos/seed/muzeu-microscop/800/600",
      "etichete": [
        "știință"
      ],
      "expunere": "soclu",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-microscop-1/800/600",
        "https://picsum.photos/seed/muzeu-microscop-2/800/600",
        "https://picsum.photos/seed/muzeu-microscop-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "geoda-ametist",
      "titlu": "Geodă de ametist",
      "ordine": 7,
      "sala": "sala-naturii",
      "perioada": "Anii 2000",
      "an": "2005",
      "material": "Piatră",
      "dimensiuni": "2.3 kg",
      "donator": "Excursie Bușteni",
      "autor": "",
      "locatie_fizica": "Sala 4, Vitrina C",
      "descriere_scurta": "Gri pe-afară, violet înăuntru.",
      "poveste": "Eu sunt geoda. Nimeni nu m-a vrut că eram urâtă. Când m-au spart, toți au zis wow. Nu judeca piatra după copertă!",
      "imagine": "https://picsum.photos/seed/muzeu-ametist/800/600",
      "etichete": [
        "rocă",
        "preferata-copiilor"
      ],
      "expunere": "soclu",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-ametist-1/800/600",
        "https://picsum.photos/seed/muzeu-ametist-2/800/600",
        "https://picsum.photos/seed/muzeu-ametist-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "razboi-tesut",
      "titlu": "Război de țesut mini",
      "ordine": 8,
      "sala": "sala-mestesugurilor",
      "perioada": "Comunism",
      "an": "1970",
      "material": "Lemn",
      "dimensiuni": "60x40 cm",
      "donator": "Meșter Horezu",
      "autor": "",
      "locatie_fizica": "Sala 3, masă centrală",
      "descriere_scurta": "Țese semne de carte adevărate.",
      "poveste": "Eu sunt războiul mic. Am țesut peste 400 de semne de carte cu elevii. Vino să-ți faci unul!",
      "imagine": "https://picsum.photos/seed/muzeu-razboi/800/600",
      "etichete": [
        "interactiv"
      ],
      "expunere": "rama",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-razboi-1/800/600",
        "https://picsum.photos/seed/muzeu-razboi-2/800/600",
        "https://picsum.photos/seed/muzeu-razboi-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "aparat-proiectie",
      "titlu": "Proiector diafilme",
      "ordine": 9,
      "sala": "sala-scolii",
      "perioada": "Comunism",
      "an": "1978",
      "material": "Metal",
      "dimensiuni": "35x25 cm",
      "donator": "Cab. istorie",
      "autor": "",
      "locatie_fizica": "Sala 2, Vitrina D",
      "descriere_scurta": "Netflix-ul anilor '80.",
      "poveste": "Eu sunt proiectorul. Scârțâiam și pâlpâiam Capra cu trei iezi pe cearșaf alb. Toată clasa țipa de bucurie.",
      "imagine": "https://picsum.photos/seed/muzeu-proiector/800/600",
      "etichete": [
        "cinema"
      ],
      "expunere": "soclu",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-proiector-1/800/600",
        "https://picsum.photos/seed/muzeu-proiector-2/800/600",
        "https://picsum.photos/seed/muzeu-proiector-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "oala-horezu",
      "titlu": "Oală Horezu 1994",
      "ordine": 10,
      "sala": "sala-mestesugurilor",
      "perioada": "Anii 90",
      "an": "1994",
      "material": "Ceramică",
      "dimensiuni": "22 cm",
      "donator": "Tabăra olărit",
      "autor": "",
      "locatie_fizica": "Sala 3, Etajera 2",
      "descriere_scurta": "Puțin strâmbă, exact de-asta e unică.",
      "poveste": "Eu sunt oala. M-a modelat un copil de 11 ani. Cocoșul mi l-a pictat olarul, să-mi poarte noroc. Sunt patrimoniu UNESCO ca stil.",
      "imagine": "https://picsum.photos/seed/muzeu-oala/800/600",
      "etichete": [
        "ceramică"
      ],
      "expunere": "soclu",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-oala-1/800/600",
        "https://picsum.photos/seed/muzeu-oala-2/800/600",
        "https://picsum.photos/seed/muzeu-oala-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "penar-1950",
      "titlu": "Penar secret 1950",
      "ordine": 11,
      "sala": "sala-scolii",
      "perioada": "Comunism",
      "an": "1950",
      "material": "Lemn",
      "dimensiuni": "20x6 cm",
      "donator": "Găsit în pod",
      "autor": "",
      "locatie_fizica": "Sala 2, Vitrina D",
      "descriere_scurta": "Cu fund dublu pentru bilețele.",
      "poveste": "Eu sunt penarul. În fundul fals s-a găsit: „Mâine te aștept la poartă. V.” Cine era V.? Misterul muzeului.",
      "imagine": "https://picsum.photos/seed/muzeu-penar/800/600",
      "etichete": [
        "mister"
      ],
      "expunere": "rama",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-penar-1/800/600",
        "https://picsum.photos/seed/muzeu-penar-2/800/600",
        "https://picsum.photos/seed/muzeu-penar-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "ierbar-1965",
      "titlu": "Ierbar 1965",
      "ordine": 12,
      "sala": "sala-naturii",
      "perioada": "Comunism",
      "an": "1965",
      "material": "Hârtie",
      "dimensiuni": "30x42 cm",
      "donator": "Prof. Elena Ionescu",
      "autor": "",
      "locatie_fizica": "Sala 4, Sertar 1",
      "descriere_scurta": "40 de plante presate la 5 dimineața.",
      "poveste": "Eu sunt ierbarul. Una din orhideele mele sălbatice nu mai crește azi aici. Sunt dovada că natura se schimbă.",
      "imagine": "https://picsum.photos/seed/muzeu-ierbar/800/600",
      "etichete": [
        "botanică"
      ],
      "expunere": "rama",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-ierbar-1/800/600",
        "https://picsum.photos/seed/muzeu-ierbar-2/800/600",
        "https://picsum.photos/seed/muzeu-ierbar-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "scrisoare-1944",
      "titlu": "Scrisoare de pe front",
      "ordine": 13,
      "sala": "sala-marturiilor",
      "perioada": "Război",
      "an": "1944",
      "material": "Hârtie",
      "dimensiuni": "Plic + 2 pag.",
      "donator": "Fam. înv. Petre Dumitru",
      "autor": "",
      "locatie_fizica": "Sala 5, Vitrina E",
      "descriere_scurta": "„Aveți grijă de catalogul meu.”",
      "poveste": "Eu sunt scrisoarea. Scrisă cu creion chimic, pe genunchi, în tranșee. Învățătorul cerea copiilor să ude florile din clasă. S-a întors și a mai predat 30 de ani.",
      "imagine": "https://picsum.photos/seed/muzeu-scrisoare/800/600",
      "etichete": [
        "emoționant"
      ],
      "expunere": "rama",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-scrisoare-1/800/600",
        "https://picsum.photos/seed/muzeu-scrisoare-2/800/600",
        "https://picsum.photos/seed/muzeu-scrisoare-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "minge-1985",
      "titlu": "Mingea finalei 1985",
      "ordine": 14,
      "sala": "sala-marturiilor",
      "perioada": "Comunism",
      "an": "1985",
      "material": "Piele",
      "dimensiuni": "Nr. 5",
      "donator": "Echipa școlii",
      "autor": "",
      "locatie_fizica": "Sala 5, suport central",
      "descriere_scurta": "3-2 în min. 89, din corner direct.",
      "poveste": "Eu sunt mingea. Semnată de toată echipa, plină de petice. Golul meu din corner e legendă. Portarul advers zice și azi că a fost vântul.",
      "imagine": "https://picsum.photos/seed/muzeu-minge/800/600",
      "etichete": [
        "sport"
      ],
      "expunere": "soclu",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-minge-1/800/600",
        "https://picsum.photos/seed/muzeu-minge-2/800/600",
        "https://picsum.photos/seed/muzeu-minge-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    },
    {
      "id": "abac-rigla",
      "titlu": "Abac și riglă de calcul",
      "ordine": 15,
      "sala": "sala-scolii",
      "perioada": "Comunism",
      "an": "1972",
      "material": "Lemn+Plastic",
      "dimensiuni": "Diverse",
      "donator": "Cab. matematică",
      "autor": "",
      "locatie_fizica": "Sala 2, Vitrina D",
      "descriere_scurta": "Calculatoarele de dinainte de calculatoare.",
      "poveste": "Noi suntem abacul și rigla. Cu noi s-au proiectat poduri. Provocare: fă 7x8 pe abac mai repede decât colegul pe telefon!",
      "imagine": "https://picsum.photos/seed/muzeu-abac/800/600",
      "etichete": [
        "matematică",
        "provocare"
      ],
      "expunere": "rama",
      "vedeta": false,
      "imagini": [
        "https://picsum.photos/seed/muzeu-abac-1/800/600",
        "https://picsum.photos/seed/muzeu-abac-2/800/600",
        "https://picsum.photos/seed/muzeu-abac-3/800/600"
      ],
      "raion": "chisinau",
      "sat": null
    }
  ],
  "trasee": [
    {
      "id": "prima-vizita",
      "nume": "Prima vizită — 10 minute",
      "obiecte": [
        "clopotel-arama",
        "banca-lemn-1960",
        "harta-1938",
        "geoda-ametist",
        "costum-oltenesc",
        "minge-1985"
      ]
    },
    {
      "id": "comorile",
      "nume": "Comorile ascunse",
      "obiecte": [
        "penar-1950",
        "scrisoare-1944",
        "catalog-1974",
        "oala-horezu",
        "microscop-1982"
      ]
    }
  ],
  "quiz": [
    {
      "intrebare": "Câți ani a sunat clopoțelul în școală?",
      "optiuni": [
        "12 ani",
        "57 de ani",
        "100 de ani"
      ],
      "corect": 1,
      "obiectId": "clopotel-arama"
    },
    {
      "intrebare": "Ce ascundea penarul?",
      "optiuni": [
        "Bani",
        "Compartiment fals pentru bilețele",
        "Creioane"
      ],
      "corect": 1,
      "obiectId": "penar-1950"
    },
    {
      "intrebare": "Cum s-a câștigat finala din 1985?",
      "optiuni": [
        "3-2 cu gol din corner min.89",
        "1-0 la penalty",
        "Prin neprezentare"
      ],
      "corect": 0,
      "obiectId": "minge-1985"
    },
    {
      "intrebare": "Ce înseamnă romburile de pe ie?",
      "optiuni": [
        "Fulgi",
        "Spice de grâu",
        "Valuri"
      ],
      "corect": 1,
      "obiectId": "costum-oltenesc"
    },
    {
      "intrebare": "Ce defect are microscopul?",
      "optiuni": [
        "Fără lumină",
        "Lentilă zgâriată de gumă",
        "Fără picior"
      ],
      "corect": 1,
      "obiectId": "microscop-1982"
    },
    {
      "intrebare": "Ce cerea învățătorul în scrisoarea din 1944?",
      "optiuni": [
        "Mâncare",
        "Să învețe și să ude florile",
        "Să-i țină banca"
      ],
      "corect": 1,
      "obiectId": "scrisoare-1944"
    }
  ]
};
