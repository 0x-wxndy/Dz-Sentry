import type { MatrixCell } from "@/types";
import type { Locale } from "@/lib/i18n/config";

/** Localized narratives keyed by `row|col` (English keys from MATRIX_FACTORS). */
const FR: Record<string, string> = {
  "Oil price shock|Border instability":
    "Une pression durable sur les recettes d'hydrocarbures contraint les budgets discrétionnaires de modernisation sécuritaire le long des corridors sud, tandis que les marchés parallèles de carburant peuvent amplifier les incitations à la contrebande. Lien non strictement causal — canaux fiscal et économie illicite.",
  "Oil price shock|Tax reform":
    "Historiquement, la baisse des recettes pétrolières accélère les mesures fiscales hors hydrocarbures. Une chute nette renchérit le coût politique d'un élargissement retardé de l'assiette ; un vent favorable peut au contraire reporter la réforme. Surveiller les lois de finances et décrets d'application.",
  "Oil price shock|Drought / agri stress":
    "L'espace budgétaire énergétique finance les coussins d'importation alimentaire. Les chocs de prix compriment la marge de subvention précisément quand la sécheresse élève les besoins d'importations céréalières — scénario classique de double stress inflationniste.",
  "Oil price shock|FDI surge":
    "Les cycles hydrocarbures colorent le sentiment des investisseurs pour l'industrie et la logistique liées à l'énergie. Un effondrement des prix peut paradoxalement ouvrir une fenêtre de réforme du code de l'investissement.",
  "Border instability|Oil price shock":
    "L'instabilité déplace rarement seule les cours mondiaux du pétrole, mais peut relever les primes de sécurité locales sur pipelines, ports et personnel — canal coût d'exploitation plutôt que prix.",
  "Border instability|Tax reform":
    "La priorisation sécuritaire peut saturer la capacité administrative nécessaire aux réformes fiscales complexes dans les wilayas périphériques, ralentissant les gains de conformité même si les textes passent.",
  "Border instability|Drought / agri stress":
    "Déplacements et routes pastorales perturbées aggravent le stress du cheptel. Les flux informels de céréales et de bétail deviennent moins prévisibles, relevant la volatilité des prix locaux.",
  "Border instability|FDI surge":
    "Les comités de sélection de sites discréditent les hubs logistiques du sud lorsque les clusters d'incidents montent. Les zones industrielles côtières sont moins sensibles ; les projets sahariens le sont fortement.",
  "Tax reform|Oil price shock":
    "La réforme fiscale ne déplace pas les prix du pétrole ; le canal inverse domine. Effet résiduel : des règles fiscales plus claires améliorent le narratif souverain pendant les baisses de matières premières.",
  "Tax reform|Border instability":
    "La pression de formalisation sur le commerce frontalier informel peut temporairement accroître les frictions et incidents d'application avant un nouvel équilibre.",
  "Tax reform|Drought / agri stress":
    "Redesigner TVA / subventions en année de sécheresse est politiquement sensible. Un mauvais séquençage amplifie la perception des prix alimentaires même si le design fiscal net est solide.",
  "Tax reform|FDI surge":
    "Un traitement fiscal prévisible des bénéfices réinvestis et des incentives sectoriels est parmi les signaux les plus puissants pour l'IDE greenfield. L'ambiguïté se prix comme un risque.",
  "Drought / agri stress|Oil price shock":
    "Le stress agricole ne pilote pas le pétrole ; seul un faible feedback fiscal via la facture d'importations existe.",
  "Drought / agri stress|Border instability":
    "La concurrence autour des points d'eau et du pâturage peut élever les différends locaux ; les métriques nationales bougent souvent moins que les journaux d'incidents locaux.",
  "Drought / agri stress|Tax reform":
    "Dépenses agricoles d'urgence et facilitation d'importations apparaissent souvent en ajustements budgétaires de mi-année — risque de séquençage pour le calendrier de réforme fiscale.",
  "Drought / agri stress|FDI surge":
    "Les régions sous stress hydrique voient l'IDE agroalimentaire retardé ; les investisseurs irrigation / dessalement peuvent accélérer. La composition sectorielle compte plus que le titre IDE.",
  "FDI surge|Oil price shock":
    "Une composition d'IDE vers l'industrie non-hydrocarbures réduit progressivement la dépendance aux recettes pétrolières — effet structurel, non cyclique.",
  "FDI surge|Border instability":
    "Camps de projets et corridors logistiques peuvent attirer prédation ou protestation si le partage des bénéfices est opaque. L'engagement communautaire est un contrôle de sécurité, pas seulement ESG.",
  "FDI surge|Tax reform":
    "Les grands investisseurs plaident pour la clarté et parfois des exceptions. Une vague sans capacité administrative parallèle produit des décisions ad hoc qui sapent la marque de réforme.",
  "FDI surge|Drought / agri stress":
    "La demande industrielle en eau de nouvelles usines peut concurrencer l'irrigation dans des bassins déjà stressés — canal d'autorisation environnementale et de licence sociale.",
};

