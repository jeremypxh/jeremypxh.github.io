# Xinghao Peng · personal research site

A static site for GitHub Pages: plain HTML, CSS and JavaScript, with no build step and no dependencies.
Edit the `.html` files directly and the changes go live when you upload them.

```
personal-website/
├── index.html              Home: about, news, research, publications, experience, awards, teaching, gallery
├── projects/
│   ├── scout.html          SCOUT: UAV coverage control (video slot, framework figure, BibTeX)
│   ├── stem.html           STEM: structural embeddings for 3D designs (template for new papers)
│   ├── heart.html          Cardiac digital twins: adaptive inverse DOE
│   ├── wind.html           Wind power grid integration: ramp prediction to dispatch
│   └── port.html           Berth and quay-crane allocation at Yangshan Port
├── 404.html                "Page not found" page
├── assets/
│   ├── css/style.css       All styling. Colors are the tokens at the top (light and dark)
│   ├── js/main.js          Theme toggle, mobile menu, publication filter, BibTeX copy, photo viewer
│   ├── img/                Profile, gallery (sm = grid, lg = full size), icons
│   │   └── projects/       The core figure of each project, from its paper (WebP)
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

## Placeholders still to fill

Search the HTML for `TODO` and `is-todo`.

- [x] **GitHub username:** `jeremypxh`. It's used in the preview tags and the GitHub links.
- [x] **Research text:** the summaries, project pages and BibTeX follow the papers in `CV/paper` and the project documents in `CV/projects`.
- [x] **Profile links:** GitHub, Google Scholar and LinkedIn are filled in (hero and footer).
- [ ] **Service** (`index.html`, "Teaching, talks & service"). Replace the dashed box with your reviewing or committee roles.
- [ ] **News months.** NAMRC 54 and IEEE CASE 2026 are listed as "Summer 2026". Replace them with the exact months if you like.

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

**Edit a project page.** Each project page has the same short structure: the title, three cards (**Challenge**, **Gap**, **Our contribution**), one core figure from the paper (the methodology framework), and the citation. Edit the text inside the cards directly.

**Replace the core figure.** The figures are WebP files in `assets/img/projects/<project>/` (PNG and JPG work too; 1600–2000 px wide is plenty). In the `<figure class="paper-fig …">` block, change the file name in both `href` (the full-size view) and `src`, set `width` and `height` to the image's pixel size, and edit the caption. `paper-fig--narrow` or `paper-fig--medium` in the class sets the display width. The same file is used for the project's card on the home page.

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
- Figures: taken from the papers and project reports and credited in each caption (© 2025 IEEE for SCOUT, © 2024 Elsevier Ltd. for the *Renewable Energy* paper, CC BY-NC-ND 4.0 for the *Manufacturing Letters* paper).
