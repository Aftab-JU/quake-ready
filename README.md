# QuakeReady — Community Earthquake Preparedness

A responsive, no-build static website that helps households and neighbourhood groups prepare for earthquakes. Designed as an independent public-interest civil/earthquake-engineering outreach project.

## Features

- Interactive household readiness checklist with progress tracking.
- Household plan builder with a private, browser-local save.
- Emergency kit checklist and downloadable plain-text plan.
- Situation-specific earthquake guidance tabs: indoors, outdoors, vehicle, and after shaking.
- Community preparedness actions and official India resource links.
- Mobile-friendly layout, keyboard focus states, reduced-motion support, and semantic HTML.
- No account, analytics, external API, or backend required.

## Run locally

Open `index.html` in a modern browser. For a local server, run `python -m http.server 8000` from this folder and open `http://localhost:8000`.

## Publish free with GitHub Pages

1. Create a public GitHub repository named `quakeready` (or another name you prefer).
2. Upload `index.html`, `styles.css`, `app.js`, and `README.md` to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site. The address will be shown in Settings → Pages.
6. Open the published URL on desktop and mobile and test all checklist, tabs, save, and download actions.

A static host such as Netlify or Cloudflare Pages can also publish the same files without a build step.

## Important limitations

- This is an educational preparedness aid, not a structural safety assessment, building-code compliance tool, or engineering certification.
- It does not provide live earthquake alerts. It links to India's National Center for Seismology (NCS) and NDMA SACHET official resources.
- Checklist and household-plan data are stored in the user's browser with `localStorage`; clearing browser data removes them. The download option lets a user keep a separate copy.
- The site has no server, database, account system, or community submissions. It does not count real users or prove social impact.
- The user should review local emergency advice and all content with a qualified professional or disaster-management practitioner before representing it as formally reviewed.

## Sources used for safety content

- National Center for Seismology, Government of India — Do's and Don'ts: https://seismo.gov.in/dos-and-donts
- NDMA SACHET National Disaster Alert Portal: https://sachet.ndma.gov.in/
- National Center for Seismology earthquake catalogue: https://riseq.seismo.gov.in/riseq/earthquake/recent_earthquake

## Suggested honest project description

**QuakeReady: A Community Earthquake Preparedness Toolkit** — Designed and built a responsive public-facing web tool that translates official earthquake safety guidance into interactive household checklists, a locally saved family emergency plan, and community preparedness actions. The tool is an educational aid and does not assess structural safety or issue live alerts.

Only claim public reach, testing results, partnerships, or impact after you have actually measured or completed them.