const AR: Record<string, string> = {
  "Oil price shock|Border instability":
    "الضغط المستمر على إيرادات المحروقات يقيّد ميزانيات تحديث الأمن على الممرات الجنوبية، بينما قد تزيد أسواق الوقود الموازية من حوافز التهريب. ليس رابطًا سببيًا مباشرًا — قناة مالية وقناة اقتصاد غير رسمي.",
  "Oil price shock|Tax reform":
    "تاريخيًا، تسارع انخفاض العائدات النفطية إجراءات الجباية خارج المحروقات. الهبوط الحاد يرفع الكلفة السياسية لتأخير توسيع الوعاء؛ والعكس قد يؤجل الإصلاح. راقب قوانين المالية والمراسيم التنفيذية.",
  "Oil price shock|Drought / agri stress":
    "الحيز المالي للطاقة يموّل مخزونات استيراد الغذاء. صدمات الأسعار تضغط هامش الدعم تمامًا عندما يرفع الجفاف احتياجات استيراد الحبوب — سيناريو ضغط مزدوج على التضخم.",
  "Oil price shock|FDI surge":
    "دورات المحروقات تلون معنويات المستثمرين في التصنيع واللوجستيات المرتبطة بالطاقة. انهيار الأسعار قد يفتح نافذة إصلاح لمدونة الاستثمار بشكل مفارق.",
  "Border instability|Oil price shock":
    "عدم الاستقرار نادرًا ما يحرّك أسعار النفط العالمية وحده، لكنه قد يرفع أقساط الأمن المحلية على الأنابيب والموانئ والكوادر — قناة تكلفة تشغيل لا قناة سعر.",
  "Border instability|Tax reform":
    "أولوية الأمن قد تزاحم القدرة الإدارية على ترقيات ضريبية معقدة في الولايات الطرفية، فتبطئ مكاسب الامتثال حتى مع إقرار النصوص.",
  "Border instability|Drought / agri stress":
    "النزوح واضطراب مسارات الرعي يفاقمان ضغط الثروة الحيوانية. تدفقات الحبوب والماشية غير الرسمية تصبح أقل قابلية للتنبؤ، فترتفع تقلبات الأسعار المحلية.",
  "Border instability|FDI surge":
    "لجان اختيار المواقع تخفض تقييم مراكز اللوجستيات الجنوبية عند ارتفاع تجمعات الحوادث. المناطق الصناعية الساحلية أقل حساسية؛ مشاريع الصحراء شديدة الحساسية.",
  "Tax reform|Oil price shock":
    "الإصلاح الضريبي لا يحرّك أسعار النفط؛ القناة العكسية هي الأهم. أثر متبقٍ: قواعد أوضح تحسّن السرد السيادي أثناء هبوط السلع.",
  "Tax reform|Border instability":
    "ضغط إضفاء الطابع الرسمي على التجارة الحدودية غير الرسمية قد يرفع مؤقتًا الاحتكاك وحوادث الإنفاذ قبل توازن جديد.",
  "Tax reform|Drought / agri stress":
    "إعادة تصميم الضريبة على القيمة المضافة / الدعم في سنوات الجفاف حساسة سياسيًا. سوء التسلسل يضخّم تصور أسعار الغذاء حتى لو كان التصميم سليمًا.",
  "Tax reform|FDI surge":
    "معاملة ضريبية متوقعة للأرباح المعاد استثمارها وحوافز القطاعات الاستراتيجية من أقوى إشارات الاستثمار الأجنبي المباشر. الغموض يُسعَّر كمخاطرة.",
  "Drought / agri stress|Oil price shock":
    "الضغط الزراعي لا يقود النفط؛ يوجد فقط تغذية راجعة مالية ضعيفة عبر فاتورة الاستيراد.",
  "Drought / agri stress|Border instability":
    "التنافس حول نقاط المياه والمراعي قد يرفع النزاعات المحلية؛ غالبًا تتحرك المؤشرات الوطنية أقل من سجلات الحوادث المحلية.",
  "Drought / agri stress|Tax reform":
    "الإنفاق الزراعي الطارئ وتسهيل الاستيراد يظهران غالبًا كتعديلات ميزانية منتصف السنة — مخاطرة تسلسل لرزنامة الإصلاح الضريبي.",
  "Drought / agri stress|FDI surge":
    "المناطق تحت ضغط مائي تشهد تأخر استثمار الأعمال الزراعية؛ مستثمرو الري والتحلية قد يتسارعون. تركيبة القطاعات أهم من عنوان الاستثمار الأجنبي.",
  "FDI surge|Oil price shock":
    "توجيه الاستثمار الأجنبي نحو الصناعة غير الهيدروكربونية يقلل تدريجيًا الاعتماد على إيرادات النفط — أثر هيكلي لا دوري.",
  "FDI surge|Border instability":
    "مخيمات المشاريع وممرات اللوجستيات قد تجذب افتراسًا أو احتجاجًا إذا كان تقاسم المنافع غير شفاف. إشراك المجتمع ضابط أمني وليس مجرد ESG.",
  "FDI surge|Tax reform":
    "كبار المستثمرين يضغطون من أجل الوضوح وأحيانًا استثناءات. طفرة بلا قدرة إدارية موازية تنتج قرارات ظرفية تضعف علامة الإصلاح.",
  "FDI surge|Drought / agri stress":
    "طلب المياه الصناعي من مصانع جديدة قد ينافس الري في أحواض مضغوطة — قناة ترخيص بيئي وترخيص اجتماعي.",
};

