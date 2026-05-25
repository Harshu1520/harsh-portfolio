# Harshkumar Gupta | Professional Tech Portfolio

A state-of-the-art, visually stunning, and highly responsive personal portfolio website designed for **Harshkumar Gupta**. This portfolio is specifically built using vanilla web technologies for lightning-fast performance and premium glassmorphic aesthetics, making it the perfect platform to feature in ATS-friendly resumes for recruiters.

Live Local Preview: **[http://localhost:8000](http://localhost:8000)** (when running server)

---

## ✨ Features Built

1. **Light & Dark Theme Manager**: Supports a premium Dark Theme (default) with deep navy/black backgrounds and glowing blue-violet accents, alongside a crisp, high-contrast Light Theme. State choices are saved in `localStorage` to persist across visits.
2. **Premium Visual Hero**: Features a custom 3D neon-lit illustration of a developer working at a desk, a dynamic typing text animator cycle of professional titles, and floating social connection controls.
3. **Integrated Global Journey Timeline**: A highly creative vertical timeline displaying UK business management academic/retail experience (University of Leicester, Tesco, Samworth Brothers) alongside India IT academic/operations experience (R.G.P. Institute of Technology, Zclick, Bharat Restaurant).
4. **Interactive Skills Tab Filter**: Dynamic, grid-aligned skills showcase grouped into **Web & API**, **AI & Cloud**, **Security & Logic**, and **Business & People** tabs with layout sorting transitions.
5. **Graduation Group Project Showcase**: Direct integration of your **Evidence Management System (EMS)** IT graduation project built under GTU guidelines with a 3-member team. Features a clean preview card and a direct **"View Project Report PDF"** download button.
6. **Consolidated Certificates Modal**: Built-in verification vault that allows recruiters to click any credential (Deloitte Cyber, JPMorgan Chase Software Engineering, TATA Cyber, Google AI, Microsoft GenAI) and view your consolidated **17-certificate verified ledger** dynamically inside a custom PDF Lightbox viewer.
7. **Contact Form & Floating Outlines**: Sleek contact input fields with floating outlines that scale upwards on focus, alongside mock form submission states.

---

## 📂 Project Directory Structure

```
harsh-portfolio/
│
├── index.html          # Core structure, semantic HTML5, layouts & modals
├── style.css           # Glassmorphism design system, CSS theme variables & keyframe animations
├── app.js            # Typewriter animation, theme toggling, scroll reveal & lightbox modals
├── .nojekyll           # SPECIAL FILE: Tells GitHub Pages to skip Jekyll compilation and deploy static HTML directly
├── README.md           # Documentation and hosting instructions
└── assets/             # Raw file catalog containing:
    ├── developer_hero_graphic.png        # Generated custom header illustration
    ├── Harshkumar_Gupta_Resume.pdf        # Your uploaded ATS resume PDF
    ├── Harshkumar_Gupta_Certificates.pdf  # 17 compiled verification certificates
    └── Harshkumar_Gupta_Group_Project.pdf # Teammate graduation project report PDF
```

---

## 🚀 How to Run Locally

Since the site is built on semantic vanilla web code, you can run it instantly using either option:

### Option A: Direct Open (Easiest)
Simply double-click on **`index.html`** in your File Explorer. It will immediately open your portfolio in your default browser.

### Option B: Local Python Web Server (Recommended)
Running a local web server prevents browser CORS policy blocks when displaying embedded PDFs inside the custom viewer:
1. Open PowerShell / Command Prompt inside this folder.
2. Start the lightweight server by running:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and go to **[http://localhost:8000](http://localhost:8000)**.

---

## 🌐 How to Deploy Online (100% Free)

To get a public URL for your ATS resume, deploy your folder using any of these simple options:

### Method A: GitHub Pages (Best for Version Control)
1. Register/Login to [github.com](https://github.com).
2. Create a new repository named `harsh-portfolio`.
3. Upload all the project files and folders (`index.html`, `style.css`, `app.js`, `.nojekyll`, `README.md`, and the `assets` folder) directly into your repository.
4. Navigate to **Settings** -> **Pages** in the repo.
5. Under **"Build and deployment"**:
   * **Source**: Select `Deploy from a branch`.
   * **Branch**: Select `main` (or `master`) and change the folder selection dropdown to **`/ (root)`** instead of `/docs`. **Do NOT select `/docs`** as your files are placed in the root folder!
   * Click **Save**.
6. Your live link will be ready at: `https://<your-username>.github.io/harsh-portfolio/`

> [!TIP]
> **Why did the SCSS / Jekyll build error occur?**
> By default, GitHub Pages attempts to build your page using a compiler called Jekyll (which looks for SCSS stylesheets inside a `/docs` subfolder). Because our portfolio is a pure static HTML5/CSS3 site, we bypass Jekyll completely by placing a file named `.nojekyll` in the root folder. This resolves all build errors and ensures your site deploys instantly and flawlessly!

### Method B: Vercel (Easiest Drag-and-Drop)
1. Go to [vercel.com](https://vercel.com) and create an account.
2. Head to your Dashboard, select **Add New** -> **Project**.
3. Drag and drop your entire `harsh Portfolio` folder directly into the deployment block.
4. Vercel will instantly generate a clean URL like `harsh-portfolio.vercel.app`!

### Method C: Netlify
1. Go to [netlify.com](https://netlify.com).
2. Navigate to "Sites" and scroll to the drag-and-drop box.
3. Drag your `harsh Portfolio` folder into the box.
4. Netlify will deploy it in seconds and let you customize the domain name under site settings.
