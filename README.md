# Ampwell website prototype

**Live site:** https://elitedigitalconsulting.github.io/ampwell-prototype/

Interactive prototype of the Ampwell trade website: six product ranges, 95 product families and 1,507 Ampwell part numbers, quote requests, trade login with hidden pricing, 3D product views and an AI assistant (sample data in this prototype).

## View it

- **Online:** https://elitedigitalconsulting.github.io/ampwell-prototype/ (published with GitHub Pages; under Settings → Pages the source must be set to GitHub Actions).
- **Locally:** open `index.html` in a browser once the `data/` folder is present.

## Files

- `index.html` – the site (markup and styles)
- `app.js` – catalogue logic, pages, quote, 3D viewer and the AI assistant
- `data/part0.js` … `data/part5.js` – product data and photos, loaded in chunks
- `.github/workflows/pages.yml` – deploys the site to GitHub Pages on every push to `main`

Prices are demo figures and the AI features return sample answers. Supplier references are kept internal and never shown.
