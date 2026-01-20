document.addEventListener('DOMContentLoaded', () => {

  /* --- Theme Toggle Logic --- */
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initial Theme Setup
  if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
    body.setAttribute('data-theme', 'light');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    body.setAttribute('data-theme', 'dark');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }

  // Toggle Event
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Swap Icon
    if (newTheme === 'light') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  });
  /* --------------------------- */

  /* --- Navbar Title Scroll Logic --- */
  const pageTitle = document.getElementById('page-title');
  const sections = document.querySelectorAll('section, header');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px', // Trigger when section is near top
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        let titleText = 'Portfolio';

        if (id === 'hero') {
          pageTitle.classList.remove('visible'); // Hide title on hero
        } else {
          // Map IDs to Titles
          if (id === 'about') titleText = 'About Me';
          else if (id === 'skills') titleText = 'Tech Stack';
          else if (id === 'projects') titleText = 'Projects';
          else if (id === 'experience') titleText = 'Experience';

          pageTitle.textContent = titleText;
          pageTitle.classList.add('visible');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
  /* --------------------------- */

  // Reveal Animations on Scroll
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;

      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);

  // Trigger once on load to show initial elements
  revealOnScroll();

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
