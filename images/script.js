/* ===== À MODIFIER ICI SEULEMENT ===== */
const CONFIG = {
  tel:   "+237 6 87 27 94 32",
  wa:    "237687279432",       // les devis arrivent sur ce numéro WhatsApp
  email: "brightandtouchservice@gmail.com"
};
/* ==================================== */

const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Liens contact
$$("[data-tel]").forEach(e => e.href = "tel:" + CONFIG.tel.replace(/\s/g, ""));
$$("[data-wa]").forEach(e => e.href = "https://wa.me/" + CONFIG.wa);
$$("[data-email]").forEach(e => e.href = "mailto:" + CONFIG.email);
$$(".t-tel").forEach(e => e.textContent = CONFIG.tel);

// Menu téléphone
$("#burger").onclick = () => $("#menu").classList.toggle("open");
$$("#menu a").forEach(a => a.onclick = () => $("#menu").classList.remove("open"));

/* ===== TRADUCTION FR / EN ===== */
const EN = {
  nav1:"Results", nav2:"Services", nav3:"FAQ", nav4:"Free quote",
  kicker:"✨ Home cleaning service",
  h1a:"Bring the shine back to your",
  lead:"Sofas, mattresses, rugs, floors, showers and furniture: we come to your home and everything is clean and fresh again.",
  cta1:"Free quote on WhatsApp", cta2:"See the results",
  tr1:"At your home", tr2:"Free quote", tr3:"Safe products",
  b1:"100% at home", b2:"Free quote", b3:"Replies on WhatsApp", b4:"6 types of cleaning",
  r1:"Dirty, then clean", r2:"Drag to see the difference.",
  t1:"Sofa", t2:"Floor", t3:"Shower", tg1:"Before", tg2:"After",
  s0:"Our services",
  c1:"Sofas and armchairs", d1:"Fewer stains, odours and dust mites.",
  c2:"Mattresses", d2:"Disinfection and fast drying.",
  c3:"Rugs and carpets", d3:"Deep wash, brighter colours.",
  c4:"Floors", d4:"Tiles, marble, parquet: shine restored.",
  c5:"Showers and bathrooms", d5:"Limescale, mould and blackened grout.",
  c6:"Furniture and curtains", d6:"Tables, chairs, wardrobes, drapes.",
  y0:"Why choose us?", y1:"Fast service", y2:"Safe products", y3:"We come to you", y4:"Satisfaction guaranteed",
  e0:"How it works",
  e1:"<b>You write to us</b> and send a photo.",
  e2:"<b>You get a quote</b>, free and with no surprises.",
  e3:"<b>We come to your home</b> with all the equipment.",
  f0:"Frequently asked questions",
  q1:"Where do you work?", a1:"At your home, in your city and nearby areas. Send us your neighbourhood to confirm.",
  q2:"How do I get a price?", a2:"Send us a photo and a short description on WhatsApp or by e-mail: the quote is free.",
  q3:"Do I need to prepare anything?", a3:"No. We bring the equipment and the products.",
  q4:"How long does it take?", a4:"It depends on the size and condition. We give you an estimate with the quote.",
  k0:"Request a quote", k1:"💬 WhatsApp: write to us", k2:"🕖 Monday – Saturday: 7am – 6pm",
  p1:"Your name", p2:"Your neighbourhood", p3:"Details (optional)",
  o1:"Sofa / armchairs", o2:"Mattress", o3:"Rugs / carpet", o4:"Floors", o5:"Shower / bathroom", o6:"Furniture / curtains", o7:"Several things",
  k3:"Send on WhatsApp", k4:"Send by e-mail",
  hint:"You will be taken to WhatsApp: just press Send.",
  ft:"Bring the shine back to your space",
  bar1:"📞 Call"
};
const MOTS = {
  fr: ["espace", "canapé", "sol", "douche", "matelas"],
  en: ["space", "sofa", "floor", "shower", "mattress"]
};
const TITRE = {
  fr: document.title,
  en: "Bright and Touch Service – Sofa, floor and shower cleaning"
};

$$("[data-i18n]").forEach(e => e.dataset.fr = e.innerHTML);
$$("[data-ph]").forEach(e => e.dataset.frph = e.placeholder);

let lang = "fr", m = 0;
const sw = $("#swap");

