const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const toggleLabel = themeToggle?.querySelector('.toggle-label');
const navToggle = document.querySelector('.nav-toggle');
const navPanel = document.querySelector('.nav-panel');
const typedText = document.getElementById('typedText');
const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const year = document.getElementById('year');

const savedTheme = localStorage.getItem('portfolio-theme');

const applyTheme = (theme) => {
  const isLight = theme === 'light';
  body.classList.toggle('light-theme', isLight);
  themeToggle?.setAttribute('aria-pressed', String(isLight));
  if (toggleLabel) {
    toggleLabel.textContent = isLight ? 'Light' : 'Dark';
  }
};

const currentTheme = savedTheme || 'dark';
applyTheme(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', nextTheme);
    applyTheme(nextTheme);
  });
}

if (navToggle && navPanel) {
  navToggle.addEventListener('click', () => {
    const isOpen = navPanel.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navPanel.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const phrases = [
  'Software Engineer',
  'Problem Solver',
  'Frontend Developer',
  'Web Applications'
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

const typeLoop = () => {
  const currentPhrase = phrases[phraseIndex];

  if (!typedText) return;

  if (!deleting) {
    charIndex += 1;
    typedText.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex === currentPhrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    charIndex -= 1;
    typedText.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = deleting ? 45 : 90;
  setTimeout(typeLoop, speed);
};

typeLoop();

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (year) {
  year.textContent = new Date().getFullYear();
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    if (!nameField || !emailField || !messageField) return;

    if (!nameField.value.trim() || !emailField.value.trim() || !messageField.value.trim()) {
      toast.textContent = 'Please complete all fields before sending.';
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
      return;
    }

    toast.textContent = 'Message sent successfully.';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
    form.reset();
  });
}
