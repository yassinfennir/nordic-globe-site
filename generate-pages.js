const fs = require('fs');
const path = require('path');

// ============================================
// NORDIC GLOBE — CITY PAGE GENERATOR
// Generates SEO-optimized pages for each city
// ============================================

const PHONE = '040 7770086';
const PHONE_INTL = '+358407770086';
const EMAIL = 'info@nordicglobe.co';
const YTUNNUS = '2654015-7';
const SITE = 'https://nordicglobe.co';

const cities = [
  {
    slug: 'espoo', name: 'Espoo', nameFi: 'Espoo',
    lat: 60.2055, lng: 24.6559,
    districts: ['Tapiola', 'Leppävaara', 'Matinkylä', 'Otaniemi', 'Olari', 'Suurpelto', 'Westend', 'Haukilahti', 'Mankkaa', 'Niittykumpu'],
    population: '300 000',
    descEN: 'Espoo is Finland\'s second-largest city and a major business hub in the Helsinki metropolitan area. Nordic Globe provides premium cleaning services to offices, shopping centers, restaurants, residential buildings, and construction sites across all Espoo districts.',
    descFI: 'Espoo on Suomen toiseksi suurin kaupunki ja merkittävä yrityskeskus pääkaupunkiseudulla. Nordic Globe tarjoaa ammattitaitoisia siivouspalveluita toimistoihin, kauppakeskuksiin, ravintoloihin, taloyhtiöihin ja rakennuskohteisiin kaikissa Espoon kaupunginosissa.',
    factEN: 'As Espoo\'s trusted cleaning partner since 2009, we serve major shopping centers, corporate headquarters in Keilaniemi, and residential properties from Tapiola to Suurpelto.',
    factFI: 'Espoon luotettavana siivouspartnerina vuodesta 2009 palvelemme suuria kauppakeskuksia, yritysten pääkonttoreita Keilaniemessä ja asuinkiinteistöjä Tapiolasta Suurpeltoon.',
    mapQuery: 'Nordic+Globe+Oy+Espoo'
  },
  {
    slug: 'helsinki', name: 'Helsinki', nameFi: 'Helsinki',
    lat: 60.1699, lng: 24.9384,
    districts: ['Pasila', 'Kallio', 'Töölö', 'Kamppi', 'Ruoholahti', 'Sörnäinen', 'Itäkeskus', 'Vuosaari', 'Herttoniemi', 'Munkkiniemi'],
    population: '660 000',
    descEN: 'Helsinki, Finland\'s capital, is home to thousands of businesses and residential properties requiring professional cleaning. Nordic Globe delivers top-tier cleaning services across all Helsinki districts, from the city center to the suburbs.',
    descFI: 'Helsinki, Suomen pääkaupunki, on tuhansien yritysten ja asuinkiinteistöjen koti, jotka tarvitsevat ammattimaista siivousta. Nordic Globe tarjoaa huippuluokan siivouspalveluita kaikissa Helsingin kaupunginosissa keskustasta lähiöihin.',
    factEN: 'We clean corporate offices in Pasila, boutique restaurants in Kallio, luxury apartments in Töölö, and retail spaces in Kamppi — Helsinki trusts Nordic Globe.',
    factFI: 'Siivoamme yritystoimistoja Pasilassa, ravintoloita Kalliossa, luksusasuntoja Töölössä ja liiketiloja Kampissa — Helsinki luottaa Nordic Globeen.',
    mapQuery: 'cleaning+service+Helsinki+Finland'
  },
  {
    slug: 'vantaa', name: 'Vantaa', nameFi: 'Vantaa',
    lat: 60.2934, lng: 25.0378,
    districts: ['Tikkurila', 'Myyrmäki', 'Aviapolis', 'Koivukylä', 'Korso', 'Hakunila', 'Martinlaakso', 'Rekola'],
    population: '240 000',
    descEN: 'Vantaa, home to Helsinki Airport and major logistics centers, requires reliable professional cleaning services. Nordic Globe serves businesses, warehouses, offices, and residential buildings throughout Vantaa.',
    descFI: 'Vantaa, Helsinki-Vantaan lentokentän ja suurten logistiikkakeskusten kotikaupunki, tarvitsee luotettavia ammattimaisia siivouspalveluita. Nordic Globe palvelee yrityksiä, varastoja, toimistoja ja asuinrakennuksia koko Vantaalla.',
    factEN: 'From Aviapolis business parks to Tikkurila shopping centers, Nordic Globe keeps Vantaa\'s commercial and residential spaces spotless.',
    factFI: 'Aviapoliksen yrityspuistoista Tikkurilan kauppakeskuksiin — Nordic Globe pitää Vantaan liike- ja asuintilat moitteettomassa kunnossa.',
    mapQuery: 'cleaning+service+Vantaa+Finland'
  },
  {
    slug: 'turku', name: 'Turku', nameFi: 'Turku',
    lat: 60.4518, lng: 22.2666,
    districts: ['Keskusta', 'Kupittaa', 'Runosmäki', 'Varissuo', 'Hirvensalo', 'Pansio', 'Raisio'],
    population: '200 000',
    descEN: 'Turku, Finland\'s oldest city and a vibrant cultural hub, has a growing demand for professional cleaning. Nordic Globe expands its premium service to Turku\'s offices, restaurants, and residential buildings.',
    descFI: 'Turku, Suomen vanhin kaupunki ja elinvoimainen kulttuurikeskus, tarvitsee yhä enemmän ammattimaisia siivouspalveluita. Nordic Globe laajentaa premium-palvelunsa Turun toimistoihin, ravintoloihin ja asuinkiinteistöihin.',
    factEN: 'Nordic Globe brings Helsinki-level professional cleaning standards to Turku — from Kupittaa tech campuses to the historic city center.',
    factFI: 'Nordic Globe tuo Helsingin tason ammattisiivouksen Turkuun — Kupittaan teknologiakampuksista historialliseen keskustaan.',
    mapQuery: 'cleaning+service+Turku+Finland'
  },
  {
    slug: 'tampere', name: 'Tampere', nameFi: 'Tampere',
    lat: 61.4978, lng: 23.7610,
    districts: ['Keskusta', 'Hervanta', 'Kaleva', 'Pispala', 'Lielahti', 'Tesoma', 'Härmälä'],
    population: '250 000',
    descEN: 'Tampere, Finland\'s fastest-growing city, is a thriving business and technology center. Nordic Globe offers comprehensive cleaning solutions for Tampere\'s modern offices, industrial spaces, and residential properties.',
    descFI: 'Tampere, Suomen nopeimmin kasvava kaupunki, on kukoistava liike-elämän ja teknologian keskus. Nordic Globe tarjoaa kattavat siivousratkaisut Tampereen moderneihin toimistoihin, teollisuustiloihin ja asuinkiinteistöihin.',
    factEN: 'From Hervanta\'s university campus to Tampere\'s booming city center — Nordic Globe delivers excellence in every clean.',
    factFI: 'Hervannan yliopistokampukselta Tampereen kukoistavaan keskustaan — Nordic Globe tarjoaa huippulaatua jokaisessa siivouksessa.',
    mapQuery: 'cleaning+service+Tampere+Finland'
  },
  {
    slug: 'jyvaskyla', name: 'Jyväskylä', nameFi: 'Jyväskylä',
    lat: 62.2415, lng: 25.7209,
    districts: ['Keskusta', 'Kuokkala', 'Keljo', 'Palokka', 'Vaajakoski', 'Kortepohja'],
    population: '145 000',
    descEN: 'Jyväskylä, a key city in Central Finland known for education and sports, benefits from Nordic Globe\'s professional cleaning expertise for universities, sports facilities, offices, and homes.',
    descFI: 'Jyväskylä, Keski-Suomen avainkaupunki joka tunnetaan koulutuksesta ja urheilusta, hyötyy Nordic Globen ammattimaisesta siivousosaamisesta yliopistoille, urheilutiloille, toimistoille ja kodeille.',
    factEN: 'University campuses, sports arenas, and growing businesses — Jyväskylä trusts Nordic Globe for professional cleaning.',
    factFI: 'Yliopistokampukset, urheiluhalli ja kasvavat yritykset — Jyväskylä luottaa Nordic Globeen ammattisiivouksessa.',
    mapQuery: 'cleaning+service+Jyväskylä+Finland'
  },
  {
    slug: 'kuopio', name: 'Kuopio', nameFi: 'Kuopio',
    lat: 62.8924, lng: 27.6772,
    districts: ['Keskusta', 'Petonen', 'Puijonlaakso', 'Saaristokaupunki', 'Neulamäki'],
    population: '120 000',
    descEN: 'Kuopio, Eastern Finland\'s largest city, is a hub for healthcare and technology. Nordic Globe provides specialized cleaning for hospitals, tech offices, restaurants, and residential buildings.',
    descFI: 'Kuopio, Itä-Suomen suurin kaupunki, on terveydenhuollon ja teknologian keskus. Nordic Globe tarjoaa erikoissiivouspalveluita sairaaloille, teknologiatoimistoille, ravintoloille ja asuinkiinteistöille.',
    factEN: 'Healthcare facilities, university buildings, and Kuopio\'s vibrant restaurant scene — all kept spotless by Nordic Globe.',
    factFI: 'Terveydenhuollon tilat, yliopistorakennukset ja Kuopion vilkas ravintolamaailma — kaikki Nordic Globen siivottavana.',
    mapQuery: 'cleaning+service+Kuopio+Finland'
  },
  {
    slug: 'lahti', name: 'Lahti', nameFi: 'Lahti',
    lat: 60.9827, lng: 25.6612,
    districts: ['Keskusta', 'Mukkula', 'Launeen', 'Ahtiala', 'Jalkaranta'],
    population: '120 000',
    descEN: 'Lahti, European Green Capital 2021, values sustainability — and so does Nordic Globe. We provide eco-friendly cleaning services using certified green products for Lahti\'s offices, homes, and public spaces.',
    descFI: 'Lahti, Euroopan vihreä pääkaupunki 2021, arvostaa kestävyyttä — samoin Nordic Globe. Tarjoamme ympäristöystävällisiä siivouspalveluita sertifioiduilla vihreillä tuotteilla Lahden toimistoihin, koteihin ja julkisiin tiloihin.',
    factEN: 'Lahti\'s commitment to sustainability meets Nordic Globe\'s ISO 14001 certified eco-friendly cleaning — a perfect match.',
    factFI: 'Lahden sitoutuminen kestävyyteen kohtaa Nordic Globen ISO 14001 -sertifioidun ympäristöystävällisen siivouksen — täydellinen pari.',
    mapQuery: 'cleaning+service+Lahti+Finland'
  },
  {
    slug: 'oulu', name: 'Oulu', nameFi: 'Oulu',
    lat: 65.0121, lng: 25.4651,
    districts: ['Keskusta', 'Linnanmaa', 'Tuira', 'Kaijonharju', 'Kontinkangas', 'Pateniemi'],
    population: '210 000',
    descEN: 'Oulu, Northern Finland\'s technology capital, is home to Nokia, universities, and a thriving startup scene. Nordic Globe provides professional cleaning tailored to Oulu\'s tech offices, campuses, and commercial spaces.',
    descFI: 'Oulu, Pohjois-Suomen teknologiapääkaupunki, on Nokian, yliopistojen ja kukoistavan startup-ekosysteemin koti. Nordic Globe tarjoaa ammattimaista siivousta Oulun teknologiatoimistoihin, kampuksiin ja liiketiloihin.',
    factEN: 'From Nokia\'s Oulu campus to university research buildings — Nordic Globe brings southern Finland\'s cleaning excellence to the north.',
    factFI: 'Nokian Oulun kampukselta yliopiston tutkimusrakennuksiin — Nordic Globe tuo Etelä-Suomen siivousosaamisen pohjoiseen.',
    mapQuery: 'cleaning+service+Oulu+Finland'
  }
];

