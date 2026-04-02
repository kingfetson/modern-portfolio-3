pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-links');

function navigateTo(pageId) {
  navLinks.forEach(l => l.classList.remove('active'));
  document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
  pages.forEach(p => p.classList.remove('active-page'));
  document.getElementById(pageId).classList.add('active-page');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page);
    if (window.innerWidth <= 600) navMenu.classList.remove('active');
  });
});

mobileToggle.addEventListener('click', () => navMenu.classList.toggle('active'));

// Storage Keys
const RESUME_KEY = 'ats_resume_history';
const CV_KEY = 'ats_cv_history';
let currentResume = null;
let currentCV = null;

// Upload Handlers
document.getElementById('resumeUpload').addEventListener('change', e => handleUpload(e, 'resume'));
document.getElementById('cvUpload').addEventListener('change', e => handleUpload(e, 'cv'));

async function handleUpload(e, type) {
  const file = e.target.files[0];
  const status = document.getElementById(`${type}UploadStatus`);
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) {
    showStatus(status, 'File too large (max 10MB)', 'error');
    return;
  }
  showStatus(status, 'Processing...', 'success');
  
  try {
    let text = '';
    if (file.type === 'application/pdf') {
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(buf).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
      }
    } else {
      const buf = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buf });
      text = result.value;
    }
    autoFill(text, type);
    showStatus(status, 'Parsed successfully! Review & generate.', 'success');
    document.getElementById(`${type}Editor`).style.display = 'block';
    setTimeout(() => type === 'resume' ? saveAndGenerateResume(true) : saveAndGenerateCV(true), 500);
  } catch (err) {
    console.error(err);
    showStatus(status, 'Parse failed. Fill manually.', 'error');
  }
}

function showStatus(el, msg, type) {
  el.textContent = msg;
  el.className = `upload-status ${type}`;
}

function autoFill(text, type) {
  const p = type === 'resume' ? 'res' : 'cv';
  const email = text.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+/gi);
  const phone = text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/gim);
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  
  if (email) document.getElementById(`${p}Email`).value = email[0];
  if (phone) document.getElementById(`${p}Phone`).value = phone[0];
  if (lines.length) document.getElementById(`${p}Name`).value = lines[0].trim();
}

// Toggles
function toggleResumeEditor() {
  const ed = document.getElementById('resumeEditor');
  ed.style.display = ed.style.display === 'none' ? 'block' : 'none';
  document.getElementById('resumeToggleText').textContent = ed.style.display === 'none' ? 'Edit Manually' : 'Hide Editor';
}

function toggleCVEditor() {
  const ed = document.getElementById('cvEditor');
  ed.style.display = ed.style.display === 'none' ? 'block' : 'none';
  document.getElementById('cvToggleText').textContent = ed.style.display === 'none' ? 'Edit Manually' : 'Hide Editor';
}

// Dynamic Fields
function addWorkExperience() {
  const c = document.getElementById('workExperienceContainer');
  c.insertAdjacentHTML('beforeend', `
    <div class="experience-item" style="background:rgba(255,255,255,0.03);padding:15px;border-radius:8px;margin-bottom:15px;border-left:3px solid var(--primary);">
      <input type="text" class="job-title" placeholder="Job Title" style="width:100%;margin-bottom:8px;padding:8px;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border);border-radius:6px;color:white;">
      <input type="text" class="company" placeholder="Company" style="width:100%;margin-bottom:8px;padding:8px;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border);border-radius:6px;color:white;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:8px;">
        <input type="text" class="date-start" placeholder="Start" style="padding:8px;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border);border-radius:6px;color:white;">
        <input type="text" class="date-end" placeholder="End" style="padding:8px;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border);border-radius:6px;color:white;">
      </div>
      <textarea class="job-desc" rows="2" placeholder="Responsibilities..." style="width:100%;padding:8px;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border);border-radius:6px;color:white;"></textarea>
    </div>`);
}

function addEducation() {
  const c = document.getElementById('educationContainer');
  c.insertAdjacentHTML('beforeend', `
    <div style="background:rgba(255,255,255,0.03);padding:15px;border-radius:8px;margin-bottom:15px;border-left:3px solid var(--primary);">
      <input type="text" class="degree" placeholder="Degree" style="width:100%;margin-bottom:8px;padding:8px;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border);border-radius:6px;color:white;">
      <input type="text" class="school" placeholder="School" style="width:100%;margin-bottom:8px;padding:8px;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border);border-radius:6px;color:white;">
      <input type="text" class="edu-date" placeholder="Year" style="width:100%;padding:8px;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border);border-radius:6px;color:white;">
    </div>`);
}

function addCVExperience() { addWorkExperience(); } // Reuse structure
function addCVEducation() { addEducation(); }

