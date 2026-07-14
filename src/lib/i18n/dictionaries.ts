import type { Locale } from "./config";

export type Dictionary = {
  brand: {
    tagline: string;
    headerDemo: string;
    session: string;
    demoIdentity: string;
    insufficientClearance: string;
  };
  nav: {
    dashboard: string;
    search: string;
    laws: string;
    experts: string;
    settings: string;
    scenarios: string;
    matrix: string;
    admin: string;
  };
  roles: {
    standard: string;
    vvip: string;
    sovereign: string;
    admin: string;
  };
  sectors: {
    energy: string;
    agriculture: string;
    security: string;
    investment: string;
  };
  risk: {
    confidence: string;
    green: string;
    yellow: string;
    red: string;
  };
  login: {
    subtitle: string;
    demoSession: string;
    demoSessionDesc: string;
    email: string;
    password: string;
    signIn: string;
    quickPick: string;
    autofillHint: string;
    invalidCreds: string;
    phase2: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    mapTitle: string;
    mapDesc: string;
    loadingMap: string;
    layerLegal: string;
    layerEconomic: string;
    layerSecurity: string;
    layerClassified: string;
    feedTitle: string;
    feedDesc: string;
  };
  search: {
    title: string;
    subtitle: string;
    panelTitle: string;
    panelDesc: string;
    query: string;
    sector: string;
    docType: string;
    from: string;
    to: string;
    all: string;
    retrieve: string;
    synthesize: string;
    synthesisTitle: string;
    synthesisDesc: string;
    legal: string;
    energy: string;
    agriculture: string;
    security: string;
    investment: string;
    law: string;
    decree: string;
    ordinance: string;
    report: string;
    other: string;
  };
  scenarios: {
    title: string;
    subtitle: string;
    levers: string;
    leversDesc: string;
    comparison: string;
    comparisonDesc: string;
    projectedCards: string;
    oilPrice: string;
    borderStability: string;
    taxPolicyChange: string;
    inflationShock: string;
    fdiInflow: string;
    baseline: string;
    projected: string;
  };
  matrix: {
    title: string;
    subtitle: string;
    matrixTitle: string;
    matrixDesc: string;
    narrativeTitle: string;
    narrativeDesc: string;
    impactArrow: string;
    impacts: string;
    intensity: string;
    legendTitle: string;
    legendHigh: string;
    legendMedium: string;
    legendLow: string;
    legendWeak: string;
    legendSelf: string;
    factors: Record<string, string>;
  };
  admin: {
    title: string;
    subtitle: string;
    uploadTitle: string;
    uploadDesc: string;
    uploadBtn: string;
    reindexBtn: string;
    queueTitle: string;
    queueDesc: string;
    queueEmpty: string;
    aiSummary: string;
    editBefore: string;
    approve: string;
    saveEdit: string;
  };
  laws: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterAll: string;
    filterInvestment: string;
    filterTax: string;
    filterTrade: string;
    filterEnergy: string;
    typeLaw: string;
    typeDecree: string;
    typeOrdinance: string;
    readMore: string;
    save: string;
    empty: string;
  };
  experts: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    fieldAll: string;
    fieldEconomy: string;
    fieldBusiness: string;
    fieldEducation: string;
    fieldEngineering: string;
    fieldFinance: string;
    fieldLaw: string;
    fieldMedicine: string;
    fieldTechnology: string;
    years: string;
    free: string;
    paid: string;
    contact: string;
    contactTitle: string;
    messageLabel: string;
    messagePlaceholder: string;
    send: string;
    sent: string;
    empty: string;
    contactLocked: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    saveYearly: string;
    perMonth: string;
    perYear: string;
    recommended: string;
    subscribe: string;
    currentPlan: string;
    processing: string;
    activated: string;
    payError: string;
    demoPayNote: string;
    upgradeHint: string;
    starter: string;
    professionnel: string;
    premium: string;
    starterBlurb: string;
    professionnelBlurb: string;
    premiumBlurb: string;
    featDashboard: string;
    featSearch: string;
    featLaws: string;
    featExpertsView: string;
    featExpertsContact: string;
    featScenarios: string;
    featMatrix: string;
    featClassified: string;
    featAdmin: string;
    featSupport: string;
    featSeats: string;
  };
  settings: {
    title: string;
    subtitle: string;
    tabGeneral: string;
    tabBilling: string;
    themeTitle: string;
    themeDesc: string;
    themeDark: string;
    themeLight: string;
    languageTitle: string;
    languageDesc: string;
    densityTitle: string;
    densityDesc: string;
    densityComfortable: string;
    densityCompact: string;
    comingSoon: string;
    billingTitle: string;
    billingDesc: string;
  };
  language: string;
};

