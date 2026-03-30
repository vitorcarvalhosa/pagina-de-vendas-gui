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

    // ---- Facebook Pixel: InitiateCheckout on CTA clicks ----
    document.querySelectorAll('a[href*="pay.hotmart.com"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof fbq === 'function') {
                fbq('track', 'InitiateCheckout', {
                    content_name: 'Método C.E.O.',
                    value: 297.00,
                    currency: 'BRL'
                });
            }
        });
    });

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
            // Remove thumbnail e adiciona iframe
            while (ytFacade.firstChild) ytFacade.removeChild(ytFacade.firstChild);
            ytFacade.appendChild(iframe);
        }, { once: true });
    }

});

// ---- GTM e Facebook Pixel — carregados após window load (não bloqueiam LCP) ----
window.addEventListener('load', function() {
    // Google Tag Manager
    (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5DTH882N');

    // Facebook Pixel
    (function(f,b,e,v,n,t,s){
        if(f.fbq)return;
        n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];
        t=b.createElement(e);t.async=!0;
        t.src=v;
        s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s);
    })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1203099945066371');
    fbq('track', 'PageView');
    fbq('track', 'ViewContent', {
        content_name: 'Método C.E.O. - Landing Page',
        content_category: 'Sales Page',
        value: 297.00,
        currency: 'BRL'
    });
});