const services = [
  { name: 'Office Cleaning', nameFi: 'Toimistosiivous', icon: 'fa-building', slug: 'office-cleaning' },
  { name: 'Restaurant Cleaning', nameFi: 'Ravintolasiivous', icon: 'fa-utensils', slug: 'restaurant-cleaning' },
  { name: 'Stair Cleaning', nameFi: 'Porrassiivous', icon: 'fa-stairs', slug: 'stair-cleaning' },
  { name: 'Window Cleaning', nameFi: 'Ikkunapesut', icon: 'fa-window-maximize', slug: 'window-cleaning' },
  { name: 'Gym Cleaning', nameFi: 'Kuntosalisiivous', icon: 'fa-dumbbell', slug: 'gym-cleaning' },
  { name: 'Construction Cleaning', nameFi: 'Rakennussiivous', icon: 'fa-hard-hat', slug: 'construction-cleaning' },
  { name: 'Store Cleaning', nameFi: 'Myymäläsiivous', icon: 'fa-store', slug: 'store-cleaning' },
  { name: 'Final Cleaning', nameFi: 'Loppusiivous', icon: 'fa-broom', slug: 'final-cleaning' },
  { name: 'Deep Cleaning', nameFi: 'Suursiivous', icon: 'fa-spray-can-sparkles', slug: 'deep-cleaning' },
  { name: 'Floor Maintenance', nameFi: 'Peruspesut ja vahaukset', icon: 'fa-brush', slug: 'floor-maintenance' },
  { name: 'Special Cleaning', nameFi: 'Erikoissiivous', icon: 'fa-shield-halved', slug: 'special-cleaning' }
];

const reviews = [
  { name: 'Tomi G.', role: 'Store Manager, S-Market', text: 'Nordic Globe has handled our store cleaning for years. Extremely reliable and professional service.', textFi: 'Nordic Globe on hoitanut myymäläsiivoustamme jo vuosia. Erittäin luotettava ja ammattimainen palvelu.', rating: 5 },
  { name: 'Mika K.', role: 'Property Manager', text: 'Stair cleaning is always impeccable. The hallways are spotless every time.', textFi: 'Porrassiivous on aina moitteetonta. Rappukäytävät ovat puhtaat ja siistit joka kerta.', rating: 5 },
  { name: 'Anna S.', role: 'Construction Manager', text: 'Construction cleaning was top-notch. The site was left perfectly clean.', textFi: 'Rakennussiivous oli huippuluokkaa. Työmaa jäi täydellisen puhtaaksi.', rating: 5 },
  { name: 'Katja N.', role: 'Housing Board', text: 'We\'ve used Nordic Globe\'s maintenance cleaning for 3 years. Reliable, quality service every time.', textFi: 'Olemme käyttäneet Nordic Globen ylläpitosiivousta 3 vuotta. Luotettavaa ja laadukasta palvelua.', rating: 5 }
];

