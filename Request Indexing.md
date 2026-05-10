# Request Indexing — Worklist

A prioritized checklist for nudging Google to crawl + index the ~50 URLs currently
sitting in **"Discovered – currently not indexed"** in Search Console.

---

## How to use

1. Open Google Search Console → click **URL Inspection** at the top.
2. Paste one URL from the list below into the search bar.
3. Wait ~5 seconds for the report to load.
4. Click **"Request Indexing"** (top right of the report).
5. Wait for the small "Indexing requested" confirmation, then close.
6. Tick the box `[ ]` → `[x]` here.
7. **Stop after ~10 requests per day.** Google rate-limits this and will grey
   out the button. The limit resets after ~24 hours.

Expect each URL to be crawled within hours to a few days. Indexing decision
follows shortly after — sometimes same day, sometimes weeks. "Crawled but not
indexed" is a separate category from "Discovered" and means Google looked but
chose not to index; if you start seeing that, the lever shifts to content
quality and authority (backlinks, GBP, reviews).

---

## Authoritative source

The actual 50 URLs in the "Discovered" bucket can be exported from GSC:

1. GSC → Indexing → Pages
2. Click into the row **"Discovered – currently not indexed"**
3. Top-right of the URL list → **Export → CSV / Google Sheets**

Cross-reference that export against the list below. URLs that aren't in the
export are either already indexed or in a different bucket — skip them.

---

## DO TOMORROW (Day 2 batch — DE-priority, 10 URLs)

GSC review on 2026-05-10 revealed only 1 of 14 indexed pages is German content.
The DE catalog is essentially invisible to Google. Day 2 must flip to DE-first.

After your URL Inspection quota resets in ~24h, request indexing on these in
this exact order. Each is also marked `← DAY 2 #N` in its tier section below.

1. [ ] https://vivecura.com/blog/burnout              ← directly answers `vivecura burnout` query
2. [ ] https://vivecura.com/ueber-mich                ← about page (common search target)
3. [ ] https://vivecura.com/spezielle-therapien       ← main service hub
4. [ ] https://vivecura.com/praevention-longevity     ← cornerstone
5. [ ] https://vivecura.com/diagnostik                ← cornerstone
6. [ ] https://vivecura.com/ketamin                   ← cornerstone
7. [ ] https://vivecura.com/psychotherapie            ← main service
8. [ ] https://vivecura.com/infusions                 ← main service
9. [ ] https://vivecura.com/blog/nad-plus-infusion    ← DE cornerstone (only EN indexed currently)
10. [ ] https://vivecura.com/blog/cholesterin-mythos-wissenschaft ← DE cornerstone

---

## Indexed status (per GSC, 2026-05-10)

These 14 URLs are confirmed indexed by Google. Skip any of these — no need to
request indexing for an already-indexed URL.

DE (3):
- `https://vivecura.com/`                                                      (May 5)
- `https://www.vivecura.com/blog/chronische-fatigue-me-cfs-individuell`        (Apr 23, www variant)
- `https://www.vivecura.com/therapien/schwermetall-ausleitung`                 (Apr 20, www variant — not in sitemap)

EN apex (9):
- `https://vivecura.com/en/diagnostics`               (May 4)
- `https://vivecura.com/en/my-book`                   (May 4)
- `https://vivecura.com/en/blog`                      (May 4)
- `https://vivecura.com/en/blog/nad-plus-infusion`    (May 4)
- `https://vivecura.com/en/blog/ketamin-therapie`     (May 3)
- `https://vivecura.com/en/physical-symptoms`         (May 3)
- `https://vivecura.com/en/special-therapies`         (May 3)
- `https://vivecura.com/en/legal-notice`              (May 3)
- `https://vivecura.com/en/prevention-longevity`      (May 3)

WWW duplicates (canonical bug — separate fix needed):
- `https://www.vivecura.com/en/blog/nad-plus-infusion`    (May 4)
- `https://www.vivecura.com/en/blog/ketamin-therapie`     (May 3)

---

## Tier 1 — Just-fixed redirect errors

These two were broken on May 3 (locale corruption bug, fixed in `f35ffa4`) and
have a Validate Fix re-crawl in flight. Manually requesting indexing in
parallel will speed it up.

- [x] https://vivecura.com/en
- [x ] https://vivecura.com/en/about