const en: Dictionary = {
  brand: {
    tagline: "Situation Room",
    headerDemo: "ALG | GEOINT DEMO",
    session: "Session",
    demoIdentity: "Demo identity",
    insufficientClearance: "Insufficient clearance",
  },
  nav: {
    dashboard: "Dashboard",
    search: "Semantic Search",
    laws: "Laws",
    experts: "Experts",
    settings: "Settings",
    scenarios: "What-If",
    matrix: "Cross-Impact",
    admin: "Admin CMS",
  },
  roles: {
    standard: "Standard Analyst",
    vvip: "VVIP",
    sovereign: "Sovereign",
    admin: "Admin",
  },
  sectors: {
    energy: "Energy & Hydrocarbons",
    agriculture: "Agriculture & Food",
    security: "Security & Borders",
    investment: "Investment Climate",
  },
  risk: {
    confidence: "confidence",
    green: "green",
    yellow: "yellow",
    red: "red",
  },
  login: {
    subtitle:
      "Strategic intelligence briefing prototype for Algeria. Use a demo account below — credentials autofill for testing.",
    demoSession: "Demo login",
    demoSessionDesc:
      "Pick a test persona to autofill email & password, then sign in",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    quickPick: "Quick-fill test roles",
    autofillHint: "Click a role to fill the form",
    invalidCreds: "Unknown demo credentials. Use a quick-fill role.",
    phase2:
      "Phase 2 roadmap (not in this build): trained ML models, Delphi expert panel, microservices, enterprise vector DB, hardware MFA / legal certification, WebSocket infra.",
  },
  dashboard: {
    title: "Operations Dashboard",
    subtitle:
      "Algeria-centered risk picture with live feed and toggleable layers. Indices use a documented weighted formula | presented with confidence and trends for briefing realism.",
    mapTitle: "Algeria | Regional risk layers",
    mapDesc:
      "Clickable sample GeoJSON | toggle layers | classified requires Sovereign+",
    loadingMap: "Loading map…",
    layerLegal: "Legal risk",
    layerEconomic: "Economic",
    layerSecurity: "Security zones",
    layerClassified: "Classified",
    feedTitle: "Live Intelligence Feed",
    feedDesc: "Polling every {seconds}s | seeded alerts + synthetic ticks",
  },
  search: {
    title: "Semantic Search",
    subtitle:
      "RAG over sample Journal Officiel excerpts and sector notes. Retrieve ranked chunks, then synthesize with citations.",
    panelTitle: "Semantic search",
    panelDesc:
      "Natural-language RAG over sample Journal Officiel / sector texts",
    query: "Query",
    sector: "Sector",
    docType: "Document type",
    from: "From",
    to: "To",
    all: "All",
    retrieve: "Retrieve chunks",
    synthesize: "Synthesize answer",
    synthesisTitle: "LLM synthesis",
    synthesisDesc: "Citations linked to retrieved passages",
    legal: "Legal",
    energy: "Energy",
    agriculture: "Agriculture",
    security: "Security",
    investment: "Investment",
    law: "Law",
    decree: "Decree",
    ordinance: "Ordinance",
    report: "Report",
    other: "Other",
  },
  scenarios: {
    title: "What-If Scenario Builder",
    subtitle:
      "VVIP+ clearance. Move the levers to recalculate sector risk live.",
    levers: "Scenario levers",
    leversDesc: "Transparent weighted formula | see src/lib/risk-scoring.ts",
    comparison: "Before / after risk indices",
    comparisonDesc: "Animated comparison of projected risk indices",
    projectedCards: "Projected sector cards",
    oilPrice: "Oil price",
    borderStability: "Border stability",
    taxPolicyChange: "Tax policy change",
    inflationShock: "Inflation",
    fdiInflow: "FDI inflow",
    baseline: "baseline",
    projected: "projected",
  },
  matrix: {
    title: "Cross-Impact Matrix",
    subtitle:
      "Simulated exploratory module. Click a cell for hand-written impact narratives (Phase 2: expert Delphi / causal graphs).",
    matrixTitle: "Cross-impact matrix",
    matrixDesc: "Simulated module | hand-written narratives, exploratory UI",
    narrativeTitle: "Impact narrative",
    narrativeDesc: "Pre-written sample analysis",
    impactArrow: "Impact →",
    impacts: "impacts",
    intensity: "Intensity",
    legendTitle: "Color = cross-impact intensity",
    legendHigh: "High (≥70%)",
    legendMedium: "Medium (45–69%)",
    legendLow: "Low (25–44%)",
    legendWeak: "Weak (<25%)",
    legendSelf: "Diagonal = self (not a cross-impact)",
    factors: {
      "Oil price shock": "Oil price shock",
      "Border instability": "Border instability",
      "Tax reform": "Tax reform",
      "Drought / agri stress": "Drought / agri stress",
      "FDI surge": "FDI surge",
    },
  },
  admin: {
    title: "Admin / CMS",
    subtitle:
      "Upload documents into the RAG pipeline and verify AI summaries before they go live.",
    uploadTitle: "PDF / document upload",
    uploadDesc:
      "Triggers Module 2 ingestion | drop files into data/source-documents or upload here",
    uploadBtn: "Upload & ingest",
    reindexBtn: "Reindex source folder",
    queueTitle: "Verification queue",
    queueDesc: "Approve or edit AI-generated summaries before go-live",
    queueEmpty: "Queue empty | run reindex to seed.",
    aiSummary: "AI summary",
    editBefore: "Edit before approve",
    approve: "Approve → live",
    saveEdit: "Save edit & approve",
  },
  laws: {
    title: "Laws & Regulations",
    subtitle: "Search investment-related laws and decrees",
    searchPlaceholder: "Search for a law…",
    filterAll: "All",
    filterInvestment: "Investment laws",
    filterTax: "Tax laws",
    filterTrade: "Trade laws",
    filterEnergy: "Energy laws",
    typeLaw: "Law",
    typeDecree: "Decree",
    typeOrdinance: "Ordinance",
    readMore: "Read more",
    save: "Save",
    empty: "No laws match your filters.",
  },
  experts: {
    title: "Experts",
    subtitle: "Consult with experts in various fields",
    searchPlaceholder: "Search for an expert…",
    fieldAll: "All",
    fieldEconomy: "Economy",
    fieldBusiness: "Business",
    fieldEducation: "Education",
    fieldEngineering: "Engineering",
    fieldFinance: "Finance",
    fieldLaw: "Law",
    fieldMedicine: "Medicine",
    fieldTechnology: "Technology",
    years: "+{n} years",
    free: "Free",
    paid: "Paid",
    contact: "Contact",
    contactTitle: "Request a consultation",
    messageLabel: "Message",
    messagePlaceholder: "Describe your briefing need…",
    send: "Send request",
    sent: "Request recorded (demo). The expert will be notified.",
    empty: "No experts in this field yet.",
    contactLocked:
      "Expert contact requires Professionnel or Premium. Upgrade under Settings → Plan & billing.",
  },
  pricing: {
    title: "Plan & billing",
    subtitle: "Choose a self-serve access tier for this demo.",
    monthly: "Monthly",
    yearly: "Yearly",
    saveYearly: "−2 mo",
    perMonth: "/ month · excl. tax",
    perYear: "/ year · excl. tax",
    recommended: "Recommended",
    subscribe: "Subscribe (demo pay)",
    currentPlan: "Current plan",
    processing: "Processing…",
    activated: "Plan {plan} activated (demo payment).",
    payError: "Payment could not be completed.",
    demoPayNote:
      "Demo checkout only — no real card charge. Ready to wire CIB / Stripe later for production.",
    upgradeHint: "Upgrade plan",
    starter: "Starter",
    professionnel: "Professionnel",
    premium: "Premium",
    starterBlurb: "Individual analyst — core dashboard & legal catalogue",
    professionnelBlurb: "Teams — scenarios, expert contact, priority support",
    premiumBlurb: "Enterprise — classified layer, admin CMS, larger seat pack",
    featDashboard: "Operations dashboard & live feed",
    featSearch: "Semantic search (RAG)",
    featLaws: "Laws & regulations catalogue",
    featExpertsView: "Experts directory",
    featExpertsContact: "Contact / consultation requests",
    featScenarios: "What-If scenario builder",
    featMatrix: "Cross-impact matrix",
    featClassified: "Classified map layer",
    featAdmin: "Admin CMS & ingestion",
    featSupport: "Priority briefing support",
    featSeats: "Up to {n} seats",
  },
  settings: {
    title: "Settings",
    subtitle: "Theme, language, and plan & billing for this demo workspace.",
    tabGeneral: "General",
    tabBilling: "Plan & billing",
    themeTitle: "Theme",
    themeDesc: "Situation-room dark is default; light for bright environments.",
    themeDark: "Dark",
    themeLight: "Light",
    languageTitle: "Language",
    languageDesc: "Interface language (Arabic uses RTL).",
    densityTitle: "Density",
    densityDesc: "Control spacing in lists and cards.",
    densityComfortable: "Comfortable",
    densityCompact: "Compact",
    comingSoon: "Compact mode coming in a later build.",
    billingTitle: "Plan & billing",
    billingDesc: "Manage your subscription tier and demo payment.",
  },
  language: "Language",
};

