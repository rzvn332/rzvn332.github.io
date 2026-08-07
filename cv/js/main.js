// ==================== THEME ====================

const savedTheme = localStorage.getItem('theme') || 'dark';

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

// ==================== INTERNATIONALIZATION (i18n) ====================

let currentLang = localStorage.getItem('lang') || 'en';
let translations = {};

function t(key) {
    return translations[currentLang]?.[key] || translations['en']?.[key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.getAttribute('data-i18n'));
    });

    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.textContent = currentLang.toUpperCase();
    }

    document.querySelectorAll('.lang-dropdown button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    document.documentElement.lang = currentLang;
}

// ==================== MAIN APP ====================

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    setTheme(savedTheme);

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;
            setTheme(btn.dataset.theme);
        });
    });

    // Language switcher
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');

    if (langToggle && langDropdown) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        langDropdown.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                currentLang = btn.dataset.lang;
                localStorage.setItem('lang', currentLang);
                langDropdown.classList.remove('active');
                applyTranslations();
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.lang-wrapper')) {
                langDropdown.classList.remove('active');
            }
        });
    }

    // Scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });

    // Apply translations (data loaded via <script> before main.js)
    if (window.translationsData) {
        translations = window.translationsData;
        applyTranslations();
    }
});
