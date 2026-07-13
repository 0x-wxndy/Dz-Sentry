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
      "Strategic intelligence briefing prototype for Algeria. Select a demo clearance to explore RBAC-gated modules.",
    demoSession: "Demo session",
    demoSessionDesc:
      "Cookie-based roles | swap to Supabase Auth when credentials are set",
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
      "Prototype de briefing en renseignement stratégique pour l'Algérie. Choisissez une habilitation démo pour explorer les modules RBAC.",
    demoSession: "Session démo",
    demoSessionDesc:
      "Rôles par cookie | basculer vers Supabase Auth lorsque les clés sont configurées",
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
      "نموذج أولي لإحاطة استخباراتية استراتيجية للسوق الجزائرية. اختر مستوى صلاحية تجريبي لاستكشاف الوحدات المقيدة.",
    demoSession: "جلسة تجريبية",
    demoSessionDesc:
      "أدوار عبر ملفات تعريف الارتباط | يمكن الانتقال إلى Supabase Auth عند توفر المفاتيح",
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
