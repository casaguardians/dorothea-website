// Dorothea contact configuration
// Replace these two values when you have the final business contact details.
const WHATSAPP_NUMBER = ""; // International format, digits only. Example: 34600111222
const CONTACT_EMAIL = "";   // Example: hello@yourdomain.com

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');

menuToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => header.classList.remove('open'));
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
    `How can I help?\n${data.get('message')}`
  );

  if (CONTACT_EMAIL) {
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  } else {
    status.textContent = "The form is ready — add your email address in script.js to activate sending.";
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
