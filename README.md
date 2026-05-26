# Dr. Aindrila Kundu — Official Website

**Obstetrician, Gynaecologist & Laparoscopic Specialist, Kolkata**  
MBBS · MS · MRCOG 1 · WBMC-87200 · FOGSI · BOGS

🌐 Live at: `https://dr-aindrila-kundu.github.io/`  
📸 Instagram: [@that_gynae_girl](https://instagram.com/that_gynae_girl)  
💼 LinkedIn: [Dr. Aindrila Kundu](https://www.linkedin.com/in/aindrila-kundu-8461b1305/)

---

## 📁 Full Folder Structure

```
dr-aindrila-website/
│
├── index.html              ← Full website (all 11 sections)
├── styles.css              ← All styling, CSS variables, animations, responsive
├── script.js               ← Navbar, mobile menu, count-up, scroll reveal, form
├── robots.txt              ← Search engine crawl instructions
├── sitemap.xml             ← Google sitemap for indexing
├── README.md               ← This file
│
└── assets/
    └── images/
        ├── dr-aindrila-hero.jpg        ← Hero section — doctor with newborn ✅
        ├── dr-aindrila-surgery.jpg     ← About section — doctor in OT ✅
        ├── gallery-joy-01.jpg          ← Gallery photo 1 ✅
        ├── gallery-joy-02.jpg          ← Gallery photo 2 ✅
        ├── gallery-joy-03.jpg          ← Gallery photo 3 (add when ready)
        ├── gallery-joy-04.jpg          ← Gallery photo 4 (add when ready)
        ├── gallery-joy-05.jpg          ← Gallery photo 5 (add when ready)
        └── gallery-joy-06.jpg          ← Gallery photo 6 (add when ready)
```

> **Tip:** Compress large images before upload using [Squoosh](https://squoosh.app) — free, browser-based.  
> Target: under 500KB per image for fast page loads.

---

## 🚀 GitHub Pages — Step-by-Step Deployment

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) → Sign in
2. Click **+** → **New repository**
3. Name it: `dr-aindrila-kundu` (or any name)
4. Set to **Public**
5. Do NOT initialise with README
6. Click **Create repository**

### Step 2 — Upload all files
1. Click **uploading an existing file** on the empty repo page
2. Drag and drop the **entire folder contents** (all files + assets/images folder)
3. Commit message: `Initial website upload`
4. Click **Commit changes**

### Step 3 — Enable GitHub Pages
1. Go to **Settings** → **Pages** (left sidebar)
2. Under **Source** → select **Deploy from a branch**
3. Branch: **main** · Folder: **/ (root)**
4. Click **Save**
5. Wait 2–3 minutes → your site is live at `https://yourusername.github.io/dr-aindrila-kundu/`

### Step 4 — Custom Domain (optional)
To use `dr-aindrila-kundu.com` or similar:
1. Create a file named `CNAME` in the root folder containing just:
   ```
   dr-aindrila-kundu.com
   ```
2. In your domain registrar (GoDaddy / Namecheap etc.), add:
   - **CNAME record** → `www` → `yourusername.github.io`
   - **A records** → point apex domain to GitHub IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
3. In GitHub Pages settings → enter your custom domain → tick **Enforce HTTPS**

---

## ✏️ How to Update Content

### Adding real testimonials
Find `<!-- ═══════════ TESTIMONIALS ═══════════ -->` in `index.html`.  
Replace a `.ph-card` div with:
```html
<div class="testi-card reveal">
  <div class="testi-stars" aria-label="5 stars">★★★★★</div>
  <p class="testi-text">"Write the patient's testimonial here in their own words."</p>
  <div class="testi-footer">
    <p class="testi-name">— Priya S.</p>
    <p class="testi-cond">High Risk Pregnancy · 2024</p>
  </div>
</div>
```

### Adding more gallery photos
1. Add image files to `assets/images/` named `gallery-joy-03.jpg` etc.
2. In `index.html`, find the gallery section and replace a `.ph` placeholder:
```html
<!-- REPLACE THIS: -->
<div class="gal-item ph" aria-hidden="true"><span>📸</span></div>

<!-- WITH THIS: -->
<div class="gal-item">
  <img src="assets/images/gallery-joy-03.jpg" alt="Dr. Aindrila with patient — joyful moment" loading="lazy" />
</div>
```

### Adding clinic address
Find the contact section `ci-row` for Location and update:
```html
<p class="ci-val">XYZ Clinic, 123 Road Name, New Alipore, Kolkata – 700053</p>
```

### Adding Google Maps link
Wrap the location row in an anchor:
```html
<a href="https://maps.google.com/?q=Your+Clinic+Address" target="_blank" rel="noopener" class="ci-row">
```

### Adding Practo / Booking link
Find the navbar CTA and update `href`:
```html
<a href="https://www.practo.com/your-profile" target="_blank" class="nav-cta">Book Consultation</a>
```

### Updating Google verification tag
Find in `<head>`:
```html
<meta name="google-site-verification" content="awGZrvQm39nF1a_0NeESnZqLLfDpG68JLbesLkctSHY" />
```

---

## 🎨 Design Reference

### Colour Palette
| Token | Hex | Used For |
|-------|-----|----------|
| `--navy` | `#0B1D3A` | Primary background, headings |
| `--navy-mid` | `#163056` | Hover states |
| `--royal` | `#1B4FA8` | Accent colour, links, tags |
| `--royal-lt` | `#2563C4` | Featured card background |
| `--gold` | `#C8994A` | Warm accent, ticker, quote border |
| `--gold-lt` | `#E4B96E` | Italic headings, list markers |
| `--cream` | `#F6F4EF` | Section backgrounds |
| `--cream-2` | `#EEF0F5` | Tags, placeholder backgrounds |
| `--muted` | `#6B7A99` | Body text, subtitles |

### Typography
| Role | Font | Weight |
|------|------|--------|
| Headings / Serif | Cormorant Garamond | 300–600 |
| Body / UI | Jost | 300–600 |

Both loaded from Google Fonts — no install needed.

---

## 📞 Contact Information (in site)

| | |
|--|--|
| **Phone / WhatsApp** | +91 78659 02082 |
| **Email** | aindrila21nov@gmail.com |
| **Instagram** | @that_gynae_girl |
| **LinkedIn** | linkedin.com/in/aindrila-kundu-8461b1305 |
| **Location** | Kolkata · New Alipore, West Bengal |
| **Hours** | 9:00 AM – 9:00 PM · All Days |
| **Registration** | WBMC-87200 |

---

## 🔜 Future Updates Checklist

- [ ] Add remaining 6 gallery photos (joy-03 through joy-08)
- [ ] Replace placeholder testimonials with real patient reviews
- [ ] Add exact clinic address with Google Maps link
- [ ] Add Practo / online booking link
- [ ] Add Google Reviews rating badge
- [ ] Upload profile headshot as `dr-aindrila-hero.jpg` (face visible, no mask)
- [ ] Add FAQ section
- [ ] Add Bengali language toggle

---

## 🔍 SEO & Google Indexing

The site is configured for full Google indexing:

| Feature | Status |
|---------|--------|
| Google Search Console verification | ✅ Included |
| Canonical URL | ✅ Set |
| robots meta `index, follow` | ✅ Set |
| Open Graph (Facebook/WhatsApp share) | ✅ Set |
| Twitter Card | ✅ Set |
| JSON-LD Physician schema | ✅ Set |
| robots.txt | ✅ Included |
| sitemap.xml | ✅ Included |
| Semantic HTML5 structure | ✅ |
| ARIA labels for accessibility | ✅ |
| Mobile responsive | ✅ |
| `defer` on JavaScript | ✅ No render blocking |

After deploying to GitHub Pages:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your site URL as a property
3. Submit `sitemap.xml` URL: `https://yourusername.github.io/dr-aindrila-kundu/sitemap.xml`

---

*Designed with 💛 for Dr. Aindrila Kundu — Kolkata, 2025*
