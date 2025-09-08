# Personal Website — Suprabhath Reddy K

Modern, responsive static site (HTML/CSS/JS) — ready for GitHub Pages.

## Structure
```
/
├── index.html
└── assets
    ├── css
    │   └── styles.css
    ├── js
    │   └── main.js
    ├── img
    │   └── placeholder.png
    └── resume.pdf  (replace with your real résumé)
```

## Customize
- **Colors & Fonts:** edit CSS variables in `assets/css/styles.css` under `:root`.
- **Text/content:** edit `index.html` sections (About, Skills, Experience, Contact).
- **Resume:** replace `assets/resume.pdf` with your PDF file.
- **Form:** set your Formspree action URL in the contact form (search for `formspree.io`).

## Run locally
Just open `index.html` in your browser. For better testing, use a local server:
- Python 3: `python -m http.server 8000` → visit http://localhost:8000

## Deploy (GitHub Pages)
1. Create a repo and commit these files to the **main** branch.
2. In repo **Settings → Pages**, choose **Deploy from branch**, Branch: `main`, Folder: `/root`.
3. Save — GitHub Pages will give you a live URL.

## Theme
- Dark theme is default; click the ☾/☼ button to toggle or set `data-theme="light"` on `<html>` to force light.
- Colors are accessible (good contrast) with a blue + sky accent.

© 2025 Suprabhath Reddy K
