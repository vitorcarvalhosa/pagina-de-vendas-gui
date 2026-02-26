// main.js — Método C.E.O. Sales Page

document.addEventListener("DOMContentLoaded", () => {

    // ---- FAQ Accordion ----
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-q');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all
            faqItems.forEach(fi => {
                fi.classList.remove('open');
                fi.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
            });
            // Open clicked if was closed
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Scroll reveal with IntersectionObserver (no layout shifts) ----
    const style = document.createElement('style');
    style.textContent = `
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  `;
    document.head.appendChild(style);

    const revealEls = document.querySelectorAll(
        '.benefit-item, .pillar-card, .module-card, .bonus-card, .audience-card, .faq-item, .stat-item'
    );
    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));

});