// Collect Data
function collectResumeData() {
  const exp = [];
  document.querySelectorAll('#workExperienceContainer > div').forEach(d => {
    exp.push({
      title: d.querySelector('.job-title').value,
      company: d.querySelector('.company').value,
      start: d.querySelector('.date-start').value,
      end: d.querySelector('.date-end').value,
      desc: d.querySelector('.job-desc').value
    });
  });
  const edu = [];
  document.querySelectorAll('#educationContainer > div').forEach(d => {
    edu.push({
      degree: d.querySelector('.degree').value,
      school: d.querySelector('.school').value,
      date: d.querySelector('.edu-date').value
    });
  });
  return {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    name: document.getElementById('resName').value || 'Your Name',
    title: document.getElementById('resTitle').value,
    email: document.getElementById('resEmail').value || 'email@example.com',
    phone: document.getElementById('resPhone').value,
    location: document.getElementById('resLocation').value,
    summary: document.getElementById('resSummary').value,
    skills: document.getElementById('resSkills').value,
    experience: exp,
    education: edu
  };
}

function collectCVData() {
  const exp = [];
  document.querySelectorAll('#cvExperienceContainer > div').forEach(d => {
    exp.push({
      title: d.querySelector('.job-title').value,
      company: d.querySelector('.company').value,
      start: d.querySelector('.date-start').value,
      end: d.querySelector('.date-end').value,
      desc: d.querySelector('.job-desc').value
    });
  });
  const edu = [];
  document.querySelectorAll('#cvEducationContainer > div').forEach(d => {
    edu.push({
      degree: d.querySelector('.degree').value,
      school: d.querySelector('.school').value,
      date: d.querySelector('.edu-date').value
    });
  });
  return {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    name: document.getElementById('cvName').value || 'Your Name',
    title: document.getElementById('cvTitle').value,
    email: document.getElementById('cvEmail').value || 'email@example.com',
    phone: document.getElementById('cvPhone').value,
    location: document.getElementById('cvLocation').value,
    summary: document.getElementById('cvSummary').value,
    skills: document.getElementById('cvSkills').value,
    publications: document.getElementById('cvPublications').value,
    experience: exp,
    education: edu
  };
}

// Save & Generate
function saveAndGenerateResume(auto = false) {
  const data = collectResumeData();
  if (!data.name || !data.email) return alert('Name & Email required');
  saveHistory(data, RESUME_KEY);
  currentResume = data;
  renderResumePreview(data);
  if (!auto) {
    document.getElementById('resumePreviewSection').style.display = 'block';
    document.getElementById('resumePreviewSection').scrollIntoView({ behavior: 'smooth' });
  }
  loadHistory('resume');
}

function saveAndGenerateCV(auto = false) {
  const data = collectCVData();
  if (!data.name || !data.email) return alert('Name & Email required');
  saveHistory(data, CV_KEY);
  currentCV = data;
  renderCVPreview(data);
  if (!auto) {
    document.getElementById('cvPreviewSection').style.display = 'block';
    document.getElementById('cvPreviewSection').scrollIntoView({ behavior: 'smooth' });
  }
  loadHistory('cv');
}

function saveHistory(data, key) {
  let hist = JSON.parse(localStorage.getItem(key) || '[]');
  hist.unshift(data);
  if (hist.length > 20) hist.pop();
  localStorage.setItem(key, JSON.stringify(hist));
}

// Render Previews
function renderResumePreview(d) {
  document.getElementById('resumePreviewContainer').innerHTML = `
    <div class="ats-template">
      <div class="ats-header">
        <h1>${d.name}</h1>
        ${d.title ? `<div class="ats-title">${d.title}</div>` : ''}
        <div class="ats-contact">${d.email} ${d.phone ? `| ${d.phone}` : ''} ${d.location ? `| ${d.location}` : ''}</div>
      </div>
      ${d.summary ? `<div class="ats-section"><h2>Summary</h2><p>${d.summary}</p></div>` : ''}
      ${d.experience.length ? `<div class="ats-section"><h2>Experience</h2>${d.experience.map(e => `
        <div class="ats-job">
          <div class="ats-job-header"><div><span class="ats-job-title">${e.title}</span> <span class="ats-job-company">@ ${e.company}</span></div><div class="ats-job-date">${e.start} - ${e.end}</div></div>
          ${e.desc ? `<div class="ats-job-desc"><ul>${e.desc.split('\n').filter(l=>l.trim()).map(l=>`<li>${l.replace(/^[-*•]\s?/,'')}</li>`).join('')}</ul></div>` : ''}
        </div>`).join('')}</div>` : ''}
      ${d.education.length ? `<div class="ats-section"><h2>Education</h2>${d.education.map(e => `
        <div class="ats-job"><div class="ats-job-header"><div class="ats-job-title">${e.degree}</div><div class="ats-job-date">${e.date}</div></div><div class="ats-job-company">${e.school}</div></div>`).join('')}</div>` : ''}
      ${d.skills ? `<div class="ats-section"><h2>Skills</h2><div class="ats-skills">${d.skills}</div></div>` : ''}
    </div>`;
}