---

## Tier 2 — EN top-level service pages (highest commercial value)

The English-language entry points for the practice's premium services. These
are the pages international/expat patients in Berlin will land on from Google.

- [x ] https://vivecura.com/en/diagnostics            ← INDEXED May 4 (request was redundant)
- [x ] https://vivecura.com/en/prevention-longevity   ← INDEXED May 3 (request was redundant)
- [x ] https://vivecura.com/en/ketamine
- [ ] https://vivecura.com/en/special-therapies       ← INDEXED May 3 (skip)
- [ ] https://vivecura.com/en/psychotherapy
- [ ] https://vivecura.com/en/infusions
- [ ] https://vivecura.com/en/consultations
- [ ] https://vivecura.com/en/physical-symptoms       ← INDEXED May 3 (skip)

---

## Tier 3 — EN secondary pages

- [ ] https://vivecura.com/en/blog                    ← INDEXED May 4 (skip)
- [ ] https://vivecura.com/en/mentoring
- [ ] https://vivecura.com/en/experience
- [ ] https://vivecura.com/en/my-book                 ← INDEXED May 4 (skip)
- [ ] https://vivecura.com/en/legal-notice            ← INDEXED May 3 (skip)

---

## Tier 4 — EN cornerstone blog posts (AI-citation candidates)

These cover the topics the practice wants to be cited for in ChatGPT,
Perplexity, and Google AI Overviews. They have FAQ structure that LLMs quote
verbatim.

- [ ] https://vivecura.com/en/blog/ketamin-therapie   ← INDEXED May 3 (skip)
- [ ] https://vivecura.com/en/blog/nad-plus-infusion  ← INDEXED May 4 (skip)
- [ ] https://vivecura.com/en/blog/burnout
- [ ] https://vivecura.com/en/blog/cholesterin-mythos-wissenschaft
- [ ] https://vivecura.com/en/blog/schwermetalle

---

## Tier 5 — EN supporting blog posts

- [ ] https://vivecura.com/en/blog/intervallfasten-frauen-ab-40
- [ ] https://vivecura.com/en/blog/schlaf-und-schlafstoerungen-ganzheitlich
- [ ] https://vivecura.com/en/blog/anthroposophische-medizin-wer-heilt-hat-recht
- [ ] https://vivecura.com/en/blog/mounjaro-tirzepatid
- [ ] https://vivecura.com/en/blog/schimmel-schulmedizin
- [ ] https://vivecura.com/en/blog/darm-reset
- [ ] https://vivecura.com/en/blog/chronische-fatigue-me-cfs-individuell
- [ ] https://vivecura.com/en/blog/funktionelle-schilddruesenunterfunktion
- [ ] https://vivecura.com/en/blog/eisenmangel-und-eiseninfusionen
- [ ] https://vivecura.com/en/blog/testosteron-mangel
- [ ] https://vivecura.com/en/blog/oestrogen-dominanz
- [ ] https://vivecura.com/en/blog/heilpflanzen-infusion

---

## Tier 6 — DE top-level pages (HIGH PRIORITY — almost none indexed)

GSC confirms only the homepage `/` is indexed on the DE side. All other DE
service pages need to be requested. The Day 2 batch above pulls 7 from this
tier.

- [ ] https://vivecura.com/koerperliche-symptome
- [ ] https://vivecura.com/infusions                  ← DAY 2 #8
- [ ] https://vivecura.com/experience
- [ ] https://vivecura.com/beratung
- [ ] https://vivecura.com/mentoring
- [ ] https://vivecura.com/mein-buch
- [ ] https://vivecura.com/diagnostik                 ← DAY 2 #5
- [ ] https://vivecura.com/praevention-longevity      ← DAY 2 #4
- [ ] https://vivecura.com/psychotherapie             ← DAY 2 #7
- [ ] https://vivecura.com/ketamin                    ← DAY 2 #6
- [ ] https://vivecura.com/spezielle-therapien        ← DAY 2 #3
- [ ] https://vivecura.com/ueber-mich                 ← DAY 2 #2
- [ ] https://vivecura.com/blog
- [ ] https://vivecura.com/rechtliches

---

## Tier 7 — DE blog posts (HIGH PRIORITY — none in apex form indexed)

