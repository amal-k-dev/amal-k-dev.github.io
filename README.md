# Amal K Dev — Personal Portfolio Website

A modern, high-performance, and responsive portfolio website designed for **Amal K Dev** (Senior Software Engineer & Full-Stack Architect with 10+ years of experience, currently at Boxarr Ltd, UK).

Built specifically for seamless, zero-config hosting on **GitHub Pages**.

---

## ✨ Features

- **Executive Engineering Design**: Dark mode aesthetic (`#080c14`), luminous cyan & violet accents, and glassmorphism components.
- **Dynamic Digital Twin Background**: Interactive HTML5 canvas particle/node-graph simulation representing connected systems and digital twins.
- **Dynamic Role Typist**: Automated typing effect highlighting core expertise (Angular, React, Python, .NET Core, Digital Twins).
- **Interactive Project Deep-Dives**: Detailed case study modals for:
  - BOXARR Enterprise Digital Twin Platform
  - Expressbase RAD & Dynamic API Builder (.NET Core)
  - RMad Cross-Platform Mobile Engine (Xamarin)
  - Instio Hospitality Suite & Microservices (Python/Django & Docker)
- **Interactive Technical Skills Matrix**: Filterable skills categorized into Frontend, Backend, Mobile, and Databases & DevOps.
- **Integrated Curriculum Vitae**:
  - In-modal interactive resume viewer
  - Dedicated printable resume page (`resume.html`) with `@media print` styles for clean A4/Letter PDF downloads.
- **Direct Contact & Copy Utilities**:
  - One-click "Copy Email" and "Copy Phone" with animated toast notifications.
  - Interactive contact form with mailto trigger.
  - Direct LinkedIn profile link.

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

You can publish this portfolio live to the web in **under 2 minutes** using GitHub Pages.

### Option A: Create a New Repository via Terminal (Quickest)

1. Open your terminal in this project directory:
   ```bash
   cd "C:\Users\hp\Projects\Dynamix\Projects\amalkdev_portfolio"
   ```

2. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Amal K Dev portfolio website"
   ```

3. Create a new repository on [GitHub](https://github.com/new).
   - If you name it `<your-username>.github.io`, your site will be hosted at `https://<your-username>.github.io/`
   - Or name it `amalkdev_portfolio`, and it will be hosted at `https://<your-username>.github.io/amalkdev_portfolio/`

4. Link the remote and push to `main`:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

5. Turn on **GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment**:
     - **Source**: Select **GitHub Actions** (or select **Deploy from a branch** and choose `main` / `/ (root)`).
     - Click **Save**.
   - Your website is now live! 🎉

---

## 💻 Local Testing & Preview

To preview the portfolio locally before pushing, you can run any local static file server:

### Using Python:
```bash
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

### Using Node.js (npx serve):
```bash
npx serve .
```

---

## 📁 Project Structure

```
amalkdev_portfolio/
├── index.html              # Main landing page & interactive sections
├── styles.css              # Custom design system & responsive styling
├── app.js                  # Canvas simulation, modals, skills filter & toasts
├── resume.html             # Clean printable resume for PDF export
├── README.md               # Documentation and GitHub Pages hosting guide
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automated GitHub Actions deployment workflow
└── assets/
    └── images/
        ├── avatar.jpg      # Professional portrait avatar
        ├── digital_twin.jpg# BOXARR Digital Twin platform visual
        └── rad_builder.jpg # Expressbase RAD builder visual
```

---

## 📬 Contact

- **Email**: [amalkdevs1355@gmail.com](mailto:amalkdevs1355@gmail.com)
- **Phone**: +91 9747063404
- **LinkedIn**: [linkedin.com/in/amal-k-dev-535792135](https://www.linkedin.com/in/amal-k-dev-535792135)
