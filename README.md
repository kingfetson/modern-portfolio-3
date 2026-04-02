# 🌌 Simon's Modern Portfolio & ATS Resume Builder

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-production--ready-brightgreen.svg)
![No Build](https://img.shields.io/badge/Build-None%20Required-8a2be2.svg)

**A stunning, dark-themed portfolio with an intelligent, client-side ATS Resume & CV generator.**

[✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [🛠 Tech Stack](#-tech-stack) • [📖 Usage](#-usage) • [🔧 Customization](#-customization)

</div>

---

## 📋 Overview

This is a **single-page, zero-dependency portfolio** designed for professionals who want a **visually striking online presence** without compromising functionality. The project deliberately removes traditional `Skills` and `Works` sections to focus on a **high-impact home page** and a **powerful, ATS-optimized Resume/CV builder**.

Everything runs **100% in the browser**. No servers, no build tools, no data leaves your machine.

---

## ✨ Features

### 🎨 Design & UX
- **Animated Hero Background**: Floating gradient orbs with subtle grid overlay
- **Glassmorphism UI**: Frosted-glass navigation, cards, and form containers
- **Dynamic Profile Visual**: Rotating gradient ring with bobbing floating badges
- **Smooth Transitions**: Page switching with fade animations & scroll-to-top
- **Fully Responsive**: Mobile hamburger menu, adaptive grids, touch-friendly inputs

### 📄 ATS Resume & CV Builder
- **Smart File Upload**: Drag & drop or click to upload `.pdf` or `.docx`
- **Auto-Parsing**: Extracts name, email, phone, and keywords automatically
- **Manual Editor**: Clean, sectioned forms for experience, education, skills
- **Live ATS Preview**: See exactly how recruiters will see your document
- **One-Click PDF Export**: High-quality, print-ready PDF generation
- **Persistent History**: All generated documents saved to `localStorage` with preview/download/delete controls

### 🔒 Privacy & Performance
- **Zero Backend**: All processing happens locally via JavaScript
- **No Tracking**: No analytics, cookies, or third-party data collection
- **Lightweight**: ~15KB CSS, ~8KB JS (excluding CDN libraries)
- **Offline Capable**: Works without internet after initial load

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Structure** | Semantic HTML5 |
| **Styling** | CSS3 (Custom Properties, Glassmorphism, CSS Grid/Flexbox, Keyframe Animations) |
| **Logic** | Vanilla JavaScript (ES6+) |
| **PDF Parsing** | [PDF.js](https://mozilla.github.io/pdf.js/) |
| **DOCX Parsing** | [Mammoth.js](https://github.com/mwilliamson/mammoth.js) |
| **PDF Generation** | [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) |
| **Icons** | [Font Awesome 6](https://fontawesome.com/) |
| **Typography** | [Inter](https://fonts.google.com/specimen/Inter) + [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) |

---

## 🚀 Quick Start

### Option 1: Direct Open (Fastest)
```bash
# 1. Download or clone the project
git clone https://github.com/yourusername/simon-portfolio.git
cd simon-portfolio

# 2. Open in browser
open index.html
# or double-click index.html in your file explorer
```

### Option 2: Local Development Server
```bash
# Using Python 3
python -m http.server 8080

# Using Node.js
npx serve .

# Using VS Code
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

> 💡 **No `npm install`, no `webpack`, no `node_modules`. Just open and go.**

---

## 📖 Usage Guide

### 🏠 Navigating
- Use the **glass navigation bar** to switch between: `Home`, `About`, `Resume`, `CV`, `Contact`
- On mobile, tap the **hamburger icon** to reveal the menu
- All transitions are instant with smooth fade animations

### 📝 Building an ATS Resume
1. Click **Resume** in the nav
2. Upload an existing PDF/DOCX (optional) → auto-fills fields
3. Click **Edit Manually** to refine or add experience/education
4. Click **Save & Generate ATS Resume**
5. Review the preview → Click **Download PDF**

### 📑 Building an ATS CV
1. Click **CV** in the nav
2. Follow the same upload/edit workflow
3. Includes extra fields for **Publications** and expanded skills
4. Generate → Preview → Download

### 📦 Managing History
- All generated documents auto-save to browser storage
- Scroll down to the **History** section
- Use **View** to preview, **PDF** to download, or **🗑** to delete
- History persists across sessions until manually cleared

---

## 📁 File Structure

```
simon-portfolio/
│
├── index.html          # Single-page structure (Home, About, Resume, CV, Contact)
├── style.css           # Dark theme, glassmorphism, animations, responsive breakpoints
├── script.js           # Navigation, file parsing, ATS generation, history management
└── README.md           # Documentation (this file)
```

---

## 🔧 Customization

### 🎨 Change Colors & Theme
Edit CSS variables in `style.css`:
```css
:root {
  --primary: #6366f1;       /* Main accent */
  --accent: #8b5cf6;        /* Secondary gradient */
  --bg-dark: #0a0a0f;       /* Background */
  --glass-bg: rgba(255, 255, 255, 0.04);
}
```

### 👤 Update Profile Info
- Replace the profile image URL in `index.html` (search for `https://images.unsplash.com/...`)
- Edit text directly in the HTML `<section id="home">` and `<section id="about">`
- Update contact details in `<section id="contact">`

### 📏 Adjust History Limit
In `script.js`, modify the cap:
```javascript
if (hist.length > 20) hist.pop(); // Change 20 to your preferred limit
```

### 🌐 Change Fonts
Update the Google Fonts link in `<head>` and change `font-family` in CSS.

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| Mobile Safari/Chrome | Latest | ✅ Fully Responsive |

> ⚠️ Requires modern JavaScript (ES6+) and `localStorage` support.

---

## 🔒 Privacy & Security

- **Client-Side Only**: Files are parsed in-memory. Nothing is uploaded to any server.
- **Local Storage**: Resume/CV history is stored in your browser's `localStorage`. Clearing browser data will remove it.
- **No Tracking**: Zero analytics, cookies, or external telemetry.
- **GDPR/HIPAA Friendly**: Safe for professional use. Never paste sensitive patient/client data into the builder.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Simon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 📞 Contact & Support

**Simon** - *Portfolio Creator & Developer*

- 📧 **Email**: simon@example.com
- 🌐 **Portfolio**: [yourdomain.com](#)
- 💼 **LinkedIn**: [linkedin.com/in/yourprofile](#)
- 🐙 **GitHub**: [github.com/yourusername](#)

Found a bug or have a feature request? [Open an Issue](https://github.com/yourusername/simon-portfolio/issues) or submit a Pull Request.

---

## 🙏 Acknowledgments

- **PDF.js** by Mozilla - Robust client-side PDF rendering
- **Mammoth.js** - Clean DOCX text extraction
- **html2pdf.js** - Seamless client-side PDF generation
- **Font Awesome** - Consistent, scalable iconography
- **Google Fonts** - Beautiful, web-optimized typography

---

<div align="center">

**Built with precision, designed for impact.**

⭐ **If this project helped you, please star the repository!** ⭐

[ Back to Top](#-simons-modern-portfolio--ats-resume-builder)

</div>