Only one DE blog post is indexed (chronische-fatigue, www variant only). The
DE blog is essentially invisible to Google. The Day 2 batch above pulls 3 from
this tier (incl. burnout, which directly answers the `vivecura burnout` test
query).

- [x ] https://vivecura.com/blog/ketamin-therapie
- [ ] https://vivecura.com/blog/nad-plus-infusion     ← DAY 2 #9
- [ ] https://vivecura.com/blog/burnout               ← DAY 2 #1
- [ ] https://vivecura.com/blog/cholesterin-mythos-wissenschaft ← DAY 2 #10
- [ ] https://vivecura.com/blog/schwermetalle
- [ ] https://vivecura.com/blog/intervallfasten-frauen-ab-40
- [ ] https://vivecura.com/blog/schlaf-und-schlafstoerungen-ganzheitlich
- [ ] https://vivecura.com/blog/anthroposophische-medizin-wer-heilt-hat-recht
- [ ] https://vivecura.com/blog/mounjaro-tirzepatid
- [x ] https://vivecura.com/blog/schimmel-schulmedizin
- [ ] https://vivecura.com/blog/darm-reset
- [ ] https://vivecura.com/blog/chronische-fatigue-me-cfs-individuell
- [ ] https://vivecura.com/blog/funktionelle-schilddruesenunterfunktion
- [ ] https://vivecura.com/blog/eisenmangel-und-eiseninfusionen
- [ ] https://vivecura.com/blog/testosteron-mangel
- [ ] https://vivecura.com/blog/oestrogen-dominanz
- [ ] https://vivecura.com/blog/heilpflanzen-infusion

---

## Revised cadence (DE-priority)

Original cadence was EN-first. Updated based on 2026-05-10 GSC findings:

| Day | URLs | Focus |
|---|---|---|
| Day 1 (done) | Tier 1 (2) + first 3 of Tier 2 + 2 from Tier 7 | Mixed (EN + 2 DE blog) |
| Day 2 | The 10 in DO TOMORROW above | DE service pages + DE cornerstone blog posts |
| Day 3 | Remaining Tier 6 (7) + Tier 4 (3 not-yet-indexed) | DE remainder + EN cornerstone blog |
| Day 4 | Remaining Tier 7 DE blog posts (10) | DE blog catalogue |
| Day 5 | Tier 5 EN blog posts (12) — split if quota hits | EN blog catalogue |
| Day 6 | Remaining Tier 2/3 EN (skip already-indexed) | EN cleanup |

If a URL is rejected with "URL is unknown to Google" or similar, leave the
checkbox unticked and note the error. That's a signal worth investigating
separately.

---

## What "success" looks like

Two weeks after working through this list, expect to see in GSC:

- **Indexed pages** counter rising from 14 toward 40+
- **"Discovered – currently not indexed"** dropping from 50 toward 10–20
- **"Page indexing"** report shows recent crawl dates on most listed URLs
- `site:vivecura.com burnout` returns the burnout blog post
- `vivecura burnout` returns the burnout blog post in top results

If after 2 weeks an EN page is still in "Discovered", click into the URL
Inspection report for it — Google will usually explain why (low quality
signal, thin content, duplicate of another URL, etc.). At that point the lever
shifts from "request indexing" to "fix the underlying signal."

---

## Resolved (2026-05-10): www / apex canonical bug

GSC indexed list showed multiple URLs being indexed in BOTH apex and www form
(splitting ranking signal). Root cause: the page-rendered canonical pointed
to apex (e.g. `https://vivecura.com/en/blog/nad-plus-infusion`), but Vercel
redirected apex → www, creating a soft loop Google sometimes resolved the
wrong way.

**Fixed via Vercel dashboard flip (no code changes):**
- `vivecura.com` is now the production domain
- `www.vivecura.com` → 308 → `vivecura.com`
- `vivecura.de` → 308 → `vivecura.com` (also unified `.de` TLD into `.com`)
- `www.vivecura.de` → 308 → `vivecura.com`

All redirects path-preserved (e.g. `vivecura.de/blog/burnout` →
`vivecura.com/blog/burnout`). Verified with curl tests against Googlebot UA.
Expect Google to consolidate the 4 previously-www-indexed URLs into their
apex equivalents over 1–4 weeks.
