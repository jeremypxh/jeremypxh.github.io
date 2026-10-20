# Xinghao Peng · personal research site

A static site for GitHub Pages: plain HTML, CSS and JavaScript, with no build step and no dependencies.
Edit the `.html` files directly and the changes go live when you upload them.

```
personal-website/
├── index.html              Home: about, news, research, publications, experience, awards, teaching, gallery
├── projects/
│   ├── scout.html          Project page (video slot, framework and results figures, BibTeX)
│   └── stem.html           Project page, also the template for new projects
├── 404.html                "Page not found" page
├── assets/
│   ├── css/style.css       All styling. Colors are the tokens at the top (light and dark)
│   ├── js/main.js          Theme toggle, mobile menu, publication filter, BibTeX copy, photo viewer
│   ├── img/                Profile, gallery (sm = grid, lg = full size), project images, icons
│   ├── videos/             Put demo videos here
│   ├── cv/                 Xinghao_Peng_CV.pdf
│   └── fonts/              Inter, Space Grotesk, JetBrains Mono (SIL OFL)
└── .nojekyll               Tells GitHub Pages to serve the files as they are
```

## Preview on your Mac

Double-click `index.html`. Everything works offline, including dark mode and the photo viewer.

## Publish on GitHub Pages (about 10 minutes)

1. Sign in to GitHub and note your **username**. GitHub needs the username here, not your email address.
2. Create a new **public** repository named exactly `USERNAME.github.io`, for example `jeremypxh.github.io`.
3. In the new repository, click **Add file → Upload files**. Drag in everything *inside* `personal-website`, not the folder itself, then click **Commit changes**.
   - The browser uploader takes files up to 25 MB each.
   - Finder hides `.nojekyll`. The site works without it, but you can add it with **Add file → Create new file**: name it `.nojekyll` and leave it empty.
4. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, then branch **main** and folder **/ (root)**, and click **Save**.
5. After a minute or two the site is live at `https://USERNAME.github.io`. Later uploads update it automatically.

If you prefer git, run these commands inside `personal-website`:

```bash
git init -b main
git add .
git commit -m "Personal site"
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin main
```

## Before you publish: placeholders to fill

Search the HTML for `TODO` and `is-todo`.

- [ ] **GitHub username.** The site assumes `jeremypxh`. If yours differs, find and replace `jeremypxh` in `index.html` and `projects/*.html`.
- [ ] **Profile links** (`index.html`, hero section). Paste your Google Scholar, LinkedIn and ORCID URLs into `href="#"` and delete `is-todo` from each link's `class`. Delete any link you don't use.
- [ ] **Service** (`index.html`, "Teaching, talks & service"). Replace the dashed box with your reviewing or committee roles.
- [ ] **STEM abstract** (`projects/stem.html`). Replace the dashed box with the abstract or a short summary.
- [ ] **Check the wording.** The research summaries were written from your CV and paper titles. Check the "Summer 2026" months in News and the "Open to research internships · Summer 2027" banner.

## Common updates

**Add a news item.** In `index.html`, copy one `<li>…</li>` in the News list and paste it at the top. The tag classes are `tag` (teal), `tag-award`, `tag-paper` and `tag-milestone`.

**Add a publication.** Copy a `<li class="pub" …>` block inside the right year group. Set `data-type` to `journal`, `conference` or `review`, which the filter buttons use, and update the counts on those buttons. Give each BibTeX block its own `id`s: `bib-NAME-box` for the box and `bib-NAME` for the `<pre>`, and point the button's `aria-controls` and the copy button's `data-copy` at them.

**Add the SCOUT demo video.**

1. Copy `AI-video/SCOUT-demo/SCOUT_demo_1080p_share.mp4` (15 MB) to `assets/videos/scout-demo.mp4`.
2. In `projects/scout.html`, replace the `<div class="media-frame">…</div>` under the "VIDEO SLOT" comment with option (a) from that comment.
3. Change the "Video · soon" button into a link. The comment above the buttons shows how.

**Use YouTube instead.** Keeping big videos out of the repository makes the site faster. Upload the video as Unlisted and use option (b) with your video ID.

**Make a video web-friendly** (smaller file, starts playing right away):

```bash
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k output.mp4
```

Keep files in the repository under about 50 MB. GitHub rejects files over 100 MB, and the whole site should stay well under 1 GB.

**Add a framework or result figure.** Save it as PNG or JPG, about 2000 px wide, in `assets/img/projects/scout/` (or `stem/`). Then replace the matching `<div class="figure-slot">` with the `<figure>` snippet in the comment above it.

**Add a new project page.**

1. Duplicate `projects/stem.html` and rename it, for example `projects/genome.html`.
2. Edit the title, authors, links, text and BibTeX.
3. Add a card for it in the Research section of `index.html` by copying the STEM `<article class="project">` block.

**Add photos to the gallery.** Export two sizes: about 1600 px on the long side (`-lg.jpg`) and about 800 px (`-sm.jpg`). Remove location data when you export: in Photos on a Mac, choose File → Export and uncheck *Location Information*. Copy a `<a class="g-item">` block in `index.html` and give it a placement class. The grid layout is defined under `.gallery` in `style.css`.

**Update the CV.** Replace `assets/cv/Xinghao_Peng_CV.pdf` and keep the same file name.

**Change colors.** Edit the tokens at the top of `assets/css/style.css`. `:root` holds the light theme and `[data-theme="dark"]` the dark one.

## Credits

- Fonts: Inter, Space Grotesk and JetBrains Mono, under the SIL Open Font License 1.1 (`assets/fonts/OFL-LICENSES.txt`).
- Icons: Lucide (ISC), Simple Icons (CC0) and Font Awesome Free (CC BY 4.0, LinkedIn icon).
- Photos and the SCOUT poster: © Xinghao Peng.
