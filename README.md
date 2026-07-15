# DZ-Sentry

Client-facing **strategic / geopolitical intelligence** prototype for the Algerian market. Dark situation-room UI with real interactive modules; ML training, microservices, and enterprise hardening are out of scope (Phase 2).

## Stack

- Next.js 14 (App Router) + Tailwind + Framer Motion + Recharts
- Leaflet map (Algeria-centered, toggleable layers)
- Local RAG store (chunk → embed → rank) with optional Claude synthesis
- Optional Supabase + pgvector schema in `supabase/schema.sql`
- Demo RBAC: `standard` | `vvip` | `sovereign` | `admin`

## Quick start

**Requirements:** Node.js **20+** and npm (install from [nodejs.org](https://nodejs.org/)).

```bash
npm install
npm run ingest          # index sample docs in data/source-documents (first run)
npm run dev             # http://localhost:3000
```

Open `/login`, pick a role:

| Role | Unlocks |
|------|---------|
| Standard | Dashboard, Search, Matrix |
| VVIP | + What-If Scenario Builder |
| Sovereign | + Classified map layer |
| Admin | + CMS upload / verification queue |

## Languages

UI is available in **Français** (default), **العربية** (RTL), and **English**. Use the language switcher on login or in the sidebar/header. Preference is stored in a cookie.

## Modules

1. **Dashboard** — risk cards (weighted formula), Leaflet layers, live feed (8s poll)
2. **Semantic Search** — NL query, filters, ranked chunks, LLM synthesis + citations
3. **What-If** — sliders → live recalculation (`src/lib/risk-scoring.ts`)
4. **Cross-Impact Matrix** — simulated narratives (hand-written)
5. **Admin CMS** — upload → ingest → approve/edit summaries
6. **RBAC** — cookie demo auth (swap for Supabase Auth when ready)

## Documents (Module 2)

Drop JORADP PDFs / `.txt` into `data/source-documents`, then Admin → **Reindex** or `npm run ingest`.

```bash
npm run fetch-joradp-help   # sourcing notes (manual download recommended)
```

## Optional env

Copy `.env.example` → `.env.local`:

### Gemini (Semantic Search synthesis)

1. Get an API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Add to `.env.local`:
   ```bash
   LLM_PROVIDER=gemini
   GEMINI_API_KEY=your_key_here
   GEMINI_MODEL=gemini-flash-latest
   ```
3. Restart `npm run dev`
4. Open **Semantic Search** → enter a query → **Synthesize answer**

Claude alternative: set `ANTHROPIC_API_KEY` (and optionally `LLM_PROVIDER=anthropic`).

### Netlify

`.env.local` is **not** deployed. Set the same vars in  
**Site configuration → Environment variables** (scope: **Functions** / **Runtime**), then **trigger a new deploy**:

| Variable | Example |
|----------|---------|
| `LLM_PROVIDER` | `gemini` |
| `GEMINI_API_KEY` | your key |
| `GEMINI_MODEL` | `gemini-flash-latest` |

Do **not** use `gemini-2.5-flash` / `gemini-2.0-flash` on free-tier keys (404 / 429).  
After changing env vars, redeploy or the old process keeps empty/`undefined` keys.

### Supabase

- Supabase keys — use `supabase/schema.sql` when connecting Postgres/pgvector

## Phase 2 (explicitly out of scope)

Trained ML, Delphi expert panel, microservices, Pinecone/Weaviate Enterprise, hardware MFA / legal certification, WebSocket infra.

---

## النسخة العربية

### منصة تحليل البيانات الرسمية

نموذج أولي **للاستخبارات الاستراتيجية / الجيوسياسية** موجّه للسوق الجزائرية. واجهة غرفة عمليات داكنة مع وحدات تفاعلية حقيقية. تدريب نماذج التعلم الآلي والخدمات المصغّرة والتصلّب المؤسسي خارج نطاق هذا الإصدار (المرحلة 2).

### التشغيل السريع

**المتطلبات:** Node.js **20+** و npm ([nodejs.org](https://nodejs.org/)).

```bash
npm install
npm run ingest          # فهرسة المستندات النموذجية (أول تشغيل)
npm run dev             # http://localhost:3000
```


افتح `/login`، اختر حساب اختبار أو سجّل الدخول:

| الدور | الصلاحيات |
|------|-----------|
| Standard | لوحة التحكم، البحث، المصفوفة |
| VVIP | + محاكاة السيناريوهات |
| Sovereign | + طبقة الخريطة المصنّفة |
| Admin | + رفع المستندات وقائمة التحقق |

### اللغات

الواجهة متوفرة بـ **الفرنسية** (افتراضي)، **العربية** (من اليمين لليسار)، و**الإنجليزية**. مبدّل اللغة في صفحة الدخول أو الشريط الجانبي.

### الوحدات

1. **لوحة التحكم** — بطاقات المخاطر، خريطة الجزائر، بث مباشر
2. **البحث الدلالي** — استعلام باللغة الطبيعية، مقاطع مرتبة، تلخيص بالذكاء الاصطناعي مع مراجع
3. **ماذا لو** — منزلقات → إعادة حساب فورية
4. **مصفوفة التأثير المتقاطع** — سرديات محاكاة
5. **إدارة المحتوى** — رفع → فهرسة → اعتماد الملخصات
6. **الصلاحيات** — مصادقة تجريبية (قابلة للاستبدال بـ Supabase لاحقًا)

### المستندات (الوحدة 2)

ضع ملفات JORADP (PDF أو `.txt`) في `data/source-documents`، ثم من الإدارة → **إعادة الفهرسة** أو `npm run ingest`.

### متغيرات البيئة (اختياري)

انسخ `.env.example` → `.env.local` لتفعيل Gemini في البحث الدلالي:

```bash
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-flash-latest
```

بدون هذه المفاتيح، يعمل التطبيق بالكامل مع تلخيص محلي دون API خارجي.

### Netlify

ملف `.env.local` لا يُنشر. عيّن نفس المتغيرات في **Site configuration → Environment variables** ثم أعد النشر.

### المرحلة 2 (خارج النطاق)

نماذج ML مدرّبة، لجنة خبراء دلفي، خدمات مصغّرة، قواعد متجهات مؤسسية، MFA مادي / اعتماد قانوني، بنية WebSocket.
