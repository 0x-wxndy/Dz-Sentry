import type { Locale } from "@/lib/i18n/config";

export type LawCategory = "all" | "investment" | "tax" | "trade" | "energy";

export type LawItem = {
  id: string;
  category: Exclude<LawCategory, "all">;
  type: "law" | "decree" | "ordinance";
  reference: string;
  date: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  body: Record<Locale, string>;
};

export const LAW_CATEGORIES: Exclude<LawCategory, "all">[] = [
  "investment",
  "tax",
  "trade",
  "energy",
];

export const SEED_LAWS: LawItem[] = [
  {
    id: "law-22-18",
    category: "investment",
    type: "law",
    reference: "22-18",
    date: "2022-07-24",
    title: {
      en: "Investment Law n° 22-18",
      fr: "Loi n° 22-18 relative à l'investissement",
      ar: "القانون رقم 22-18 المتعلق بالاستثمار",
    },
    summary: {
      en: "Defines the investment regime for goods and services production, eligibility for strategic-sector incentives, and AAPI registration duties.",
      fr: "Définit le régime d'investissement pour la production de biens et services, l'éligibilité aux avantages des secteurs stratégiques et les obligations d'enregistrement auprès de l'AAPI.",
      ar: "يحدد نظام الاستثمار في أنشطة إنتاج السلع والخدمات، وشروط الاستفادة من الحوافز في القطاعات الاستراتيجية، والتزامات التسجيل لدى الوكالة الجزائرية لترقية الاستثمار.",
    },
    body: {
      en: "Sample excerpt for prototype. Articles cover strategic sectors (energy, manufacturing, agriculture, ICT), temporary tax relief, and withdrawal of advantages in case of serious breach.",
      fr: "Extrait d'échantillon. Les articles couvrent les secteurs stratégiques (énergie, industrie, agriculture, TIC), les exonérations temporaires et le retrait des avantages en cas de manquement grave.",
      ar: "مقتطف نموذجي للنموذج الأولي. تغطي المواد القطاعات الاستراتيجية (الطاقة، الصناعة، الزراعة، تكنولوجيا المعلومات)، والإعفاءات المؤقتة، وسحب المزايا في حالة الإخلال الجسيم.",
    },
  },
  {
    id: "decree-creg",
    category: "energy",
    type: "decree",
    reference: "DE-CREG-2023",
    date: "2023-03-12",
    title: {
      en: "Executive decree — electricity & gas tariffs (CREG)",
      fr: "Décret exécutif — tarifs électricité et gaz (CREG)",
      ar: "مرسوم تنفيذي — تعريفات الكهرباء والغاز (لجنة الضبط)",
    },
    summary: {
      en: "Sets CREG tariff proposal rules, consultation duties, and industrial offtake indexation clauses.",
      fr: "Fixe les règles de proposition tarifaire de la CREG, les obligations de consultation et les clauses d'indexation des contrats industriels.",
      ar: "يحدد قواعد اقتراح التعريفات من قبل لجنة الضبط، وواجبات الاستشارة، وبنود فهرسة عقود الاستلام الصناعي.",
    },
    body: {
      en: "Prototype sample. Operators must report capacity, planned maintenance, and continuity incidents to the regulator.",
      fr: "Échantillon prototype. Les opérateurs doivent transmettre capacité, maintenance planifiée et incidents de continuité au régulateur.",
      ar: "عينة للنموذج الأولي. يلتزم المشغّلون بإبلاغ الجهة التنظيمية بالقدرة والصيانة المخططة وحوادث استمرارية الخدمة.",
    },
  },
  {
    id: "law-tax-finance",
    category: "tax",
    type: "law",
    reference: "LF-2024",
    date: "2023-12-28",
    title: {
      en: "Finance Law 2024 — selected tax measures",
      fr: "Loi de finances 2024 — mesures fiscales sélectionnées",
      ar: "قانون المالية 2024 — تدابير جبائية مختارة",
    },
    summary: {
      en: "Sample measures on corporate tax treatment of reinvested earnings and strategic-sector incentives.",
      fr: "Mesures d'exemple sur le traitement fiscal des bénéfices réinvestis et les incentives sectoriels.",
      ar: "تدابير نموذجية بشأن المعاملة الضريبية للأرباح المعاد استثمارها والحوافز القطاعية الاستراتيجية.",
    },
    body: {
      en: "Demo text only — not an official publication. Useful for briefing diligence on tax clarity for FDI.",
      fr: "Texte de démo uniquement — pas une publication officielle. Utile pour la diligence sur la lisibilité fiscale des IDE.",
      ar: "نص تجريبي فقط — ليس منشورًا رسميًا. مفيد لإحاطات العناية الواجبة حول وضوح الجباية للاستثمار الأجنبي.",
    },
  },
  {
    id: "ord-borders",
    category: "trade",
    type: "ordinance",
    reference: "ORD-FRONT-2025",
    date: "2025-01-15",
    title: {
      en: "Ordinance — southern border coordination",
      fr: "Ordonnance — coordination des frontières sud",
      ar: "أمر — تنسيق الحدود الجنوبية",
    },
    summary: {
      en: "Coordination modalities for security forces and local authorities along southern border wilayas; trafficking corridor monitoring.",
      fr: "Modalités de coordination entre forces de sécurité et autorités locales des wilayas frontalières du Sud ; suivi des corridors de trafic.",
      ar: "كيفيات التنسيق بين قوات الأمن والسلطات المحلية في الولايات الحدودية الجنوبية؛ مراقبة ممرات التهريب.",
    },
    body: {
      en: "Demo ordinance excerpt. Covers Tin Zaouatine, In Guezzam, Debdeb corridors and weekly incident consolidation.",
      fr: "Extrait d'ordonnance démo. Couvre les corridors de Tin Zaouatine, In Guezzam, Debdeb et la consolidation hebdomadaire des incidents.",
      ar: "مقتطف أمر تجريبي. يغطي ممرات تين زاوتين وإن قزام ودبدب وتجميع الحوادث أسبوعيًا.",
    },
  },
  {
    id: "law-trade-facilitation",
    category: "trade",
    type: "law",
    reference: "COMM-FAC-2021",
    date: "2021-06-01",
    title: {
      en: "Trade facilitation — customs & free-zone sample",
      fr: "Facilitation du commerce — échantillon douanes / zone franche",
      ar: "تسهيل التجارة — عينة جمارك / منطقة حرة",
    },
    summary: {
      en: "Sample framework for documentary credit timing, port clearance, and free-zone regulatory diligence.",
      fr: "Cadre d'exemple pour délais de crédits documentaires, dédouanement portuaire et diligence zone franche.",
      ar: "إطار نموذجي لمواعيد الاعتمادات المستندية والتخليص المينائي والعناية الواجبة للمناطق الحرة.",
    },
    body: {
      en: "Prototype content for the Laws catalogue UI — not a gazette extract.",
      fr: "Contenu prototype pour le catalogue Lois — pas un extrait du Journal officiel.",
      ar: "محتوى نموذجي لواجهة كتالوج القوانين — ليس مستخرجًا من الجريدة الرسمية.",
    },
  },
  {
    id: "decree-hydrocarbons",
    category: "energy",
    type: "decree",
    reference: "HYDRO-LOC-2020",
    date: "2020-11-08",
    title: {
      en: "Hydrocarbons — local content implementing sample",
      fr: "Hydrocarbures — échantillon d'application contenu local",
      ar: "المحروقات — عينة تطبيق المحتوى المحلي",
    },
    summary: {
      en: "Illustrative rules on local content commitments for concession holders and service contractors.",
      fr: "Règles illustratives sur les engagements de contenu local des concessionnaires et prestataires.",
      ar: "قواعد توضيحية بشأن التزامات المحتوى المحلي لحاملي الامتياز ومقاولي الخدمات.",
    },
    body: {
      en: "Use for client walkthrough of energy-legal diligence flags in the prototype.",
      fr: "À utiliser pour la présentation client des drapeaux de diligence juridique énergie.",
      ar: "يُستخدم لعرض علامات العناية الواجبة القانونية في قطاع الطاقة ضمن النموذج الأولي.",
    },
  },
];

export function localizeLawField(
  law: LawItem,
  field: "title" | "summary" | "body",
  locale: Locale
): string {
  return law[field][locale] || law[field].fr || law[field].en;
}
