// Dorothea contact configuration
// Existing business contact details.
const WHATSAPP_NUMBER = "34678718052"; 
const CONTACT_EMAIL = "info@casaguardians.com";  

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');

menuToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#service-interest').value = link.dataset.service;
  });
});

const whatsappUrl = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Dorothea, I'd like to make a private enquiry.")}`
  : null;

document.querySelectorAll('.whatsapp-link').forEach(link => {
  if (whatsappUrl) {
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener";
  } else {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert("Add your WhatsApp number in script.js first.");
    });
  }
});

const form = document.querySelector('.contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const status = form.querySelector('.form-status');
  const data = new FormData(form);
  const subject = encodeURIComponent("Private enquiry — Dorothea");
  const body = encodeURIComponent(
    `Name: ${data.get('name')}\n` +
    `Contact: ${data.get('contact')}\n` +
    `Property location: ${data.get('location')}\n\n` +
    `Service: ${data.get('service')}\n\n` +
    `How can I help?\n${data.get('message')}`
  );

  if (CONTACT_EMAIL) {
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    status.textContent = "Your enquiry is ready in your email app. Please press Send there. If it did not open, you can contact us on WhatsApp.";
  } else {
    status.textContent = "The form is ready — add your email address in script.js to activate sending.";
  }
});

// Animate only the three selected sections, once per page visit.
// Content stays readable if animation or JavaScript is unavailable.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (reducedMotion.matches || typeof entry.target.animate !== 'function') return;
      const card = entry.target.classList.contains('model-card');
      const index = card ? [...entry.target.parentElement.children].indexOf(entry.target) : 0;
      const animation = entry.target.animate([
        { opacity: 0, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 850,
        delay: card && window.innerWidth > 1000 ? index * 100 : 0,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'backwards'
      });
      const stopMotion = () => { if (reducedMotion.matches) animation.cancel(); };
      reducedMotion.addEventListener('change', stopMotion);
      animation.finished.catch(() => {}).finally(() => {
        reducedMotion.removeEventListener('change', stopMotion);
      });
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '#about .portrait-wrap, #about .founder-copy, ' +
    '#new-home .feature-image, #new-home .feature-copy, .model-card'
  ).forEach(el => observer.observe(el));
}