function renderCVPreview(d) {
  document.getElementById('cvPreviewContainer').innerHTML = `
    <div class="ats-template">
      <div class="ats-header">
        <h1>${d.name}</h1>
        ${d.title ? `<div class="ats-title">${d.title}</div>` : ''}
        <div class="ats-contact">${d.email} ${d.phone ? `| ${d.phone}` : ''} ${d.location ? `| ${d.location}` : ''}</div>
      </div>
      ${d.summary ? `<div class="ats-section"><h2>Summary</h2><p>${d.summary}</p></div>` : ''}
      ${d.experience.length ? `<div class="ats-section"><h2>Experience</h2>${d.experience.map(e => `
        <div class="ats-job">
          <div class="ats-job-header"><div><span class="ats-job-title">${e.title}</span> <span class="ats-job-company">@ ${e.company}</span></div><div class="ats-job-date">${e.start} - ${e.end}</div></div>
          ${e.desc ? `<div class="ats-job-desc"><ul>${e.desc.split('\n').filter(l=>l.trim()).map(l=>`<li>${l.replace(/^[-*•]\s?/,'')}</li>`).join('')}</ul></div>` : ''}
        </div>`).join('')}</div>` : ''}
      ${d.education.length ? `<div class="ats-section"><h2>Education</h2>${d.education.map(e => `
        <div class="ats-job"><div class="ats-job-header"><div class="ats-job-title">${e.degree}</div><div class="ats-job-date">${e.date}</div></div><div class="ats-job-company">${e.school}</div></div>`).join('')}</div>` : ''}
      ${d.skills ? `<div class="ats-section"><h2>Skills</h2><div class="ats-skills">${d.skills}</div></div>` : ''}
      ${d.publications ? `<div class="ats-section"><h2>Publications</h2><p>${d.publications}</p></div>` : ''}
    </div>`;
}

// Download
function downloadCurrentResume() {
  if (!currentResume) return;
  const opt = { margin: 0.5, filename: `${currentResume.name.replace(/\s+/g,'_')}_Resume.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } };
  html2pdf().set(opt).from(document.querySelector('#resumePreviewContainer .ats-template')).save();
}

function downloadCurrentCV() {
  if (!currentCV) return;
  const opt = { margin: 0.5, filename: `${currentCV.name.replace(/\s+/g,'_')}_CV.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } };
  html2pdf().set(opt).from(document.querySelector('#cvPreviewContainer .ats-template')).save();
}

function closeResumePreview() { document.getElementById('resumePreviewSection').style.display = 'none'; }
function closeCVPreview() { document.getElementById('cvPreviewSection').style.display = 'none'; }

// History Management
function loadHistory(type) {
  const key = type === 'resume' ? RESUME_KEY : CV_KEY;
  const listId = type === 'resume' ? 'resumeHistoryList' : 'cvHistoryList';
  const hist = JSON.parse(localStorage.getItem(key) || '[]');
  const container = document.getElementById(listId);
  
  if (!hist.length) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">No history yet. Generate your first document!</p>';
    return;
  }
  
  container.innerHTML = hist.map(item => `
    <div class="history-item">
      <div class="history-item-title">${item.name}</div>
      <div class="history-item-date">${item.date}</div>
      <div class="history-item-actions">
        <button class="history-btn preview" onclick="previewFromHistory('${type}', ${item.id})"><i class="fas fa-eye"></i> View</button>
        <button class="history-btn download" onclick="downloadFromHistory('${type}', ${item.id})"><i class="fas fa-download"></i> PDF</button>
        <button class="history-btn delete" onclick="deleteFromHistory('${type}', ${item.id})"><i class="fas fa-trash"></i></button>
      </div>
    </div>`).join('');
}

function previewFromHistory(type, id) {
  const key = type === 'resume' ? RESUME_KEY : CV_KEY;
  const item = JSON.parse(localStorage.getItem(key) || '[]').find(h => h.id === id);
  if (!item) return;
  if (type === 'resume') {
    currentResume = item;
    renderResumePreview(item);
    document.getElementById('resumePreviewSection').style.display = 'block';
  } else {
    currentCV = item;
    renderCVPreview(item);
    document.getElementById('cvPreviewSection').style.display = 'block';
  }
  document.getElementById(`${type}PreviewSection`).scrollIntoView({ behavior: 'smooth' });
}

function downloadFromHistory(type, id) {
  previewFromHistory(type, id);
  setTimeout(() => type === 'resume' ? downloadCurrentResume() : downloadCurrentCV(), 100);
}

function deleteFromHistory(type, id) {
  if (!confirm('Delete this document?')) return;
  const key = type === 'resume' ? RESUME_KEY : CV_KEY;
  let hist = JSON.parse(localStorage.getItem(key) || '[]').filter(h => h.id !== id);
  localStorage.setItem(key, JSON.stringify(hist));
  loadHistory(type);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  loadHistory('resume');
  loadHistory('cv');
});
