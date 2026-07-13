import type { Locale } from "@/lib/i18n/config";
import type { Alert } from "@/types";
import { SEED_ALERTS } from "./alerts";

type AlertCopy = {
  title: string;
  summary: string;
  region: string;
  source: string;
};

const FR: Record<string, AlertCopy> = {
  a1: {
    title: "Surveillance du corridor d'exportation d'hydrocarbures",
    summary:
      "Primes d'assurance maritime élevées sur les routes GNL méditerranéennes ; surveiller les programmes de chargement Sonatrach.",
    region: "Méditerranée / Skikda",
    source: "Bureau signaux de marché",
  },
  a2: {
    title: "Cluster d'incidents frontaliers au Sahara",
    summary:
      "Trois incidents de faible intensité signalés près de Tin Zaouatine en 72 h — pression sur le corridor de trafic.",
    region: "Tamanrasset",
    source: "Fusion OSINT",
  },
  a3: {
    title: "Fenêtre d'appel d'offres d'importation céréalière",
    summary:
      "Le calendrier d'appel d'offres ONAB coïncide avec la volatilité du fret mer Noire ; risque de répercussion sur les prix alimentaires.",
    region: "National",
    source: "Bureau agricole",
  },
  a4: {
    title: "Clarification attendue du code de l'investissement",
    summary:
      "Textes d'application pour secteurs stratégiques en circulation — briefing VVIP recommandé.",
    region: "Alger",
    source: "Veille juridique",
  },
  a5: {
    title: "Consultation tarifaire CREG ouverte",
    summary:
      "La révision des tarifs d'électricité peut affecter les contrats d'enlèvement industriels au T4.",
    region: "National",
    source: "Veille réglementaire",
  },
  a6: {
    title: "Stress hydrique — Hauts Plateaux",
    summary:
      "Anomalie pluviométrique −18 % vs moyenne décennale ; indicateurs de stress du cheptel en hausse.",
    region: "Sétif / Bordj Bou Arréridj",
    source: "Proxy climatique",
  },
  a7: {
    title: "Pipeline IDE — assemblage automobile",
    summary:
      "Deux visites OEM de sélection de sites prévues ; règles de contenu local restent un point de diligence clé.",
    region: "Oran / Relizane",
    source: "Flux d'affaires",
  },
  a8: {
    title: "Surveillance des retombées sahéliennes",
    summary:
      "Indicateurs de pression réfugiés / déplacements légèrement en hausse le long des wilayas du sud.",
    region: "Adrar / Illizi",
    source: "Bureau régional",
  },
  a9: {
    title: "Retards de règlement FX bancaire",
    summary:
      "Allongement anecdotique de 3–5 jours des confirmations de crédits documentaires pour biens d'équipement.",
    region: "Alger",
    source: "Ops financières",
  },
  a10: {
    title: "Fenêtre de maintenance pipeline",
    summary:
      "Maintenance planifiée sur le segment GK3 — déclassement temporaire du débit, hors crise.",
    region: "Corridor Hassi R'Mel",
    source: "Infrastructure",
  },
};

