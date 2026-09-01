# 💼 E-Portfolio — Personal Portfolio Site

A personal portfolio site for João Pedro Luz Rodrigues — BSc Computing student at Dublin Business School. Six static pages covering background, work history, qualifications, hobbies and contact, built with hand-written HTML, CSS and JavaScript. No framework, no build step, no backend.

🌐 **Live demo:** https://e-portifolio-sooty.vercel.app/index.html

---

## 📖 About

E-Portfolio is my personal developer portfolio — a fully static, multi-page site designed to introduce myself, present my qualifications and work history, share what I do outside of coding, and give visitors a way to get in touch.

It was built from scratch without any frameworks, focusing on clean HTML structure, a hand-written stylesheet using CSS custom properties and a sprite sheet for illustrations, and a small layer of JavaScript (with a touch of jQuery) for the shared header/footer, mobile menu, lightbox and contact form flow.

---

## 🛠️ Tech Stack

| Layer         | Technology                                                              |
| ------------- | ----------------------------------------------------------------------- |
| Structure     | HTML5 (one file per page)                                               |
| Styling       | CSS3 — single stylesheet (~730 lines) with custom properties and a sprite sheet |
| Interactivity | Vanilla JavaScript — shared layout injection and mobile menu            |
| Enhancements  | jQuery 3.7.1 — lightbox and contact-form validation (via cdnjs CDN)     |
| Fonts         | Google Fonts (DM Serif Display, Libre Baskerville, Lobster, Lora, Playfair Display) |
| Hosting       | Vercel                                                                  |

No build step, no package manager, nothing to install.

---

## 🚀 Running Locally

Any static server will do — the pages are plain HTML:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening the files directly with `file://` mostly works too, but a server keeps the relative paths and the query-string handoff to `confirmation.html` behaving as they would when deployed.

---

## 📂 Project Structure

```
.
├── index.html            Landing page — hero, tagline, three call-to-action buttons
├── about.html            Introduction, personal projects, work history, career goals
├── qualifications.html   Education, skills, languages, activities, certificates
├── hobbies.html          Six hobby sections, illustrated from the sprite sheet
├── contact.html          Contact form
├── confirmation.html     Post-submit thank-you page
├── src/
│   └── script.js         Header/footer injection, mobile menu, lightbox, form flow
├── style/
│   └── style.css         Whole stylesheet
└── img/                  Photography, logos, favicon, sprite sheet
```

---

## 🔧 How It Works

**Shared header and footer.** Neither is written into the HTML. Every page has an empty `<header id="header">` and `<footer id="footer">`, and `src/script.js` fills them in on `window.load` with template literals — the nav bar with the five links, and the footer with Instagram, LinkedIn and email icons. Change the nav in one place and every page follows.

**Active link.** After injecting the nav, the script reads the last segment of `window.location.pathname` (falling back to `index.html`) and adds an `active` class to the matching link.

**Mobile menu.** `toggleMenu()` flips the nav list's `visibility`, and `navMobi()` toggles a `change` class on the button so the three bars animate into a cross. Both are called from one inline `onclick`.

**Lightbox.** A jQuery block builds an overlay once, then binds any `<img data-lightbox>` to open it — the image's `alt` becomes the caption. It closes on the ×  button, a click on the backdrop, or Escape. Currently used on the Class Rep certificate in `qualifications.html`.

**Contact flow.** `#contactForm` is intercepted on submit: all three fields must be filled, the email is checked against a regex, and errors are written into `#formError` (which is `role="alert" aria-live="polite"`, so screen readers announce them). On success the browser navigates to `confirmation.html?name=…`, which reads the query string and greets the visitor by name.

---

## 📄 Pages

