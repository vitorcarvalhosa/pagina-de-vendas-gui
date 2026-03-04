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

    // ---- Scroll reveal with IntersectionObserver ----
    // Styles are defined in CSS (style.css) — no runtime injection needed
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

    // ---- YouTube Facade — load iframe only on click ----
    const ytFacade = document.querySelector('.yt-facade');
    if (ytFacade) {
        const videoId = ytFacade.dataset.videoId;
        ytFacade.addEventListener('click', () => {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            iframe.title = 'Método CEO — Guilherme Zampoli';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;';
            ytFacade.innerHTML = '';
            ytFacade.appendChild(iframe);
        }, { once: true });
    }

});