const AR: Record<string, AlertCopy> = {
  a1: {
    title: "مراقبة ممر تصدير المحروقات",
    summary:
      "ارتفاع أقساط تأمين الشحن على مسارات الغاز المسال في المتوسط؛ راقب جداول تحميل سوناطراك.",
    region: "المتوسط / سكيكدة",
    source: "مكتب إشارات السوق",
  },
  a2: {
    title: "تجمّع حوادث حدودية في الصحراء",
    summary:
      "ثلاثة حوادث منخفضة الشدة قرب تين زاوتين خلال 72 ساعة — ضغط على ممر التهريب.",
    region: "تمنراست",
    source: "دمج المصادر المفتوحة",
  },
  a3: {
    title: "نافذة مناقصة استيراد الحبوب",
    summary:
      "توقيت مناقصة الديوان الوطني يتزامن مع تقلب شحن البحر الأسود؛ خطر انتقال إلى أسعار الغذاء.",
    region: "وطني",
    source: "مكتب الزراعة",
  },
  a4: {
    title: "توضيح مرتقب لمدونة الاستثمار",
    summary:
      "نصوص تنفيذية للقطاعات الاستراتيجية قيد التداول — يُوصى بإحاطة VVIP.",
    region: "الجزائر العاصمة",
    source: "المراقبة القانونية",
  },
  a5: {
    title: "استشارة تعريفة لجنة ضبط الكهرباء والغاز مفتوحة",
    summary:
      "مراجعة تعريفة الكهرباء قد تؤثر على عقود الاستلام الصناعي في الربع الرابع.",
    region: "وطني",
    source: "المراقبة التنظيمية",
  },
  a6: {
    title: "ضغط جفاف — الهضاب العليا",
    summary:
      "شذوذ مطري −18٪ مقابل متوسط عشر سنوات؛ مؤشرات ضغط الثروة الحيوانية في ارتفاع.",
    region: "سطيف / برج بوعريريج",
    source: "مؤشر مناخي",
  },
  a7: {
    title: "خط استثمار أجنبي — تجميع سيارات",
    summary:
      "زيارتان لاختيار مواقع من مصنّعين أصليين مجدولتان؛ قواعد المحتوى المحلي تبقى بند تدقيق أساسي.",
    region: "وهران / غليزان",
    source: "تدفق الصفقات",
  },
  a8: {
    title: "مراقبة ارتدادات الساحل",
    summary:
      "مؤشرات ضغط اللاجئين / النزوح مرتفعة قليلاً على طول الولايات الجنوبية.",
    region: "أدرار / إليزي",
    source: "المكتب الإقليمي",
  },
  a9: {
    title: "تأخيرات تسوية صرف بنكية",
    summary:
      "تمديد عَرَضي بـ 3–5 أيام في تأكيدات الاعتمادات المستندية لسلع رأس المال.",
    region: "الجزائر العاصمة",
    source: "العمليات المالية",
  },
  a10: {
    title: "نافذة صيانة خط أنابيب",
    summary:
      "صيانة مخططة على مقطع GK3 — خفض مؤقت للقدرة، دون أزمة.",
    region: "ممر حاسي الرمل",
    source: "البنية التحتية",
  },
};

const EXTRA_FR = [
  "Alerte congestion portuaire — Alger",
  "Risque de perturbation logistique des phosphates",
  "Surveillance de l'écart du marché parallèle des devises",
  "Mise à jour facilitation du commerce transfrontalier",
  "Retard de permis en zones industrielles",
];

const EXTRA_AR = [
  "تنبيه ازدحام مينائي — الجزائر",
  "خطر اضطراب لوجستي للفوسفات",
  "مراقبة فارق سوق الصرف الموازي",
  "تحديث تسهيل التجارة عبر الحدود",
  "تراكم تراخيص المناطق الصناعية",
];

export function localizeAlert(alert: Alert, locale: Locale, tick = 0): Alert {
  if (locale === "en") return alert;

  const table = locale === "fr" ? FR : AR;
  const extras = locale === "fr" ? EXTRA_FR : EXTRA_AR;

  // Synthetic live tick: localized rotating title + localized base summary
  if (alert.id.startsWith("live-")) {
    const seed = SEED_ALERTS[tick % SEED_ALERTS.length] ?? SEED_ALERTS[0];
    const copy = table[seed.id];
    const title = extras[tick % extras.length];
    const tickLabel =
      locale === "fr"
        ? `[actualisation auto #${tick}]`
        : `[تحديث تلقائي #${tick}]`;
    return {
      ...alert,
      title,
      summary: copy ? `${copy.summary} ${tickLabel}` : alert.summary,
      region: copy?.region ?? alert.region,
      source: copy?.source ?? alert.source,
      sector: seed.sector,
    };
  }

  const copy = table[alert.id];
  if (!copy) return alert;
  return {
    ...alert,
    title: copy.title,
    summary: copy.summary,
    region: copy.region,
    source: copy.source,
  };
}

export function localizeAlerts(
  alerts: Alert[],
  locale: Locale,
  tick = 0
): Alert[] {
  return alerts.map((a) => localizeAlert(a, locale, tick));
}