const fr: Dictionary = {
  brand: {
    tagline: "Salle de situation",
    headerDemo: "ALG | GEOINT DÉMO",
    session: "Session",
    demoIdentity: "Identité démo",
    insufficientClearance: "Habilitation insuffisante",
  },
  nav: {
    dashboard: "Tableau de bord",
    search: "Recherche sémantique",
    laws: "Lois",
    experts: "Experts",
    settings: "Paramètres",
    scenarios: "Scénarios",
    matrix: "Impacts croisés",
    admin: "Admin CMS",
  },
  roles: {
    standard: "Analyste standard",
    vvip: "VVIP",
    sovereign: "Souverain",
    admin: "Admin",
  },
  sectors: {
    energy: "Énergie & hydrocarbures",
    agriculture: "Agriculture & alimentation",
    security: "Sécurité & frontières",
    investment: "Climat d'investissement",
  },
  risk: {
    confidence: "confiance",
    green: "vert",
    yellow: "jaune",
    red: "rouge",
  },
  login: {
    subtitle:
      "Prototype de briefing en renseignement stratégique pour l'Algérie. Utilisez un compte démo — identifiants préremplis pour les tests.",
    demoSession: "Connexion démo",
    demoSessionDesc:
      "Choisissez un persona test pour remplir email & mot de passe, puis connectez-vous",
    email: "E-mail",
    password: "Mot de passe",
    signIn: "Se connecter",
    quickPick: "Rôles test (remplissage auto)",
    autofillHint: "Cliquez un rôle pour remplir le formulaire",
    invalidCreds: "Identifiants démo inconnus. Utilisez un rôle rapide.",
    phase2:
      "Feuille de route Phase 2 (hors périmètre) : modèles ML entraînés, panel Delphi, microservices, base vectorielle entreprise, MFA matériel / certification juridique, infra WebSocket.",
  },
  dashboard: {
    title: "Tableau de bord opérationnel",
    subtitle:
      "Vue risque centrée sur l'Algérie avec flux en direct et couches commutables. Les indices utilisent une formule pondérée documentée | présentés avec confiance et tendances pour le réalisme du briefing.",
    mapTitle: "Algérie | Couches de risque régionales",
    mapDesc:
      "GeoJSON d'exemple cliquable | basculez les couches | classifié réservé Souverain+",
    loadingMap: "Chargement de la carte…",
    layerLegal: "Risque juridique",
    layerEconomic: "Économique",
    layerSecurity: "Zones de sécurité",
    layerClassified: "Classifié",
    feedTitle: "Flux de renseignement en direct",
    feedDesc: "Actualisation toutes les {seconds}s | alertes seed + ticks synthétiques",
  },
  search: {
    title: "Recherche sémantique",
    subtitle:
      "RAG sur extraits du Journal Officiel et notes sectorielles. Récupérez des passages classés, puis synthétisez avec citations.",
    panelTitle: "Recherche sémantique",
    panelDesc:
      "RAG en langage naturel sur textes JORADP / sectoriels d'exemple",
    query: "Requête",
    sector: "Secteur",
    docType: "Type de document",
    from: "Du",
    to: "Au",
    all: "Tous",
    retrieve: "Récupérer les passages",
    synthesize: "Synthétiser la réponse",
    synthesisTitle: "Synthèse LLM",
    synthesisDesc: "Citations liées aux passages récupérés",
    legal: "Juridique",
    energy: "Énergie",
    agriculture: "Agriculture",
    security: "Sécurité",
    investment: "Investissement",
    law: "Loi",
    decree: "Décret",
    ordinance: "Ordonnance",
    report: "Rapport",
    other: "Autre",
  },
  scenarios: {
    title: "Constructeur de scénarios",
    subtitle:
      "Habilitation VVIP+. Déplacez les curseurs pour recalculer le risque en direct.",
    levers: "Leviers de scénario",
    leversDesc: "Formule pondérée transparente | voir src/lib/risk-scoring.ts",
    comparison: "Indices avant / après",
    comparisonDesc: "Comparaison animée des indices de risque projetés",
    projectedCards: "Cartes sectorielles projetées",
    oilPrice: "Prix du pétrole",
    borderStability: "Stabilité frontalière",
    taxPolicyChange: "Changement fiscal",
    inflationShock: "Inflation",
    fdiInflow: "Flux d'IDE",
    baseline: "référence",
    projected: "projeté",
  },
  matrix: {
    title: "Matrice d'impacts croisés",
    subtitle:
      "Module simulé exploratoire. Cliquez une cellule pour une narration d'impact rédigée (Phase 2 : Delphi / graphes causaux).",
    matrixTitle: "Matrice d'impacts croisés",
    matrixDesc: "Module simulé | narrations rédigées, UI exploratoire",
    narrativeTitle: "Narration d'impact",
    narrativeDesc: "Analyse d'exemple pré-écrite",
    impactArrow: "Impact →",
    impacts: "impacte",
    intensity: "Intensité",
    legendTitle: "Couleur = intensité de l'impact croisé",
    legendHigh: "Élevé (≥70 %)",
    legendMedium: "Moyen (45–69 %)",
    legendLow: "Faible (25–44 %)",
    legendWeak: "Très faible (<25 %)",
    legendSelf: "Diagonale = soi (pas un impact croisé)",
    factors: {
      "Oil price shock": "Choc pétrolier",
      "Border instability": "Instabilité frontalière",
      "Tax reform": "Réforme fiscale",
      "Drought / agri stress": "Sécheresse / stress agricole",
      "FDI surge": "Afflux d'IDE",
    },
  },
  admin: {
    title: "Admin / CMS",
    subtitle:
      "Chargez des documents dans le pipeline RAG et validez les résumés IA avant mise en ligne.",
    uploadTitle: "Téléversement PDF / document",
    uploadDesc:
      "Déclenche l'ingestion Module 2 | déposez dans data/source-documents ou téléversez ici",
    uploadBtn: "Téléverser & ingérer",
    reindexBtn: "Réindexer le dossier source",
    queueTitle: "File de vérification",
    queueDesc: "Approuver ou éditer les résumés IA avant mise en ligne",
    queueEmpty: "File vide | lancez la réindexation pour initialiser.",
    aiSummary: "Résumé IA",
    editBefore: "Éditer avant approbation",
    approve: "Approuver → en ligne",
    saveEdit: "Enregistrer l'édition & approuver",
  },
  laws: {
    title: "Lois & réglementations",
    subtitle: "Rechercher les lois et décrets liés à l'investissement",
    searchPlaceholder: "Rechercher une loi…",
    filterAll: "Toutes",
    filterInvestment: "Lois d'investissement",
    filterTax: "Lois fiscales",
    filterTrade: "Lois commerciales",
    filterEnergy: "Lois énergie",
    typeLaw: "Loi",
    typeDecree: "Décret",
    typeOrdinance: "Ordonnance",
    readMore: "Lire plus",
    save: "Enregistrer",
    empty: "Aucune loi ne correspond à vos filtres.",
  },
  experts: {
    title: "Experts",
    subtitle: "Consultez des experts dans divers domaines",
    searchPlaceholder: "Rechercher un expert…",
    fieldAll: "Tous",
    fieldEconomy: "Économie",
    fieldBusiness: "Affaires",
    fieldEducation: "Éducation",
    fieldEngineering: "Ingénierie",
    fieldFinance: "Finance",
    fieldLaw: "Droit",
    fieldMedicine: "Médecine",
    fieldTechnology: "Technologie",
    years: "+{n} ans",
    free: "Gratuit",
    paid: "Payant",
    contact: "Contacter",
    contactTitle: "Demander une consultation",
    messageLabel: "Message",
    messagePlaceholder: "Décrivez votre besoin de briefing…",
    send: "Envoyer la demande",
    sent: "Demande enregistrée (démo). L'expert sera notifié.",
    empty: "Aucun expert dans ce domaine pour l'instant.",
    contactLocked:
      "Le contact expert nécessite Professionnel ou Premium. Passez par Paramètres → Offre & facturation.",
  },
  pricing: {
    title: "Offre & facturation",
    subtitle: "Choisissez un palier d'accès self-serve pour cette démo.",
    monthly: "Mensuel",
    yearly: "Annuel",
    saveYearly: "−2 mois",
    perMonth: "/ mois · HT",
    perYear: "/ an · HT",
    recommended: "Recommandé",
    subscribe: "S'abonner (paiement démo)",
    currentPlan: "Offre actuelle",
    processing: "Traitement…",
    activated: "Offre {plan} activée (paiement démo).",
    payError: "Paiement impossible.",
    demoPayNote:
      "Checkout démo uniquement — pas de carte réelle. Prêt pour CIB / Stripe en production.",
    upgradeHint: "Surclasser l'offre",
    starter: "Starter",
    professionnel: "Professionnel",
    premium: "Premium",
    starterBlurb: "Analyste individuel — tableau de bord & catalogue juridique",
    professionnelBlurb: "Équipes — scénarios, contact experts, support prioritaire",
    premiumBlurb: "Entreprise — couche classifiée, CMS admin, pack de sièges",
    featDashboard: "Tableau de bord & flux live",
    featSearch: "Recherche sémantique (RAG)",
    featLaws: "Catalogue lois & réglementations",
    featExpertsView: "Annuaire d'experts",
    featExpertsContact: "Contact / demandes de consultation",
    featScenarios: "Constructeur de scénarios",
    featMatrix: "Matrice d'impacts croisés",
    featClassified: "Couche carte classifiée",
    featAdmin: "CMS admin & ingestion",
    featSupport: "Support briefing prioritaire",
    featSeats: "Jusqu'à {n} sièges",
  },
  settings: {
    title: "Paramètres",
    subtitle: "Thème, langue, et offre & facturation pour cet espace démo.",
    tabGeneral: "Général",
    tabBilling: "Offre & facturation",
    themeTitle: "Thème",
    themeDesc: "Sombre salle de situation par défaut ; clair pour environnements lumineux.",
    themeDark: "Sombre",
    themeLight: "Clair",
    languageTitle: "Langue",
    languageDesc: "Langue de l'interface (l'arabe active le RTL).",
    densityTitle: "Densité",
    densityDesc: "Espacement des listes et cartes.",
    densityComfortable: "Confortable",
    densityCompact: "Compact",
    comingSoon: "Mode compact dans une version ultérieure.",
    billingTitle: "Offre & facturation",
    billingDesc: "Gérez votre palier d'abonnement et le paiement démo.",
  },
  language: "Langue",
};

