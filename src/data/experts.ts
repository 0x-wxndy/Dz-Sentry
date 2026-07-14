import type { Locale } from "@/lib/i18n/config";

export type ExpertField =
  | "all"
  | "economy"
  | "business"
  | "education"
  | "engineering"
  | "finance"
  | "law"
  | "medicine"
  | "technology";

export type Expert = {
  id: string;
  name: string;
  initials: string;
  field: Exclude<ExpertField, "all">;
  years: number;
  rating: number;
  reviews: number;
  freeConsult: boolean;
  languages: string[];
  email: string;
  phone: string;
  title: Record<Locale, string>;
  bio: Record<Locale, string>;
};

export const EXPERT_FIELDS: Exclude<ExpertField, "all">[] = [
  "economy",
  "business",
  "education",
  "engineering",
  "finance",
  "law",
  "medicine",
  "technology",
];

export const SEED_EXPERTS: Expert[] = [
  {
    id: "exp-mounir",
    name: "Mounir Benali",
    initials: "M",
    field: "economy",
    years: 14,
    rating: 4.8,
    reviews: 22,
    freeConsult: true,
    languages: ["ar", "fr", "en"],
    email: "mounir.benali@dz-sentry.experts",
    phone: "+213 555 01 20 30",
    title: {
      en: "Macro & investment climate advisor",
      fr: "Conseiller macro & climat d'investissement",
      ar: "مستشار الاقتصاد الكلي ومناخ الاستثمار",
    },
    bio: {
      en: "Former ministry advisory track; FDI site-selection briefings and hydrocarbon fiscal stress scenarios for institutional clients.",
      fr: "Parcours conseil ministériel ; briefings de sélection de sites IDE et scénarios de stress fiscal hydrocarbures pour clients institutionnels.",
      ar: "مسار استشاري وزاري سابق؛ إحاطات اختيار مواقع الاستثمار الأجنبي وسيناريوهات ضغط الجباية الهيدروكربونية للعملاء المؤسسيين.",
    },
  },
  {
    id: "exp-amina",
    name: "Amina Cherif",
    initials: "A",
    field: "law",
    years: 11,
    rating: 4.6,
    reviews: 18,
    freeConsult: false,
    languages: ["ar", "fr"],
    email: "amina.cherif@dz-sentry.experts",
    phone: "+213 555 44 12 80",
    title: {
      en: "Investment & regulatory counsel",
      fr: "Conseillère investissement & réglementation",
      ar: "مستشارة استثمار وتنظيم",
    },
    bio: {
      en: "JORADP monitoring, AAPI filing strategy, and dispute risk on local-content clauses.",
      fr: "Veille JORADP, stratégie de dépôt AAPI et risque contentieux sur clauses de contenu local.",
      ar: "مراقبة الجريدة الرسمية، واستراتيجية الإيداع لدى الوكالة، ومخاطر النزاع حول بنود المحتوى المحلي.",
    },
  },
  {
    id: "exp-karim",
    name: "Karim Haddad",
    initials: "K",
    field: "finance",
    years: 9,
    rating: 4.4,
    reviews: 11,
    freeConsult: true,
    languages: ["fr", "en"],
    email: "karim.haddad@dz-sentry.experts",
    phone: "+213 555 77 09 11",
    title: {
      en: "FX & project finance analyst",
      fr: "Analyste change & financement de projets",
      ar: "محلل صرف وتمويل مشاريع",
    },
    bio: {
      en: "Documentary credit timing, parallel FX spread watch, and bankability notes for industrial corridors.",
      fr: "Délais de crédits documentaires, écart du marché parallèle et notes de bancabilité pour corridors industriels.",
      ar: "مواعيد الاعتمادات المستندية، ومراقبة فارق الصرف الموازي، وملاحظات قابلية التمويل للممرات الصناعية.",
    },
  },
  {
    id: "exp-sara",
    name: "Sara Meziane",
    initials: "S",
    field: "technology",
    years: 7,
    rating: 4.5,
    reviews: 9,
    freeConsult: true,
    languages: ["ar", "fr", "en"],
    email: "sara.meziane@dz-sentry.experts",
    phone: "+213 555 33 68 42",
    title: {
      en: "Digital gov & data systems advisor",
      fr: "Conseillère e-gov & systèmes de données",
      ar: "مستشارة الحكومة الإلكترونية وأنظمة البيانات",
    },
    bio: {
      en: "Prototype RAG pipelines, OSINT fusion desks, and secure briefing tooling for situation rooms.",
      fr: "Pipelines RAG prototype, bureaux de fusion OSINT et outillage de briefing sécurisé pour salles de situation.",
      ar: "مسارات استرجاع معزز نموذجية، ومكاتب دمج المصادر المفتوحة، وأدوات إحاطة آمنة لغرف العمليات.",
    },
  },
  {
    id: "exp-yacine",
    name: "Yacine Bouzid",
    initials: "Y",
    field: "engineering",
    years: 16,
    rating: 4.7,
    reviews: 15,
    freeConsult: false,
    languages: ["ar", "fr"],
    email: "yacine.bouzid@dz-sentry.experts",
    phone: "+213 555 90 21 55",
    title: {
      en: "Energy infrastructure engineer",
      fr: "Ingénieur infrastructures énergétiques",
      ar: "مهندس بنى تحتية للطاقة",
    },
    bio: {
      en: "Pipeline maintenance windows, LNG corridor insurance premiums, and industrial offtake contract diligence.",
      fr: "Fenêtres de maintenance pipelines, primes d'assurance GNL et diligence des contrats d'enlèvement industriel.",
      ar: "نوافذ صيانة خطوط الأنابيب، وأقساط تأمين الغاز المسال، والعناية الواجبة لعقود الاستلام الصناعي.",
    },
  },
  {
    id: "exp-nora",
    name: "Nora Belkacem",
    initials: "N",
    field: "business",
    years: 12,
    rating: 4.3,
    reviews: 14,
    freeConsult: true,
    languages: ["ar", "fr", "en"],
    email: "nora.belkacem@dz-sentry.experts",
    phone: "+213 555 18 40 27",
    title: {
      en: "OEM localization & partnership desk",
      fr: "Bureau localisation OEM & partenariats",
      ar: "مكتب توطين المصنّعين الأصليين والشراكات",
    },
    bio: {
      en: "Automotive assembly site visits, local content negotiations, and industrial zone permitting backlog.",
      fr: "Visites de sites d'assemblage auto, négociations de contenu local et retards de permis en zones industrielles.",
      ar: "زيارات مواقع تجميع السيارات، وتفاوض المحتوى المحلي، وتراكم تراخيص المناطق الصناعية.",
    },
  },
];

export function localizeExpertField(
  expert: Expert,
  field: "title" | "bio",
  locale: Locale
): string {
  return expert[field][locale] || expert[field].fr || expert[field].en;
}

export function countByField(field: ExpertField): number {
  if (field === "all") return SEED_EXPERTS.length;
  return SEED_EXPERTS.filter((e) => e.field === field).length;
}