function generateCityPage(city, lang) {
  const isEN = lang === 'en';
  const prefix = isEN ? 'cleaning' : 'siivous';
  const filename = `${prefix}-${city.slug}.html`;
  const pageTitle = isEN
    ? `Professional Cleaning Services in ${city.name} | Nordic Globe`
    : `Ammattimainen siivouspalvelu ${city.nameFi} | Nordic Globe`;
  const metaDesc = isEN
    ? `Nordic Globe — #1 professional cleaning company in ${city.name}, Finland. Office, restaurant, stair, window & construction cleaning. ${city.population}+ people trust us. ISO 9001 & 14001 certified. Get a free quote today!`
    : `Nordic Globe — ammattimainen siivouspalvelu ${city.nameFi}ssa. Toimisto-, ravintola-, porras-, ikkuna- ja rakennussiivous. ${city.population}+ asukasta. ISO 9001 & 14001 -sertifioitu. Pyydä ilmainen tarjous!`;
  const h1 = isEN
    ? `Professional Cleaning Services in ${city.name}`
    : `Ammattimainen siivouspalvelu ${city.nameFi}ssa`;
  const desc = isEN ? city.descEN : city.descFI;
  const fact = isEN ? city.factEN : city.factFI;
  const otherLangSlug = isEN ? `siivous-${city.slug}` : `cleaning-${city.slug}`;
  const otherLangLabel = isEN ? 'Suomeksi' : 'In English';

  const servicesHTML = services.map(s => `
                    <div class="ng-service-item">
                        <div class="ng-service-icon"><i class="fa-solid ${s.icon}"></i></div>
                        <div>
                            <h3>${isEN ? s.name : s.nameFi}</h3>
                            <p>${isEN ? `Professional ${s.name.toLowerCase()} in ${city.name}` : `Ammattimainen ${s.nameFi.toLowerCase()} ${city.nameFi}ssa`}</p>
                        </div>
                    </div>`).join('');

  const reviewsHTML = reviews.map(r => `
                    <div class="ng-review">
                        <div class="ng-review-stars">${'★'.repeat(r.rating)}</div>
                        <p>"${isEN ? r.text : r.textFi}"</p>
                        <strong>${r.name}</strong> — <span>${r.role}</span>
                    </div>`).join('');

  const cityLinksHTML = cities.filter(c => c.slug !== city.slug).map(c =>
    `<a href="/${prefix}-${c.slug}">${c.name}</a>`
  ).join(' · ');

  const districtsHTML = city.districts.map(d =>
    `<span class="ng-district">${d}</span>`
  ).join('');

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CleaningBusiness",
    "@id": `${SITE}/${prefix}-${city.slug}#business`,
    "name": "Nordic Globe Oy",
    "description": isEN ? city.descEN : city.descFI,
    "url": `${SITE}/${prefix}-${city.slug}`,
    "telephone": `+${PHONE_INTL}`,
    "email": EMAIL,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": "Uusimaa",
      "addressCountry": "FI"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": city.lat, "longitude": city.lng },
    "areaServed": { "@type": "City", "name": city.name },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "bestRating": "5", "reviewCount": "127" },
    "priceRange": "$$",
    "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "18:00" }],
    "sameAs": ["https://www.facebook.com/nordicglobe/", "https://www.instagram.com/nordic_globe_oy/"],
    "award": ["Platinum AAA 2021", "ISO 9001", "ISO 14001"],
    "taxID": YTUNNUS
  }, null, 2);

  return { filename, content: `<!DOCTYPE html>
<html lang="${isEN ? 'en' : 'fi'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <meta name="description" content="${metaDesc}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
    <link rel="canonical" href="${SITE}/${filename.replace('.html','')}">
    <link rel="alternate" hreflang="${isEN ? 'en' : 'fi'}" href="${SITE}/${filename.replace('.html','')}">
    <link rel="alternate" hreflang="${isEN ? 'fi' : 'en'}" href="${SITE}/${otherLangSlug}">
    <link rel="alternate" hreflang="x-default" href="${SITE}/${filename.replace('.html','')}">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${metaDesc}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${SITE}/${filename.replace('.html','')}">
    <meta property="og:image" content="${SITE}/logo.png">
    <meta property="og:locale" content="${isEN ? 'en_FI' : 'fi_FI'}">
    <meta name="theme-color" content="#0a0a0a">
    <link rel="icon" type="image/png" href="/logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script type="application/ld+json">${schema}</script>
    <style>
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{--black:#0a0a0a;--white:#ffffff;--gray-50:#fafafa;--gray-100:#f5f5f5;--gray-200:#e5e5e5;--gray-400:#a3a3a3;--gray-500:#737373;--gray-600:#525252;--gray-800:#262626;--gray-900:#171717;--blue:#1877F2;--blue-hover:#1565d8;--radius:16px;--radius-sm:12px}
        html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
        body{font-family:'Inter',system-ui,-apple-system,sans-serif;color:var(--gray-900);background:var(--white);line-height:1.6;overflow-x:hidden}

        /* NAV */
        .ng-nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,0.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--gray-200);padding:0 24px}
        .ng-nav-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:72px}
        .ng-nav-logo{display:flex;align-items:center;gap:12px;text-decoration:none;color:var(--black);font-weight:800;font-size:1.15rem}
        .ng-nav-logo img{height:40px;width:40px;border-radius:10px}
        .ng-nav-links{display:flex;align-items:center;gap:8px}
        .ng-nav-links a{padding:8px 16px;border-radius:50px;text-decoration:none;color:var(--gray-600);font-weight:500;font-size:0.9rem;transition:all 0.2s}
        .ng-nav-links a:hover{color:var(--black);background:var(--gray-100)}
        .ng-nav-links a.active{background:var(--black);color:var(--white)}
        .ng-nav-cta{background:var(--blue);color:#fff;padding:10px 24px;border-radius:50px;text-decoration:none;font-weight:600;font-size:0.9rem;transition:all 0.2s}
        .ng-nav-cta:hover{background:var(--blue-hover);transform:translateY(-1px)}
        .ng-lang-switch{padding:8px 14px;border-radius:50px;text-decoration:none;color:var(--gray-500);font-weight:500;font-size:0.8rem;border:1px solid var(--gray-200);transition:all 0.2s}
        .ng-lang-switch:hover{border-color:var(--gray-400);color:var(--black)}

        /* HERO */
        .ng-hero{padding:160px 24px 100px;text-align:center;background:linear-gradient(180deg,var(--gray-50) 0%,var(--white) 100%)}
        .ng-hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--gray-100);border:1px solid var(--gray-200);padding:8px 20px;border-radius:50px;font-size:0.85rem;font-weight:500;color:var(--gray-600);margin-bottom:24px}
        .ng-hero-badge i{color:var(--blue)}
        .ng-hero h1{font-size:clamp(2.5rem,6vw,4.5rem);font-weight:900;letter-spacing:-0.03em;line-height:1.05;color:var(--black);max-width:900px;margin:0 auto 24px}
        .ng-hero h1 span{color:var(--blue)}
        .ng-hero-desc{font-size:1.15rem;color:var(--gray-500);max-width:640px;margin:0 auto 40px;line-height:1.7}
        .ng-hero-actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
        .ng-btn{display:inline-flex;align-items:center;gap:10px;padding:16px 32px;border-radius:50px;font-weight:600;font-size:1rem;text-decoration:none;transition:all 0.3s;cursor:pointer;border:none}
        .ng-btn-primary{background:var(--blue);color:#fff}
        .ng-btn-primary:hover{background:var(--blue-hover);transform:translateY(-2px);box-shadow:0 8px 30px rgba(24,119,242,0.3)}
        .ng-btn-secondary{background:var(--white);color:var(--black);border:1.5px solid var(--gray-200)}
        .ng-btn-secondary:hover{border-color:var(--gray-400);transform:translateY(-2px)}
        .ng-hero-stats{display:flex;justify-content:center;gap:48px;margin-top:60px;flex-wrap:wrap}
        .ng-stat{text-align:center}
        .ng-stat-num{font-size:2.5rem;font-weight:900;color:var(--black);letter-spacing:-0.02em}
        .ng-stat-label{font-size:0.85rem;color:var(--gray-500);margin-top:4px}
        .ng-available{display:inline-flex;align-items:center;gap:8px;background:#ecfdf5;color:#065f46;padding:10px 22px;border-radius:50px;font-weight:600;font-size:0.9rem;margin-top:32px}
        .ng-available .dot{width:8px;height:8px;background:#10b981;border-radius:50%;animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}

        /* SECTIONS */
        .ng-section{padding:100px 24px}
        .ng-section-alt{background:var(--gray-50)}
        .ng-section-dark{background:var(--black);color:var(--white)}
        .ng-container{max-width:1200px;margin:0 auto}
        .ng-section-header{text-align:center;margin-bottom:64px}
        .ng-section-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 20px;border-radius:50px;font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;background:var(--gray-100);color:var(--gray-600)}
        .ng-section-dark .ng-section-badge{background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.6)}
        .ng-section-header h2{font-size:clamp(2rem,4vw,3rem);font-weight:800;letter-spacing:-0.02em;line-height:1.15}
        .ng-section-header p{font-size:1.05rem;color:var(--gray-500);margin-top:16px;max-width:600px;margin-left:auto;margin-right:auto}
        .ng-section-dark .ng-section-header p{color:rgba(255,255,255,0.5)}

        /* SERVICES GRID */
        .ng-services-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
        .ng-service-item{display:flex;align-items:flex-start;gap:16px;padding:24px;background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius);transition:all 0.3s}
        .ng-service-item:hover{border-color:var(--blue);transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,0.06)}
        .ng-service-icon{width:48px;height:48px;background:var(--gray-100);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:1.1rem;color:var(--blue)}
        .ng-service-item h3{font-size:1rem;font-weight:700;margin-bottom:4px}
        .ng-service-item p{font-size:0.88rem;color:var(--gray-500);line-height:1.5}

        /* WHY US */
        .ng-why-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px}
        .ng-why-card{padding:32px;border-radius:var(--radius);background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1)}
        .ng-why-card-icon{width:56px;height:56px;background:rgba(24,119,242,0.15);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;margin-bottom:20px;font-size:1.3rem;color:var(--blue)}
        .ng-why-card h3{font-size:1.1rem;font-weight:700;color:var(--white);margin-bottom:8px}
        .ng-why-card p{font-size:0.9rem;color:rgba(255,255,255,0.5);line-height:1.6}

        /* REVIEWS */
        .ng-reviews-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
        .ng-review{padding:28px;background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius)}
        .ng-review-stars{color:#f59e0b;font-size:1.1rem;margin-bottom:12px;letter-spacing:2px}
        .ng-review p{font-size:0.95rem;color:var(--gray-600);line-height:1.6;margin-bottom:16px;font-style:italic}
        .ng-review strong{font-size:0.9rem;color:var(--black)}
        .ng-review span{font-size:0.8rem;color:var(--gray-500)}

        /* DISTRICTS */
        .ng-districts{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:32px}
        .ng-district{padding:8px 18px;background:var(--gray-100);border-radius:50px;font-size:0.85rem;font-weight:500;color:var(--gray-600)}

        /* LOCAL CONTENT */
        .ng-local{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
        .ng-local-text h2{font-size:2rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:16px}
        .ng-local-text p{font-size:1rem;color:var(--gray-500);line-height:1.7;margin-bottom:16px}
        .ng-local-map{border-radius:var(--radius);overflow:hidden;height:400px;border:1px solid var(--gray-200)}
        .ng-local-map iframe{width:100%;height:100%;border:0}

        /* CONTACT */
        .ng-contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px}
        .ng-contact-info h3{font-size:1.5rem;font-weight:700;margin-bottom:24px}
        .ng-contact-item{display:flex;align-items:center;gap:16px;margin-bottom:20px}
        .ng-contact-item i{width:44px;height:44px;background:var(--gray-100);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;color:var(--blue);font-size:1rem}
        .ng-contact-item a,.ng-contact-item span{font-size:0.95rem;color:var(--gray-600);text-decoration:none}
        .ng-contact-item a:hover{color:var(--blue)}
        .ng-form{display:flex;flex-direction:column;gap:16px}
        .ng-form input,.ng-form textarea{padding:16px 20px;border:1.5px solid var(--gray-200);border-radius:var(--radius-sm);font-size:0.95rem;font-family:inherit;background:var(--white);transition:border 0.3s}
        .ng-form input:focus,.ng-form textarea:focus{outline:none;border-color:var(--blue)}
        .ng-form textarea{min-height:120px;resize:vertical}
        .ng-form button{align-self:flex-start}

        /* CITY LINKS */
        .ng-city-links{text-align:center;padding:40px 24px;background:var(--gray-50);border-top:1px solid var(--gray-200)}
        .ng-city-links p{font-size:0.8rem;color:var(--gray-400);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600}
        .ng-city-links a{color:var(--gray-500);text-decoration:none;font-size:0.9rem;transition:color 0.2s}
        .ng-city-links a:hover{color:var(--blue)}

        /* FOOTER */
        .ng-footer{background:var(--black);color:rgba(255,255,255,0.5);padding:60px 24px 30px;text-align:center}
        .ng-footer a{color:rgba(255,255,255,0.5);text-decoration:none}
        .ng-footer a:hover{color:var(--white)}
        .ng-footer-brand{font-size:1.2rem;font-weight:800;color:var(--white);margin-bottom:16px}
        .ng-footer-links{display:flex;justify-content:center;gap:24px;margin:20px 0;flex-wrap:wrap}
        .ng-footer-bottom{margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);font-size:0.8rem}

        /* STICKY CTA */
        .ng-sticky-cta{position:fixed;bottom:24px;right:24px;z-index:999;display:flex;gap:12px}
        .ng-sticky-btn{padding:14px 24px;border-radius:50px;font-weight:600;font-size:0.9rem;text-decoration:none;display:flex;align-items:center;gap:8px;box-shadow:0 8px 30px rgba(0,0,0,0.15);transition:all 0.3s}
        .ng-sticky-call{background:#10b981;color:#fff}
        .ng-sticky-wa{background:#25d366;color:#fff}
        .ng-sticky-btn:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,0.2)}

        /* MOBILE */
        @media(max-width:768px){
            .ng-nav-links{display:none}
            .ng-hero h1{font-size:2.2rem}
            .ng-hero-stats{gap:24px}
            .ng-stat-num{font-size:1.8rem}
            .ng-local{grid-template-columns:1fr}
            .ng-contact-grid{grid-template-columns:1fr}
            .ng-local-map{height:280px}
            .ng-sticky-cta{bottom:16px;right:16px;left:16px;justify-content:center}
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="ng-nav">
        <div class="ng-nav-inner">
            <a href="/" class="ng-nav-logo"><img src="/logo.png" alt="Nordic Globe"> Nordic Globe</a>
            <div class="ng-nav-links">
                <a href="/#palvelut">${isEN ? 'Services' : 'Palvelut'}</a>
                <a href="/#meista">${isEN ? 'About' : 'Tietoa'}</a>
                <a href="/#arvostelut">${isEN ? 'Reviews' : 'Arvostelut'}</a>
                <a href="/#contact">${isEN ? 'Contact' : 'Yhteystiedot'}</a>
                <a href="/${otherLangSlug}" class="ng-lang-switch">${otherLangLabel}</a>
                <a href="tel:${PHONE_INTL}" class="ng-nav-cta"><i class="fa-solid fa-phone"></i> ${PHONE}</a>
            </div>
        </div>
    </nav>

    <main>
    <!-- Hero -->
    <section class="ng-hero">
        <div class="ng-hero-badge"><i class="fa-solid fa-shield-check"></i> ${isEN ? 'Platinum AAA Certified · ISO 9001 · ISO 14001' : 'Platinum AAA -sertifioitu · ISO 9001 · ISO 14001'}</div>
        <h1>${isEN ? `#1 Cleaning Service in <span>${city.name}</span>` : `#1 Siivouspalvelu <span>${city.nameFi}ssa</span>`}</h1>
        <p class="ng-hero-desc">${isEN ? `Professional cleaning for offices, restaurants, stores, gyms, and residential buildings across ${city.name}. Trusted by 2,500+ customers.` : `Ammattimainen siivous toimistoihin, ravintoloihin, myymälöihin, kuntosaleille ja asuinkiinteistöihin ${city.nameFi}ssa. 2 500+ tyytyväistä asiakasta.`}</p>
        <div class="ng-hero-actions">
            <a href="#contact" class="ng-btn ng-btn-primary"><i class="fa-solid fa-paper-plane"></i> ${isEN ? 'Get Free Quote' : 'Pyydä ilmainen tarjous'}</a>
            <a href="tel:${PHONE_INTL}" class="ng-btn ng-btn-secondary"><i class="fa-solid fa-phone"></i> ${PHONE}</a>
        </div>
        <div class="ng-available"><span class="dot"></span>${isEN ? `Available today in ${city.name}` : `Saatavilla tänään ${city.nameFi}ssa`}</div>
        <div class="ng-hero-stats">
            <div class="ng-stat"><div class="ng-stat-num">4.8★</div><div class="ng-stat-label">Google ${isEN ? 'Rating' : 'Arvosana'}</div></div>
            <div class="ng-stat"><div class="ng-stat-num">2,500+</div><div class="ng-stat-label">${isEN ? 'Customers' : 'Asiakasta'}</div></div>
            <div class="ng-stat"><div class="ng-stat-num">15+</div><div class="ng-stat-label">${isEN ? 'Years' : 'Vuotta'}</div></div>
            <div class="ng-stat"><div class="ng-stat-num">100+</div><div class="ng-stat-label">${isEN ? 'Professionals' : 'Ammattilaista'}</div></div>
        </div>
    </section>

    <!-- Services -->
    <section class="ng-section ng-section-alt">
        <div class="ng-container">
            <div class="ng-section-header">
                <div class="ng-section-badge"><i class="fa-solid fa-sparkles"></i> ${isEN ? 'Services' : 'Palvelut'}</div>
                <h2>${isEN ? `Cleaning Services in ${city.name}` : `Siivouspalvelut ${city.nameFi}ssa`}</h2>
                <p>${isEN ? `Complete range of professional cleaning solutions for every need in ${city.name}.` : `Kattava valikoima ammattimaisia siivousratkaisuja jokaiseen tarpeeseen ${city.nameFi}ssa.`}</p>
            </div>
            <div class="ng-services-grid">${servicesHTML}
            </div>
        </div>
    </section>

    <!-- Why Us -->
    <section class="ng-section ng-section-dark">
        <div class="ng-container">
            <div class="ng-section-header">
                <div class="ng-section-badge"><i class="fa-solid fa-trophy"></i> ${isEN ? 'Why Nordic Globe' : 'Miksi Nordic Globe'}</div>
                <h2>${isEN ? `Why ${city.name} Trusts Nordic Globe` : `Miksi ${city.nameFi} luottaa Nordic Globeen`}</h2>
            </div>
            <div class="ng-why-grid">
                <div class="ng-why-card"><div class="ng-why-card-icon"><i class="fa-solid fa-bolt"></i></div><h3>${isEN ? 'Fast Response' : 'Nopea vastaus'}</h3><p>${isEN ? 'Free quote within 2 hours. Service can start within 24-48 hours.' : 'Ilmainen tarjous 2 tunnin sisällä. Palvelu voi alkaa 24-48 tunnin sisällä.'}</p></div>
                <div class="ng-why-card"><div class="ng-why-card-icon"><i class="fa-solid fa-shield-check"></i></div><h3>${isEN ? '100% Reliable' : '100% Luotettava'}</h3><p>${isEN ? 'Platinum AAA certified. Insurance covered. Tilaajavastuu registered.' : 'Platinum AAA -sertifioitu. Vastuuvakuutettu. Tilaajavastuu-rekisteröity.'}</p></div>
                <div class="ng-why-card"><div class="ng-why-card-icon"><i class="fa-solid fa-leaf"></i></div><h3>${isEN ? 'Eco-Friendly' : 'Ympäristöystävällinen'}</h3><p>${isEN ? 'ISO 14001 certified. We use eco-labeled cleaning products.' : 'ISO 14001 -sertifioitu. Käytämme ympäristömerkittyjä puhdistusaineita.'}</p></div>
                <div class="ng-why-card"><div class="ng-why-card-icon"><i class="fa-solid fa-users"></i></div><h3>${isEN ? 'Expert Team' : 'Asiantuntijatiimi'}</h3><p>${isEN ? '100+ trained professionals. 15+ years of experience in Finland.' : '100+ koulutettua ammattilaista. 15+ vuoden kokemus Suomessa.'}</p></div>
            </div>
        </div>
    </section>

    <!-- Local Area -->
    <section class="ng-section">
        <div class="ng-container">
            <div class="ng-local">
                <div class="ng-local-text">
                    <h2>${isEN ? `Cleaning Services Across ${city.name}` : `Siivouspalvelut koko ${city.nameFi}ssa`}</h2>
                    <p>${desc}</p>
                    <p>${fact}</p>
                    <h3 style="font-size:1rem;margin-top:24px;margin-bottom:12px">${isEN ? `Areas We Serve in ${city.name}` : `Palvelualueet ${city.nameFi}ssa`}</h3>
                    <div class="ng-districts">${districtsHTML}</div>
                </div>
                <div class="ng-local-map">
                    <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${city.mapQuery}&zoom=12" allowfullscreen loading="lazy" title="${isEN ? `Nordic Globe ${city.name} Map` : `Nordic Globe ${city.nameFi} kartta`}"></iframe>
                </div>
            </div>
        </div>
    </section>

    <!-- Reviews -->
    <section class="ng-section ng-section-alt">
        <div class="ng-container">
            <div class="ng-section-header">
                <div class="ng-section-badge"><i class="fa-solid fa-star"></i> ${isEN ? 'Reviews' : 'Arvostelut'}</div>
                <h2>${isEN ? 'What Our Customers Say' : 'Mitä asiakkaamme sanovat'}</h2>
                <p>${isEN ? '4.8/5 rating on Google — trusted by 2,500+ businesses and properties.' : '4.8/5 Google-arvosana — 2 500+ yritystä ja kiinteistöä luottaa meihin.'}</p>
            </div>
            <div class="ng-reviews-grid">${reviewsHTML}
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section class="ng-section" id="contact">
        <div class="ng-container">
            <div class="ng-section-header">
                <div class="ng-section-badge"><i class="fa-solid fa-envelope"></i> ${isEN ? 'Contact' : 'Yhteystiedot'}</div>
                <h2>${isEN ? `Get a Free Quote in ${city.name}` : `Pyydä ilmainen tarjous ${city.nameFi}ssa`}</h2>
            </div>
            <div class="ng-contact-grid">
                <div class="ng-contact-info">
                    <h3>${isEN ? 'Reach Us' : 'Ota yhteyttä'}</h3>
                    <div class="ng-contact-item"><i class="fa-solid fa-phone"></i><a href="tel:${PHONE_INTL}">${PHONE}</a></div>
                    <div class="ng-contact-item"><i class="fa-solid fa-envelope"></i><a href="mailto:${EMAIL}">${EMAIL}</a></div>
                    <div class="ng-contact-item"><i class="fa-brands fa-whatsapp"></i><a href="https://wa.me/${PHONE_INTL.replace('+','')}">WhatsApp</a></div>
                    <div class="ng-contact-item"><i class="fa-solid fa-clock"></i><span>${isEN ? 'Mon–Fri: 07:00–18:00' : 'Ma–Pe: 07:00–18:00'}</span></div>
                    <div class="ng-contact-item"><i class="fa-solid fa-location-dot"></i><span>${isEN ? 'Service area: ' : 'Palvelualue: '}${city.name}, ${isEN ? 'Finland' : 'Suomi'}</span></div>
                </div>
                <form class="ng-form" onsubmit="event.preventDefault();this.innerHTML='<p style=padding:40px;text-align:center;font-weight:700;color:#10b981>${isEN ? '✓ Message sent! We will contact you within 2 hours.' : '✓ Viesti lähetetty! Otamme yhteyttä 2 tunnin sisällä.'}</p>'">
                    <input type="text" placeholder="${isEN ? 'Your name' : 'Nimesi'}" required>
                    <input type="tel" placeholder="${isEN ? 'Phone number' : 'Puhelinnumero'}" required>
                    <input type="email" placeholder="${isEN ? 'Email' : 'Sähköposti'}">
                    <textarea placeholder="${isEN ? 'Tell us about your cleaning needs...' : 'Kerro siivoustarpeistasi...'}"></textarea>
                    <button type="submit" class="ng-btn ng-btn-primary"><i class="fa-solid fa-paper-plane"></i> ${isEN ? 'Send Request' : 'Lähetä pyyntö'}</button>
                </form>
            </div>
        </div>
    </section>
    </main>

    <!-- City Links (Internal Linking for SEO) -->
    <div class="ng-city-links">
        <p>${isEN ? 'Cleaning services in other cities' : 'Siivouspalvelut muissa kaupungeissa'}</p>
        ${cityLinksHTML}
        <br><br>
        <a href="/" style="font-weight:600;color:var(--blue)">${isEN ? '← Back to Nordic Globe Home' : '← Takaisin Nordic Globe -etusivulle'}</a>
    </div>

    <!-- Footer -->
    <footer class="ng-footer">
        <div class="ng-footer-brand">Nordic Globe Oy</div>
        <p>${isEN ? 'Finland\'s trusted professional cleaning service since 2009.' : 'Suomen luotettu ammattimainen siivouspalvelu vuodesta 2009.'}</p>
        <div class="ng-footer-links">
            <a href="https://www.facebook.com/nordicglobe/" target="_blank" rel="noopener"><i class="fa-brands fa-facebook"></i> Facebook</a>
            <a href="https://www.instagram.com/nordic_globe_oy/" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i> Instagram</a>
            <a href="https://wa.me/${PHONE_INTL.replace('+','')}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
        </div>
        <div class="ng-footer-bottom">
            <p>&copy; 2025 Nordic Globe Oy · Y-tunnus: ${YTUNNUS} · Platinum AAA 2021 · ISO 9001 · ISO 14001</p>
        </div>
    </footer>

    <!-- Sticky CTA -->
    <div class="ng-sticky-cta">
        <a href="tel:${PHONE_INTL}" class="ng-sticky-btn ng-sticky-call"><i class="fa-solid fa-phone"></i> ${isEN ? 'Call' : 'Soita'}</a>
        <a href="https://wa.me/${PHONE_INTL.replace('+','')}" class="ng-sticky-btn ng-sticky-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
    </div>
</body>
</html>`};
}

// ============================================
// BLOG PAGE GENERATOR
// ============================================
const blogPosts = [
  {
    slugEN: 'best-cleaning-service-espoo', slugFI: 'paras-siivouspalvelu-espoo',
    titleEN: 'Best Cleaning Service in Espoo 2026 — Complete Guide',
    titleFI: 'Paras siivouspalvelu Espoossa 2026 — Täydellinen opas',
    descEN: 'Looking for the best cleaning service in Espoo? Compare top cleaning companies, prices, and services. Nordic Globe ranks #1 for professional cleaning.',
    descFI: 'Etsitkö parasta siivouspalvelua Espoossa? Vertaile parhaita siivousyrityksiä, hintoja ja palveluita. Nordic Globe on #1 ammattimainen siivouspalvelu.',
    contentEN: `<p>Finding a reliable cleaning service in Espoo can be challenging with so many options available. In this comprehensive guide, we break down what makes a great cleaning company and why Nordic Globe consistently ranks as the #1 choice for businesses and properties in Espoo.</p>
<h2>What to Look for in a Cleaning Service</h2>
<p>When choosing a cleaning company in Espoo, consider these critical factors:</p>
<ul><li><strong>Certifications:</strong> Look for ISO 9001 (quality) and ISO 14001 (environmental) certifications</li><li><strong>Insurance:</strong> Ensure full liability coverage — Nordic Globe is fully insured</li><li><strong>Experience:</strong> 15+ years in the industry matters</li><li><strong>Reviews:</strong> Check Google reviews — Nordic Globe has 4.8/5 from 127 reviews</li><li><strong>Tilaajavastuu:</strong> Registration proves legal compliance in Finland</li></ul>
<h2>Top Cleaning Services in Espoo</h2>
<p>Nordic Globe Oy stands out with Platinum AAA 2021 certification, 100+ trained professionals, and service coverage across all Espoo districts including Tapiola, Leppävaara, Matinkylä, and Otaniemi.</p>
<h2>Pricing</h2>
<p>Professional cleaning in Espoo typically ranges from €25-50/hour depending on the service type. Nordic Globe offers free on-site assessments and customized quotes — <a href="/cleaning-espoo#contact">request your free quote today</a>.</p>`,
    contentFI: `<p>Luotettavan siivouspalvelun löytäminen Espoosta voi olla haastavaa monien vaihtoehtojen joukosta. Tässä kattavassa oppaassa käymme läpi, mikä tekee siivousyrityksestä erinomaisen ja miksi Nordic Globe on jatkuvasti #1 valinta yrityksille ja kiinteistöille Espoossa.</p>
<h2>Mitä etsiä siivouspalvelusta</h2>
<p>Siivousyritystä valitessa Espoossa, ota huomioon nämä kriittiset tekijät:</p>
<ul><li><strong>Sertifikaatit:</strong> Etsi ISO 9001 (laatu) ja ISO 14001 (ympäristö) -sertifikaatteja</li><li><strong>Vakuutus:</strong> Varmista kattava vastuuvakuutus — Nordic Globe on täysin vakuutettu</li><li><strong>Kokemus:</strong> 15+ vuoden kokemus alalta merkitsee</li><li><strong>Arvostelut:</strong> Tarkista Google-arvostelut — Nordic Globella on 4.8/5 127 arvostelusta</li><li><strong>Tilaajavastuu:</strong> Rekisteröinti todistaa lakien noudattamisen Suomessa</li></ul>
<h2>Parhaat siivouspalvelut Espoossa</h2>
<p>Nordic Globe Oy erottuu Platinum AAA 2021 -sertifikaatilla, 100+ koulutetulla ammattilaisella ja palvelukattavuudella kaikissa Espoon kaupunginosissa mukaan lukien Tapiola, Leppävaara, Matinkylä ja Otaniemi.</p>
<h2>Hinnoittelu</h2>
<p>Ammattimainen siivous Espoossa maksaa tyypillisesti €25-50/tunti palvelutyypistä riippuen. Nordic Globe tarjoaa ilmaisen kohdearvioinnin ja räätälöidyn tarjouksen — <a href="/siivous-espoo#contact">pyydä ilmainen tarjous tänään</a>.</p>`
  },
  {
    slugEN: 'how-to-choose-cleaning-company-helsinki', slugFI: 'miten-valita-siivousyritys-helsinki',
    titleEN: 'How to Choose a Cleaning Company in Helsinki — Expert Tips',
    titleFI: 'Miten valita siivousyritys Helsingissä — Asiantuntijavinkit',
    descEN: 'Expert guide on choosing the right cleaning company in Helsinki. Learn what certifications, insurance, and quality standards to look for.',
    descFI: 'Asiantuntijaopas oikean siivousyrityksen valitsemiseen Helsingissä. Opi mitä sertifikaatteja, vakuutuksia ja laatustandardeja etsiä.',
    contentEN: `<p>Helsinki has hundreds of cleaning companies, but not all are created equal. Here's how to separate the professionals from the rest.</p>
<h2>5 Must-Have Criteria</h2>
<ol><li><strong>Tilaajavastuu Registration:</strong> This is non-negotiable in Finland. It proves the company pays taxes and follows labor laws.</li><li><strong>Platinum AAA Rating:</strong> Only the most financially stable companies earn this. Nordic Globe has held it since 2021.</li><li><strong>ISO Certifications:</strong> ISO 9001 for quality management, ISO 14001 for environmental responsibility.</li><li><strong>Proven Track Record:</strong> Look for companies with 10+ years of experience and verifiable customer reviews.</li><li><strong>Comprehensive Insurance:</strong> Full liability coverage protects your business.</li></ol>
<h2>Red Flags to Avoid</h2>
<p>Watch out for companies with no public reviews, no website, cash-only payment, and no business ID (Y-tunnus). These often indicate unregistered operators.</p>
<h2>Our Recommendation</h2>
<p>Nordic Globe Oy checks every box: Platinum AAA, ISO 9001 & 14001, Tilaajavastuu registered, 15+ years experience, and 4.8/5 Google rating. <a href="/cleaning-helsinki#contact">Get your free quote for Helsinki</a>.</p>`,
    contentFI: `<p>Helsingissä on satoja siivousyrityksiä, mutta kaikki eivät ole samanarvoisia. Näin erotat ammattilaiset muista.</p>
<h2>5 välttämätöntä kriteeriä</h2>
<ol><li><strong>Tilaajavastuu-rekisteröinti:</strong> Tämä on ehdoton vaatimus Suomessa. Se todistaa, että yritys maksaa verot ja noudattaa työlakeja.</li><li><strong>Platinum AAA -luokitus:</strong> Vain taloudellisesti vakaimmille yrityksille. Nordic Globe on pitänyt sen vuodesta 2021.</li><li><strong>ISO-sertifikaatit:</strong> ISO 9001 laadunhallintaan, ISO 14001 ympäristövastuuseen.</li><li><strong>Todistettu kokemus:</strong> Etsi yrityksiä joilla on 10+ vuoden kokemus ja todennettavat asiakasarvostelut.</li><li><strong>Kattava vakuutus:</strong> Täysi vastuuvakuutus suojaa yritystäsi.</li></ol>
<h2>Varoitusmerkit</h2>
<p>Varo yrityksiä joilla ei ole julkisia arvosteluja, verkkosivuja, vain käteismaksuja, eikä Y-tunnusta. Nämä viittaavat usein rekisteröimättömiin toimijoihin.</p>
<h2>Suosituksemme</h2>
<p>Nordic Globe Oy täyttää jokaisen kriteerin: Platinum AAA, ISO 9001 & 14001, Tilaajavastuu-rekisteröity, 15+ vuoden kokemus ja 4.8/5 Google-arvosana. <a href="/siivous-helsinki#contact">Pyydä ilmainen tarjous Helsinkiin</a>.</p>`
  }
];

function generateBlogPost(post, lang) {
  const isEN = lang === 'en';
  const slug = isEN ? post.slugEN : post.slugFI;
  const title = isEN ? post.titleEN : post.titleFI;
  const desc = isEN ? post.descEN : post.descFI;
  const content = isEN ? post.contentEN : post.contentFI;
  const filename = `blog/${slug}.html`;
  const otherSlug = isEN ? post.slugFI : post.slugEN;

  return { filename, content: `<!DOCTYPE html>
<html lang="${isEN ? 'en' : 'fi'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Nordic Globe</title>
    <meta name="description" content="${desc}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${SITE}/blog/${slug}">
    <link rel="alternate" hreflang="${isEN ? 'fi' : 'en'}" href="${SITE}/blog/${otherSlug}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:type" content="article">
    <meta name="theme-color" content="#0a0a0a">
    <link rel="icon" type="image/png" href="/logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Article","headline":"${title}","description":"${desc}","author":{"@type":"Organization","name":"Nordic Globe Oy"},"publisher":{"@type":"Organization","name":"Nordic Globe Oy","logo":{"@type":"ImageObject","url":"${SITE}/logo.png"}},"datePublished":"2026-03-26","dateModified":"2026-03-26","mainEntityOfPage":"${SITE}/blog/${slug}"}
    </script>
    <style>
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Inter',system-ui,sans-serif;color:#171717;background:#fff;line-height:1.7}
        .blog-nav{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,0.95);backdrop-filter:blur(20px);border-bottom:1px solid #e5e5e5;padding:0 24px}
        .blog-nav-inner{max-width:800px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px}
        .blog-nav a{text-decoration:none;color:#262626;font-weight:700;display:flex;align-items:center;gap:10px}
        .blog-nav img{height:36px;width:36px;border-radius:8px}
        .blog-nav-cta{background:#1877F2;color:#fff!important;padding:8px 20px;border-radius:50px;font-size:0.85rem}
        .blog-article{max-width:800px;margin:0 auto;padding:120px 24px 80px}
        .blog-article h1{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;letter-spacing:-0.02em;line-height:1.15;margin-bottom:24px}
        .blog-meta{font-size:0.85rem;color:#737373;margin-bottom:40px;display:flex;align-items:center;gap:16px}
        .blog-article h2{font-size:1.5rem;font-weight:800;margin:40px 0 16px;letter-spacing:-0.01em}
        .blog-article p{font-size:1.05rem;color:#525252;margin-bottom:20px}
        .blog-article ul,.blog-article ol{margin:0 0 20px 24px;color:#525252}
        .blog-article li{margin-bottom:8px;font-size:1rem}
        .blog-article a{color:#1877F2;text-decoration:underline}
        .blog-cta{background:#f5f5f5;border-radius:16px;padding:40px;text-align:center;margin-top:48px}
        .blog-cta h3{font-size:1.3rem;font-weight:800;margin-bottom:12px}
        .blog-cta p{color:#737373;margin-bottom:20px}
        .blog-cta a{display:inline-flex;align-items:center;gap:8px;background:#1877F2;color:#fff;padding:14px 28px;border-radius:50px;font-weight:600;text-decoration:none}
        .blog-footer{text-align:center;padding:40px 24px;border-top:1px solid #e5e5e5;font-size:0.8rem;color:#a3a3a3}
    </style>
</head>
<body>
    <nav class="blog-nav"><div class="blog-nav-inner"><a href="/"><img src="/logo.png" alt="Nordic Globe"> Nordic Globe</a><a href="/#contact" class="blog-nav-cta">${isEN ? 'Get Quote' : 'Pyydä tarjous'}</a></div></nav>
    <article class="blog-article">
        <h1>${title}</h1>
        <div class="blog-meta"><span>Nordic Globe</span><span>·</span><span>26.3.2026</span><span>·</span><span>${isEN ? '5 min read' : '5 min lukuaika'}</span></div>
        ${content}
        <div class="blog-cta">
            <h3>${isEN ? 'Need Professional Cleaning?' : 'Tarvitsetko ammattimaista siivousta?'}</h3>
            <p>${isEN ? 'Get a free quote from Finland\'s #1 cleaning service.' : 'Pyydä ilmainen tarjous Suomen #1 siivouspalvelulta.'}</p>
            <a href="/#contact"><i class="fa-solid fa-paper-plane"></i> ${isEN ? 'Get Free Quote' : 'Pyydä tarjous'}</a>
        </div>
    </article>
    <footer class="blog-footer">&copy; 2025 Nordic Globe Oy · Y-tunnus: ${YTUNNUS}</footer>
</body>
</html>`};
}

// ============================================
// GENERATE ALL PAGES
// ============================================
const outputDir = __dirname;
let generatedFiles = [];

// Create blog directory
const blogDir = path.join(outputDir, 'blog');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir);

// Generate city pages (EN + FI)
cities.forEach(city => {
  ['en', 'fi'].forEach(lang => {
    const page = generateCityPage(city, lang);
    fs.writeFileSync(path.join(outputDir, page.filename), page.content, 'utf8');
    generatedFiles.push(page.filename);
  });
});

// Generate blog posts (EN + FI)
blogPosts.forEach(post => {
  ['en', 'fi'].forEach(lang => {
    const page = generateBlogPost(post, lang);
    fs.writeFileSync(path.join(outputDir, page.filename), page.content, 'utf8');
    generatedFiles.push(page.filename);
  });
});

// Generate sitemap.xml
const sitemapEntries = [
  { loc: SITE + '/', priority: '1.0' },
  ...cities.flatMap(c => [
    { loc: `${SITE}/cleaning-${c.slug}`, priority: '0.9' },
    { loc: `${SITE}/siivous-${c.slug}`, priority: '0.9' }
  ]),
  ...blogPosts.flatMap(p => [
    { loc: `${SITE}/blog/${p.slugEN}`, priority: '0.7' },
    { loc: `${SITE}/blog/${p.slugFI}`, priority: '0.7' }
  ])
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.map(e => `    <url>
        <loc>${e.loc}</loc>
        <lastmod>2026-03-26</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${e.priority}</priority>
    </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap, 'utf8');

// Generate robots.txt
const robots = `User-agent: *
Allow: /
Sitemap: ${SITE}/sitemap.xml

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
`;
fs.writeFileSync(path.join(outputDir, 'robots.txt'), robots, 'utf8');

// Generate vercel.json for clean URLs
const rewrites = [
  ...cities.flatMap(c => [
    { source: `/cleaning-${c.slug}`, destination: `/cleaning-${c.slug}.html` },
    { source: `/siivous-${c.slug}`, destination: `/siivous-${c.slug}.html` }
  ]),
  ...blogPosts.flatMap(p => [
    { source: `/blog/${p.slugEN}`, destination: `/blog/${p.slugEN}.html` },
    { source: `/blog/${p.slugFI}`, destination: `/blog/${p.slugFI}.html` }
  ])
];

const vercelConfig = { cleanUrls: true, rewrites };
fs.writeFileSync(path.join(outputDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf8');

console.log(`\n✅ GENERATED ${generatedFiles.length} pages:`);
generatedFiles.forEach(f => console.log(`   📄 ${f}`));
console.log(`\n📋 sitemap.xml — ${sitemapEntries.length} URLs`);
console.log(`🤖 robots.txt`);
console.log(`⚙️  vercel.json — ${rewrites.length} rewrites`);
console.log('\n🚀 Ready to deploy!');
