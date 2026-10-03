// Page copy, FR / EN.
// Injected into index.html at build/dev time by the plugin in vite.config.js:
// every {{key}} becomes <span class="l-fr" lang="fr">…</span><span class="l-en" lang="en">…</span>
// so both languages are in the HTML from the first byte (no flash, works without JS).

const D = '<i class="dm" aria-hidden="true"></i>' // the "human decision" diamond

export const content = {
  // ── header
  'nav.problems': { fr: 'Problèmes', en: 'Problems' },
  'nav.method': { fr: 'Méthode', en: 'Method' },
  'nav.work': { fr: 'Exemples', en: 'Examples' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  'brand.role': { fr: 'IA &amp; automatisation pour PME', en: 'AI &amp; automation for SMEs' },
  'skip': { fr: 'Aller au contenu', en: 'Skip to content' },

  // ── hero
  'hero.title': { fr: 'Vous voulez de l’IA, mais vous ne savez pas <em class="hl-human">par où commencer.</em>', en: 'You want AI, but you don’t know <em class="hl-human">where to start.</em>' },
  'hero.cta': { fr: 'Réserver un appel de 30&nbsp;min', en: 'Book a 30-min call' },
  'hero.cta2': { fr: 'Voir des exemples', en: 'See examples' },

  // hero figure: "your Monday", the repetitive lines get done, one decision stays yours

  'h.day': { fr: 'Votre lundi', en: 'Your Monday' },
  'h.t0': { fr: 'Recopier les commandes dans le tableur', en: 'Copy orders into the spreadsheet' },
  'h.t1': { fr: 'Saisir les factures', en: 'Enter invoices' },
  'h.t2': { fr: 'Répondre aux questions SAV simples', en: 'Answer simple support questions' },
  'h.t3': { fr: 'Préparer les devis', en: 'Prepare quotes' },
  'h.t4': { fr: 'Trier les e-mails', en: 'Sort emails' },
  'h.t5': { fr: 'Mettre à jour les stocks', en: 'Update stock' },
  'h.t6': { fr: 'Relancer les impayés', en: 'Chase unpaid invoices' },
  'h.me': { fr: `${D}Choisir quels devis envoyer`, en: `${D}Choose which quotes to send` },

  // ── §01 problems (the client's words) → what changes for them
  'pb.title': { fr: 'Ça vous parle&nbsp;?', en: 'Sound familiar?' },
  'pb.1': { fr: 'Vous avez essayé l’IA, mais rien n’est resté.', en: 'You tried AI, but nothing stuck.' },
  'pb.1a': { fr: 'L’IA s’intègre à vos outils du quotidien.', en: 'AI built into the tools you already use.' },
  'pb.2': { fr: 'Vos équipes refont les mêmes tâches, chaque jour.', en: 'Your team repeats the same tasks, every day.' },
  'pb.2a': { fr: 'On peut les automatiser.', en: 'They can be automated.' },
  'pb.3': { fr: 'Votre activité grandit, pas votre équipe.', en: 'Your business is growing, your team isn’t.' },
  'pb.3a': { fr: 'Vos process absorbent la charge, avec la même équipe.', en: 'Your processes absorb the load, with the same team.' },
  'pb.4': { fr: 'Vous vous perdez dans des outils qui ne vous ressemblent pas.', en: 'You’re lost in tools that don’t fit how you work.' },
  'pb.4a': { fr: 'Un seul outil, construit autour de vos habitudes.', en: 'One tool, built around how you work.' },

  // ── §02 method: not a template
  'mt.title': { fr: 'Pas de modèle tout fait. Un outil à votre mesure.', en: 'No off-the-shelf template. A tool cut to fit you.' },
  'mt.tpl': { fr: 'Outil standard', en: 'Standard tool' },
  'mt.tpl.v': { fr: 'Vous vous adaptez à l’outil.', en: 'You bend to the tool.' },
  'mt.fit': { fr: 'Sur mesure', en: 'Made to measure' },
  'mt.fit.v': { fr: 'L’outil s’adapte à vous.', en: 'The tool fits you.' },
  'mt.s1.t': { fr: 'Votre réalité d’abord', en: 'Your reality first' },
  'mt.s1': { fr: 'Vos outils et vos contraintes, pas un catalogue.', en: 'Your tools and constraints, not a catalogue.' },
  'mt.s2.t': { fr: 'Conçu autour de vous', en: 'Designed around you' },
  'mt.s2': { fr: 'Chaque écran répond à un vrai besoin.', en: 'Every screen answers a real need.' },
  'mt.s3.t': { fr: 'Ajusté avec vous', en: 'Adjusted with you' },
  'mt.s3': { fr: 'Vous testez, l’outil est corrigé jusqu’à ce qu’il colle.', en: 'You test it, we adjust until it fits.' },

  // ── §03 examples: one 3D demo + one sentence each
  'wk.title': { fr: 'Trois projets, trois métiers.', en: 'Three projects, three industries.' },
  'wk.proj': { fr: 'Projet', en: 'Project' },

  'c1.name': { fr: 'E-commerce international', en: 'International e-commerce' },
  'c2.name': { fr: 'Agence de talents', en: 'Talent agency' },
  'c3.name': { fr: 'Assurance &amp; placements', en: 'Insurance &amp; investments' },
  'c1.result': { fr: 'Environ 12&nbsp;h de reporting par semaine en moins', en: 'About 12 hours of weekly reporting saved' },
  'c1.one': { fr: 'Une application interne réunit boutiques, publicités et fichiers.', en: 'An internal app brings stores, ads and files together.' },
  'c1.in1': { fr: 'Shopify', en: 'Shopify' },
  'c1.in1.sub': { fr: 'commandes', en: 'orders' },
  'c1.in1.tip': { fr: 'Les ventes de plusieurs boutiques, regroupées.', en: 'Sales from several stores, pulled together.' },
  'c1.in2': { fr: 'Meta Ads', en: 'Meta Ads' },
  'c1.in2.sub': { fr: 'campagnes', en: 'campaigns' },
  'c1.in2.tip': { fr: 'Les comptes publicitaires, comparés côte à côte.', en: 'Ad accounts, compared side by side.' },
  'c1.in3': { fr: 'Drive', en: 'Drive' },
  'c1.in3.sub': { fr: 'fichiers', en: 'files' },
  'c1.in3.tip': { fr: 'Les fichiers quittent Drive pour un stockage interne.', en: 'Files move off Drive to internal storage.' },
  'c1.core': { fr: 'App interne', en: 'Internal app' },
  'c1.core.tip': { fr: 'Conçue avec chaque service. Les appels aux API passent par un cache, ce qui tient les quotas et les coûts.', en: 'Designed with each department. API calls go through a cache, which keeps quotas and costs in check.' },
  'c1.o1': { fr: 'CA par boutique', en: 'Sales by store' },
  'c1.o1.tip': { fr: 'Un reporting financier toujours à jour.', en: 'Financial reporting that stays up to date.' },
  'c1.o2': { fr: 'ROAS campagnes', en: 'Campaign ROAS' },
  'c1.o2.tip': { fr: 'La performance des campagnes d’un coup d’œil. La publication reste manuelle.', en: 'Campaign performance at a glance. Publishing stays manual.' },
  'c1.o3': { fr: `Visuels produits ${D}`, en: `Product visuals ${D}` },
  'c1.o3.tip': { fr: 'Les images sont générées, puis une personne les valide avant usage.', en: 'Images are generated, then a person approves them before use.' },

  'c2.result': { fr: 'Une sélection de talents en 20&nbsp;min au lieu de 2&nbsp;h', en: 'A talent shortlist in 20&nbsp;min instead of 2&nbsp;h' },
  'c2.one': { fr: 'Une app Airtable filtre les talents et envoie les e-mails. Le choix final reste à la responsable.', en: 'An Airtable app filters talent and sends the emails. The final call stays with the manager.' },
  'c2.pool': { fr: 'Vivier', en: 'Talent pool' },
  'c2.in': { fr: 'Brief client', en: 'Client brief' },
  'c2.in.tip': { fr: 'Les demandes des clients arrivent dans une seule base.', en: 'Client requests land in a single base.' },
  'c2.core': { fr: 'Critères', en: 'Criteria' },
  'c2.core.tip': { fr: 'L’app ne garde que les talents qui collent à la demande et qui sont disponibles.', en: 'The app keeps only the talent that matches the request and is available.' },
  'c2.gate': { fr: `${D} Votre choix`, en: `${D} Your pick` },
  'c2.gate.tip': { fr: 'Vous choisissez qui proposer. Cette partie reste la vôtre.', en: 'You choose who to put forward. That part stays yours.' },
  'c2.o1': { fr: 'E-mail', en: 'Email' },
  'c2.o1.tip': { fr: 'Les e-mails partent seuls.', en: 'Emails go out on their own.' },
  'c2.o2': { fr: 'Formulaire', en: 'Form' },
  'c2.o2.tip': { fr: 'Les formulaires arrivent déjà préremplis.', en: 'Forms arrive already filled in.' },
  'c2.o3': { fr: 'Relance', en: 'Reminder' },
  'c2.o3.tip': { fr: 'Les rappels partent seuls, eux aussi.', en: 'Reminders go out on their own too.' },

  'c3.result': { fr: 'Un dossier client en 10&nbsp;min au lieu de 1&nbsp;h&nbsp;30', en: 'A client file in 10&nbsp;min instead of 1&nbsp;h&nbsp;30' },
  'c3.one': { fr: 'Les dossiers clients s’assemblent seuls, puis sortent en PDF.', en: 'Client files assemble themselves, then come out as a PDF.' },
  'c3.in1': { fr: 'Contrat', en: 'Contract' },
  'c3.in1.tip': { fr: 'Le type de contrat détermine une partie des sections.', en: 'The contract type decides some of the sections.' },
  'c3.in2': { fr: 'Situation', en: 'Situation' },
  'c3.in2.tip': { fr: 'La situation du client en détermine d’autres.', en: 'The client’s situation decides others.' },
  'c3.in3': { fr: 'Modèles Word', en: 'Word templates' },
  'c3.in3.tip': { fr: 'Chaque section est un modèle Word (DOCX) à part.', en: 'Each section is its own Word (DOCX) template.' },
  'c3.core': { fr: 'Table de règles', en: 'Rule table' },
  'c3.core.tip': { fr: 'Les règles, écrites d’abord sous Excel/VBA, puis passées sous Google Sheets et Apps Script.', en: 'The rules, first written in Excel/VBA, then moved to Google Sheets and Apps Script.' },
  'c3.o1': { fr: 'Dossier client', en: 'Client file' },
  'c3.o1.tip': { fr: 'Le dossier complet, en un seul PDF.', en: 'The complete file, as a single PDF.' },
  'c3.o2': { fr: `${D} À la main`, en: `${D} By hand` },
  'c3.o2.tip': { fr: 'Les données sensibles restent saisies à la main, et aucune décision de placement n’est automatisée.', en: 'Sensitive data is still entered by hand, and no investment decision is automated.' },
  'c3.b1': { fr: 'Recueil client', en: 'Client profile' },
  'c3.b2': { fr: 'Devoir de conseil', en: 'Advice report' },
  'c3.b3': { fr: 'Conditions', en: 'Terms' },


  // client quote
  'q.text': { fr: 'Antoine a transformé trois fichiers Excel éparpillés en un outil que toute l’équipe utilise chaque jour. Je n’ai plus à courir après les chiffres.', en: 'Antoine turned three scattered Excel files into a tool the whole team uses every day. I no longer have to chase the numbers.' },
  'q.who': { fr: 'Claire M., directrice des opérations, e-commerce', en: 'Claire M., operations director, e-commerce' },

  // ── §04 contact: 3D business card
  'ct.title': { fr: 'Parlons de votre projet.', en: 'Let’s talk about your project.' },
  'ct.book': { fr: 'Réserver un appel de 30&nbsp;min', en: 'Book a 30-min call' },
  'ct.role': { fr: 'IA &amp; automatisation pour PME', en: 'AI &amp; automation for SMEs' },
  'ct.back': { fr: 'Un outil à votre mesure.', en: 'A tool cut to fit you.' },
  'ct.share': { fr: 'Partager', en: 'Share' },
  'ct.vcard': { fr: 'Ajouter aux contacts', en: 'Add to contacts' },
  'ct.vcard.done': { fr: 'Ajouté aux contacts', en: 'Added to contacts' },

  // ── footer: mentions légales
  'ft.legal': { fr: 'Mentions légales', en: 'Legal notice' },
  'ft.k.pub': { fr: 'Éditeur du site', en: 'Publisher' },
  'ft.v.pub': { fr: 'Antoine Hostier, entrepreneur individuel, exerçant sous le nom DirectivAI.', en: 'Antoine Hostier, sole proprietor, trading as DirectivAI.' },
  'ft.k.siret': { fr: 'SIRET', en: 'SIRET' },
  'ft.v.siret': { fr: '952 701 415 00012', en: '952 701 415 00012' },
  'ft.k.addr': { fr: 'Adresse', en: 'Address' },
  'ft.v.addr': { fr: '9 rue des Colonnes, 75002 Paris, France', en: '9 rue des Colonnes, 75002 Paris, France' },
  'ft.k.contact': { fr: 'Contact', en: 'Contact' },
  'ft.k.dir': { fr: 'Directeur de la publication', en: 'Publication director' },
  'ft.v.dir': { fr: 'Antoine Hostier', en: 'Antoine Hostier' },
  'ft.k.host': { fr: 'Hébergeur', en: 'Host' },
  'ft.v.host': { fr: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis · vercel.com', en: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA · vercel.com' },
  'ft.k.data': { fr: 'Données personnelles', en: 'Personal data' },
  'ft.v.data': { fr: 'Aucun cookie, aucun outil de mesure d’audience. Seul le choix de langue est gardé dans votre navigateur (localStorage). La prise de rendez-vous passe par Calendly, qui applique sa propre politique de confidentialité.', en: 'No cookies, no analytics. Only your language choice is kept in your browser (localStorage). Booking goes through Calendly, which applies its own privacy policy.' },
  'ft.k.ctrl': { fr: 'Responsable du traitement', en: 'Data controller' },
  'ft.v.ctrl': { fr: 'Antoine Hostier.', en: 'Antoine Hostier.' },
  'ft.k.mail': { fr: 'E-mails', en: 'Emails' },
  'ft.v.mail': { fr: 'Les e-mails que vous envoyez servent uniquement à vous répondre. Ils ne sont jamais transmis à des tiers.', en: 'The emails you send are used only to reply to you. They are never shared with third parties.' },
  'ft.k.rights': { fr: 'Vos droits', en: 'Your rights' },
  'ft.v.rights': { fr: 'Accès, rectification, effacement et opposition (RGPD) : écrivez à <a href="mailto:netechoppe@proton.me">netechoppe@proton.me</a>. Vous pouvez aussi saisir la <a href="https://www.cnil.fr" rel="noopener" target="_blank">CNIL</a>.', en: 'Access, rectification, erasure and objection (GDPR): write to <a href="mailto:netechoppe@proton.me">netechoppe@proton.me</a>. You may also contact the <a href="https://www.cnil.fr" rel="noopener" target="_blank">CNIL</a>.' },
  'ft.k.logs': { fr: 'Journaux techniques', en: 'Technical logs' },
  'ft.v.logs': { fr: 'L’hébergeur peut conserver des journaux techniques de connexion (adresse IP) pour la sécurité du service.', en: 'The host may keep technical connection logs (IP address) for security.' },
  'ft.k.ip': { fr: 'Propriété intellectuelle', en: 'Intellectual property' },
  'ft.v.ip': { fr: 'Les textes, schémas et visuels de ce site sont la propriété d’Antoine Hostier. Toute reproduction sans accord est interdite.', en: 'The texts, diagrams and visuals on this site belong to Antoine Hostier. Reproduction without permission is prohibited.' },
  'ft.siret': { fr: 'SIRET 952 701 415 00012', en: 'SIRET 952 701 415 00012' },

  // background: 4 dated lines, no more (LinkedIn holds the rest)
  'pc.title': { fr: 'Parcours', en: 'Background' },
  'pc.d1': { fr: '2022 – auj.', en: '2022 – now' },
  'pc.t1': { fr: '<b>Consultant IA et développeur freelance</b>, DirectivAI. Des missions de bout en bout : besoin, solution, développement, mise en production, suivi.', en: '<b>Freelance AI consultant and developer</b>, DirectivAI. End-to-end projects: needs, solution, development, deployment, follow-up.' },
  'pc.t2': { fr: '<b>Deux produits SaaS</b> conçus et développés seul : TrackImmo (prospection immobilière) et TrackAutos (CRM automobile).', en: '<b>Two SaaS products</b> designed and built solo: TrackImmo (real-estate prospecting) and TrackAutos (car-dealer CRM).' },
  'pc.t3': { fr: '<b>Pratt &amp; Whitney Canada</b>, méthodes de fabrication de moteurs d’avion. <b>National Taiwan University</b>, vision par ordinateur.', en: '<b>Pratt &amp; Whitney Canada</b>, aircraft-engine manufacturing methods. <b>National Taiwan University</b>, computer vision.' },
  'pc.t4': { fr: '<b>Ingénieur, Polytechnique Montréal</b>. Échanges à Taïwan et au Mexique. Français, anglais.', en: '<b>Engineer, Polytechnique Montréal</b>. Exchanges in Taiwan and Mexico. French, English.' },

}