function keyOf(cell: MatrixCell) {
  return `${cell.row}|${cell.col}`;
}

const TIMEFRAMES: Record<Locale, Record<string, string>> = {
  en: {},
  fr: {
    "3–9 months": "3–9 mois",
    "6–18 months": "6–18 mois",
    "1–2 seasons": "1–2 saisons",
    "12–36 months": "12–36 mois",
    "Immediate–6 months": "Immédiat–6 mois",
    "Political cycle": "Cycle politique",
    Seasonal: "Saisonnier",
    "6–24 months": "6–24 mois",
    Indirect: "Indirect",
    Long: "Long terme",
    "1–2 years": "1–2 ans",
    Weak: "Faible",
    "Budget cycle": "Cycle budgétaire",
    "Agri & water": "Agri & eau",
    Local: "Local",
    Negotiation: "Négociation",
    "Project-level": "Niveau projet",
    "—": "—",
  },
  ar: {
    "3–9 months": "3–9 أشهر",
    "6–18 months": "6–18 شهرًا",
    "1–2 seasons": "موسم إلى موسمين",
    "12–36 months": "12–36 شهرًا",
    "Immediate–6 months": "فوري–6 أشهر",
    "Political cycle": "دورة سياسية",
    Seasonal: "موسمي",
    "6–24 months": "6–24 شهرًا",
    Indirect: "غير مباشر",
    Long: "طويل الأمد",
    "1–2 years": "سنة إلى سنتين",
    Weak: "ضعيف",
    "Budget cycle": "دورة ميزانية",
    "Agri & water": "زراعة ومياه",
    Local: "محلي",
    Negotiation: "تفاوض",
    "Project-level": "مستوى المشروع",
    "—": "—",
  },
};

export function localizeTimeframe(timeframe: string, locale: Locale): string {
  if (locale === "en") return timeframe;
  return TIMEFRAMES[locale][timeframe] ?? timeframe;
}

export function getLocalizedNarrative(cell: MatrixCell, locale: Locale): string {
  if (cell.row === cell.col) {
    if (locale === "fr") {
      return "Diagonale d'identité — l'auto-impact est définitionnel, pas un impact croisé. Sélectionnez une cellule hors diagonale.";
    }
    if (locale === "ar") {
      return "القطر الذاتي — التأثير على الذات تعريفي وليس تأثيرًا متقاطعًا. اختر خلية خارج القطر لتحليل السرد.";
    }
    return cell.narrative;
  }
  if (locale === "fr") return FR[keyOf(cell)] ?? cell.narrative;
  if (locale === "ar") return AR[keyOf(cell)] ?? cell.narrative;
  return cell.narrative;
}