const ar: Dictionary = {
  brand: {
    tagline: "غرفة العمليات",
    headerDemo: "الجزائر | هندسة استخباراتية تجريبية",
    session: "الجلسة",
    demoIdentity: "هوية العرض",
    insufficientClearance: "صلاحية غير كافية",
  },
  nav: {
    dashboard: "لوحة القيادة",
    search: "البحث الدلالي",
    laws: "القوانين",
    experts: "الخبراء",
    settings: "الإعدادات",
    scenarios: "ماذا لو",
    matrix: "التأثيرات المتقاطعة",
    admin: "إدارة المحتوى",
  },
  roles: {
    standard: "محلل قياسي",
    vvip: "VVIP",
    sovereign: "سيادي",
    admin: "مسؤول",
  },
  sectors: {
    energy: "الطاقة والمحروقات",
    agriculture: "الزراعة والغذاء",
    security: "الأمن والحدود",
    investment: "مناخ الاستثمار",
  },
  risk: {
    confidence: "الثقة",
    green: "أخضر",
    yellow: "أصفر",
    red: "أحمر",
  },
  login: {
    subtitle:
      "نموذج أولي لإحاطة استخباراتية استراتيجية للسوق الجزائرية. استخدم حسابًا تجريبيًا — تُملأ بيانات الدخول تلقائيًا للاختبار.",
    demoSession: "تسجيل دخول تجريبي",
    demoSessionDesc:
      "اختر شخصية اختبار لملء البريد وكلمة المرور، ثم سجّل الدخول",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    quickPick: "أدوار اختبار (تعبئة تلقائية)",
    autofillHint: "انقر دورًا لملء النموذج",
    invalidCreds: "بيانات تجريبية غير معروفة. استخدم دورًا سريعًا.",
    phase2:
      "خارطة الطريق للمرحلة 2 (خارج هذا البناء): نماذج تعلم آلي مدرّبة، لجنة خبراء دلفى، خدمات مصغّرة، قاعدة متجهات مؤسسية، مصادقة متعددة العوامل المادية / اعتماد قانوني، بنية WebSocket.",
  },
  dashboard: {
    title: "لوحة العمليات",
    subtitle:
      "صورة مخاطر متمحورة حول الجزائر مع بث مباشر وطبقات قابلة للتبديل. تُحسب المؤشرات بصيغة مرجّحة موثّقة | مع نسب ثقة واتجاهات لإحاطة واقعية.",
    mapTitle: "الجزائر | طبقات المخاطر الإقليمية",
    mapDesc:
      "بيانات GeoJSON قابلة للنقر | بدّل الطبقات | الطبقة السرية تتطلب صلاحية سيادية+",
    loadingMap: "جاري تحميل الخريطة…",
    layerLegal: "المخاطر القانونية",
    layerEconomic: "اقتصادي",
    layerSecurity: "مناطق أمنية",
    layerClassified: "سري",
    feedTitle: "بث استخباراتي مباشر",
    feedDesc: "تحديث كل {seconds} ث | تنبيهات أولية + نبضات اصطناعية",
  },
  search: {
    title: "البحث الدلالي",
    subtitle:
      "استرجاع معزز بالتوليد على مقتطفات الجريدة الرسمية وملاحظات قطاعية. استرجع المقاطع المرتبة ثم أنشئ توليفًا مع الاستشهادات.",
    panelTitle: "البحث الدلالي",
    panelDesc: "بحث باللغة الطبيعية على نصوص الجريدة الرسمية / القطاعية النموذجية",
    query: "الاستعلام",
    sector: "القطاع",
    docType: "نوع الوثيقة",
    from: "من",
    to: "إلى",
    all: "الكل",
    retrieve: "استرجاع المقاطع",
    synthesize: "توليف الإجابة",
    synthesisTitle: "توليف النموذج اللغوي",
    synthesisDesc: "استشهادات مرتبطة بالمقاطع المسترجعة",
    legal: "قانوني",
    energy: "الطاقة",
    agriculture: "الزراعة",
    security: "الأمن",
    investment: "الاستثمار",
    law: "قانون",
    decree: "مرسوم",
    ordinance: "أمر",
    report: "تقرير",
    other: "أخرى",
  },
  scenarios: {
    title: "منشئ سيناريوهات ماذا لو",
    subtitle:
      "صلاحية VVIP+. حرّك المؤشرات لإعادة حساب المخاطر مباشرة.",
    levers: "محددات السيناريو",
    leversDesc: "صيغة مرجّحة شفافة | انظر src/lib/risk-scoring.ts",
    comparison: "مؤشرات المخاطر قبل / بعد",
    comparisonDesc: "مقارنة متحركة لمؤشرات المخاطر المتوقعة",
    projectedCards: "بطاقات القطاعات المتوقعة",
    oilPrice: "سعر النفط",
    borderStability: "استقرار الحدود",
    taxPolicyChange: "تغيير السياسة الضريبية",
    inflationShock: "التضخم",
    fdiInflow: "تدفق الاستثمار الأجنبي",
    baseline: "خط الأساس",
    projected: "متوقع",
  },
  matrix: {
    title: "مصفوفة التأثيرات المتقاطعة",
    subtitle:
      "وحدة محاكاة استكشافية. انقر خلية لعرض سرد تأثير مكتوب يدويًا (المرحلة 2: دلفى / رسوم سببية).",
    matrixTitle: "مصفوفة التأثيرات المتقاطعة",
    matrixDesc: "وحدة محاكاة | سرديات مكتوبة، واجهة استكشافية",
    narrativeTitle: "سرد التأثير",
    narrativeDesc: "تحليل نموذجي مكتوب مسبقًا",
    impactArrow: "التأثير ←",
    impacts: "يؤثر على",
    intensity: "الشدة",
    legendTitle: "اللون = شدة التأثير المتقاطع",
    legendHigh: "مرتفع (≥70٪)",
    legendMedium: "متوسط (45–69٪)",
    legendLow: "منخفض (25–44٪)",
    legendWeak: "ضعيف (<25٪)",
    legendSelf: "القطر = ذاتي (ليس تأثيرًا متقاطعًا)",
    factors: {
      "Oil price shock": "صدمة أسعار النفط",
      "Border instability": "عدم استقرار الحدود",
      "Tax reform": "إصلاح ضريبي",
      "Drought / agri stress": "جفاف / ضغط زراعي",
      "FDI surge": "طفرة استثمار أجنبي",
    },
  },
  admin: {
    title: "الإدارة / نظام المحتوى",
    subtitle:
      "ارفع الوثائق إلى مسار الاسترجاع المعزز وتحقق من ملخصات الذكاء الاصطناعي قبل النشر.",
    uploadTitle: "رفع PDF / وثيقة",
    uploadDesc:
      "يشغّل مسار الاستيعاب | ضع الملفات في data/source-documents أو ارفع هنا",
    uploadBtn: "رفع واستيعاب",
    reindexBtn: "إعادة فهرسة مجلد المصدر",
    queueTitle: "قائمة التحقق",
    queueDesc: "وافق على ملخصات الذكاء الاصطناعي أو عدّلها قبل النشر",
    queueEmpty: "القائمة فارغة | شغّل إعادة الفهرسة للتهيئة.",
    aiSummary: "ملخص الذكاء الاصطناعي",
    editBefore: "عدّل قبل الموافقة",
    approve: "موافقة → نشر",
    saveEdit: "حفظ التعديل والموافقة",
  },
  laws: {
    title: "القوانين والتنظيمات",
    subtitle: "ابحث عن القوانين والمراسيم المتعلقة بالاستثمار",
    searchPlaceholder: "ابحث عن قانون…",
    filterAll: "الكل",
    filterInvestment: "قوانين الاستثمار",
    filterTax: "قوانين الضرائب",
    filterTrade: "قوانين التجارة",
    filterEnergy: "قوانين الطاقة",
    typeLaw: "قانون",
    typeDecree: "مرسوم",
    typeOrdinance: "أمر",
    readMore: "قراءة المزيد",
    save: "حفظ",
    empty: "لا توجد قوانين مطابقة للتصفية.",
  },
  experts: {
    title: "الخبراء",
    subtitle: "استشر خبراء في مجالات متعددة",
    searchPlaceholder: "ابحث عن خبير…",
    fieldAll: "الكل",
    fieldEconomy: "اقتصاد",
    fieldBusiness: "أعمال",
    fieldEducation: "تعليم",
    fieldEngineering: "هندسة",
    fieldFinance: "مالية",
    fieldLaw: "قانون",
    fieldMedicine: "طب",
    fieldTechnology: "تكنولوجيا",
    years: "+{n} سنوات",
    free: "مجاني",
    paid: "مدفوع",
    contact: "تواصل",
    contactTitle: "طلب استشارة",
    messageLabel: "الرسالة",
    messagePlaceholder: "صف احتياج الإحاطة…",
    send: "إرسال الطلب",
    sent: "تم تسجيل الطلب (عرض تجريبي). سيُخطَّر الخبير.",
    empty: "لا يوجد خبراء في هذا المجال بعد.",
    contactLocked:
      "التواصل مع الخبراء يتطلب Professionnel أو Premium. رقِّ الاشتراك من الإعدادات ← الخطة والفوترة.",
  },
  pricing: {
    title: "الخطة والفوترة",
    subtitle: "اختر باقة وصول ذاتية الخدمة لهذا العرض.",
    monthly: "شهري",
    yearly: "سنوي",
    saveYearly: "−شهران",
    perMonth: "/ شهر · بدون ضريبة",
    perYear: "/ سنة · بدون ضريبة",
    recommended: "موصى به",
    subscribe: "اشترك (دفع تجريبي)",
    currentPlan: "الباقة الحالية",
    processing: "جارٍ المعالجة…",
    activated: "تم تفعيل باقة {plan} (دفع تجريبي).",
    payError: "تعذّر إتمام الدفع.",
    demoPayNote:
      "دفع تجريبي فقط — بلا بطاقة حقيقية. جاهز للربط مع CIB / Stripe لاحقًا.",
    upgradeHint: "رقِّ الباقة",
    starter: "Starter",
    professionnel: "Professionnel",
    premium: "Premium",
    starterBlurb: "محلل فردي — لوحة القيادة وكتالوج القوانين",
    professionnelBlurb: "فرق — سيناريوهات وتواصل خبراء ودعم أولوية",
    premiumBlurb: "مؤسسي — طبقة سرية وإدارة محتوى ومقاعد أوسع",
    featDashboard: "لوحة العمليات والبث المباشر",
    featSearch: "البحث الدلالي (RAG)",
    featLaws: "كتالوج القوانين والتنظيمات",
    featExpertsView: "دليل الخبراء",
    featExpertsContact: "تواصل / طلبات استشارة",
    featScenarios: "منشئ سيناريوهات ماذا لو",
    featMatrix: "مصفوفة التأثيرات المتقاطعة",
    featClassified: "طبقة خريطة سرية",
    featAdmin: "إدارة المحتوى والاستيعاب",
    featSupport: "دعم إحاطة بأولوية",
    featSeats: "حتى {n} مقاعد",
  },
  settings: {
    title: "الإعدادات",
    subtitle: "السمة واللغة والخطة والفوترة لمساحة العرض هذه.",
    tabGeneral: "عام",
    tabBilling: "الخطة والفوترة",
    themeTitle: "السمة",
    themeDesc: "الوضع الداكن لغرفة العمليات افتراضي؛ الفاتح للبيئات المضيئة.",
    themeDark: "داكن",
    themeLight: "فاتح",
    languageTitle: "اللغة",
    languageDesc: "لغة الواجهة (العربية تفعّل اتجاه RTL).",
    densityTitle: "الكثافة",
    densityDesc: "تباعد القوائم والبطاقات.",
    densityComfortable: "مريح",
    densityCompact: "مضغوط",
    comingSoon: "الوضع المضغوط في إصدار لاحق.",
    billingTitle: "الخطة والفوترة",
    billingDesc: "أدِر باقة الاشتراك والدفع التجريبي.",
  },
  language: "اللغة",
};

export const dictionaries: Record<Locale, Dictionary> = { en, fr, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.fr;
}

/** Simple `{key}` interpolation */
export function interpolate(
  template: string,
  vars: Record<string, string | number>
): string {
  return Object.entries(vars).reduce(
    (s, [k, v]) => s.replaceAll(`{${k}}`, String(v)),
    template
  );
}