| Page                    | Contents                                                                                                             |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `index.html`            | Hero heading, tagline, and buttons through to About, Qualifications and Contact                                      |
| `about.html`            | Introduction, two personal projects (a hostel website in PHP and a JavaScript calculator), waiter / barista / bartender roles, robotics volunteering, and four-year goals |
| `qualifications.html`   | BSc at DBS, English courses, Computer Technician and secondary education, soft and hard skills, languages, extra-curriculars, and certificates linked to Google Drive |
| `hobbies.html`          | RPG, surfing, chess, Irish set dancing, twisty puzzles and gaming                                                    |
| `contact.html`          | Name, email and message form                                                                                         |
| `confirmation.html`     | Personalised thank-you with links back into the site                                                                 |

---

## 🎨 Design

Palette, defined as custom properties at the top of the stylesheet:

| Token             | Value        |
| ----------------- | ------------ |
| `--black`         | `#000000`    |
| `--background`    | `#F7F7F7`    |
| `--yellow`        | `#FDC435`    |
| `--yellowShadow`  | `#FCAC35`    |
| `--white`         | `#FFFFFF`    |
| `--grey`          | `#c7c8ccb0`  |
| `--brown`         | `#854836`    |

The hobby and activity illustrations all come from one 4×2 CSS sprite sheet (`img/sprite.png`): `.sprite` sets the shared sizing, and eight modifier classes (`.sprite-surfing`, `.sprite-chess`, …) shift `background-position`. A single `max-width: 768px` media query handles the mobile layout, including resizing the sprites.

---

## ⚠️ Known Limitations

Worth fixing before this goes in front of an employer.

- **The contact form doesn't send anything.** The submit handler calls `preventDefault()` and then redirects, so the `action="mailto:…"` never runs — but `confirmation.html` still says *"Your message has been sent successfully."* Nothing arrives. Either wire it to a form service (Formspree, Netlify Forms, EmailJS) or change the copy and point people at the mailto link in the footer.
- **The LinkedIn link goes to an edit page.** The footer URL ends in `/edit/intro/`, which only works while signed in as you — visitors get bounced. It should be the plain profile URL.
- **jQuery is missing on half the pages.** `index.html`, `about.html` and `hobbies.html` load `script.js` without jQuery, so the `jQuery(function ($) { … })` block throws a `ReferenceError` in the console on each. The header and footer still appear, because that listener is registered before the error — but it's a red flag to anyone who opens DevTools. Add the jQuery tag to those three pages, or guard the block with `if (window.jQuery)`.
- **A line break inside a `src` attribute.** In `confirmation.html` the script tag reads `src="./src/` then a newline then `script.js"`. Browsers strip newlines when parsing URLs so it happens to load, but it is clearly unintended — put it back on one line.
- **The layout depends on JavaScript.** With JS blocked or slow, the nav and footer are empty, so there is no way to move between pages. Search engines see the same thing. As the site grows, writing the nav into each page (or generating it at build time) would be more robust than injecting it on `load`.
- **Unused assets.** `img/games.jpg` and `img/hamburguerlist.svg` are not referenced anywhere and can go.
- **Heavy images.** `img/` is about 4.8 MB, of which `sprite.png` is 1.8 MB and `bartenderImg.png` 900 KB. Compressing them, or serving WebP, would noticeably speed up first load.
- **Heading hierarchy.** Cards use `<h1>` for section titles and `<h2>` for dates, so most pages have many `<h1>`s. Dropping the card titles to `<h2>`/`<h3>` would fix the outline for screen readers and search engines.

---

## 🔮 Possible Next Steps

- [ ] Connect the contact form to a real delivery service — the confirmation page already exists
- [ ] Fix the LinkedIn URL and add the missing jQuery tags
- [ ] Compress the images and drop the two unused files
- [ ] Rework the heading levels and add `loading="lazy"` to the photographs
- [ ] Add the newer projects to the About page as they land

---

## 👤 Author

**João Pedro Luz**

- GitHub: [@JoaoLuzWork](https://github.com/JoaoLuzWork)
- Email: <joao.pedro.luz.work@gmail.com>
- Location: Dublin, Ireland

🌐 Live site: **[e-portifolio-sooty.vercel.app](https://e-portifolio-sooty.vercel.app/index.html)**

---

## 📄 License

This project is open source and available for personal and educational use.