function setLang(l) {
  lang = l;
  document.documentElement.lang = l;
  document.title = TITRE[l];
  $$("[data-i18n]").forEach(e => e.innerHTML = l === "en" ? (EN[e.dataset.i18n] ?? e.dataset.fr) : e.dataset.fr);
  $$("[data-ph]").forEach(e => e.placeholder = l === "en" ? EN[e.dataset.ph] : e.dataset.frph);
  $("#lang").textContent = l === "en" ? "🌐 FR" : "🌐 EN";
  m = 0;
  sw.textContent = MOTS[l][0];
  try { localStorage.setItem("lang", l); } catch (e) {}
}
$("#lang").onclick = () => setLang(lang === "fr" ? "en" : "fr");

// Mot qui change dans le titre
setInterval(() => {
  sw.classList.add("out");
  setTimeout(() => { m = (m + 1) % MOTS[lang].length; sw.textContent = MOTS[lang][m]; sw.classList.remove("out"); }, 350);
}, 2600);

// Se souvient du choix de langue du visiteur
try { if (localStorage.getItem("lang") === "en") setLang("en"); } catch (e) {}

// Barre de progression, menu, bouton "haut de page"
addEventListener("scroll", () => {
  const h = document.documentElement;
  $("#progress").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
  $("#nav").classList.toggle("scrolled", h.scrollTop > 30);
  $("#totop").classList.toggle("show", h.scrollTop > 600);
}, { passive: true });
$("#totop").onclick = () => scrollTo({ top: 0, behavior: "smooth" });

// Avant / Après
const P = {
  canape: ["canape-avant", "canape-apres"],
  sol:    ["sol-avant",    "sol-apres"],
  douche: ["douche-avant", "douche-apres"]
};
function show(k) {
  $("#la").style.backgroundImage = `url(images/${P[k][0]}.jpg)`;
  $("#lb").style.backgroundImage = `url(images/${P[k][1]}.jpg)`;
}
show("canape");
$$(".tab").forEach(b => b.onclick = () => {
  $(".tab.on").classList.remove("on");
  b.classList.add("on");
  show(b.dataset.k);
  demo();
});

let stop = false;
const setP = v => { $("#ba").style.setProperty("--p", v + "%"); $("#sl").value = v; };
function tween(a, b, ms, done) {
  const t0 = performance.now();
  (function f(t) {
    if (stop) return;
    const k = Math.min((t - t0) / ms, 1);
    const e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    setP(a + (b - a) * e);
    k < 1 ? requestAnimationFrame(f) : done && done();
  })(t0);
}
function demo() {
  stop = false;
  tween(50, 12, 900, () => tween(12, 88, 1400, () => tween(88, 50, 900)));
}
$("#sl").addEventListener("pointerdown", () => stop = true);
$("#sl").oninput = e => { stop = true; setP(e.target.value); };

new IntersectionObserver((es, o) => {
  if (es[0].isIntersecting) { demo(); o.disconnect(); }
}, { threshold: .6 }).observe($("#ba"));

// Formulaire : le message est écrit en français pour toi, avec la langue du client
const texte = () =>
  `Bonjour, je suis ${$("#nom").value} (${$("#quartier").value}). Je souhaite un devis pour : ${$("#service").value}. ${$("#msg").value}\n(Langue du client : ${lang === "en" ? "anglais" : "français"})`;

$("#form").onsubmit = e => {
  e.preventDefault();
  window.open("https://wa.me/" + CONFIG.wa + "?text=" + encodeURIComponent(texte()), "_blank");
};
$("#mailbtn").onclick = () => {
  if (!$("#nom").value || !$("#quartier").value) {
    alert(lang === "en" ? "Please enter your name and neighbourhood." : "Merci d'indiquer votre nom et votre quartier.");
    return;
  }
  location.href = "mailto:" + CONFIG.email +
    "?subject=" + encodeURIComponent("Demande de devis – " + $("#service").value) +
    "&body=" + encodeURIComponent(texte());
};

// Apparition au défilement
const items = $$(".card, .why div, .steps li, details, .ba, form, .infos a, h2");
items.forEach((el, i) => { el.classList.add("reveal"); el.style.transitionDelay = (i % 3) * 0.12 + "s"; });
const obs = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add("show"); obs.unobserve(en.target); }
}), { threshold: .12 });
items.forEach(el => obs.observe(el));
