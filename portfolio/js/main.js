// ==================== PROJECT DATA ====================
// Loaded from data/projects.json via <script> tag.
// Edit data/projects.json to add/remove projects.

// ==================== SKILLS DATA ====================

const skillsData = [
    { "id": 1, "name": "Figma", "icon": "img/skills/figma.svg" },
    { "id": 2, "name": "Photoshop", "icon": "img/skills/adobe-photoshop.svg" },
    { "id": 3, "name": "Illustrator", "icon": "img/skills/adobeillustrator.svg" },
    { "id": 4, "name": "Responsive Design", "icon": "img/skills/responsive-design-symbol.svg" },
    { "id": 5, "name": "HTML5", "icon": "img/skills/html-124.svg" },
    { "id": 6, "name": "CSS3", "icon": "img/skills/css3-02.svg" },
    { "id": 7, "name": "JavaScript", "icon": "img/skills/javascript.svg" },
    { "id": 8, "name": "Notion", "icon": "img/skills/notion.svg" }
];

// ==================== INTERNATIONALIZATION (i18n) ====================

let currentLang = localStorage.getItem('lang') || 'en';
let translations = {};

function loadTranslations() {
    if (window.translationsData) {
        translations = window.translationsData;
        applyTranslations();
    }
}

function t(key) {
    return translations[currentLang]?.[key] || translations['en']?.[key] || key;
}

function applyTranslations() {
    // Translate all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });

    // Update lang toggle button text
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.textContent = currentLang.toUpperCase();
    }

    // Update dropdown active state
    document.querySelectorAll('.lang-dropdown button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    // Update html lang attribute
    document.documentElement.lang = currentLang;

    // Re-render dynamic content
    if (typeof renderProjects === 'function') {
        renderProjects();
    }
    if (typeof renderSkills === 'function') {
        renderSkills();
    }
}

// ==================== MAIN APP ====================

document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle functionality
    const menuBtn = document.getElementById('menuBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    let menuOpen = false;

    function toggleMenu() {
        menuOpen = !menuOpen;
        if (menuOpen) {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (menuBtn && menuOverlay) {
        menuBtn.addEventListener('click', toggleMenu);

        document.querySelectorAll('.menu-link a').forEach(link => {
            link.addEventListener('click', () => {
                if (menuOpen) toggleMenu();
            });
        });
    }

    // Hero animation
    const heroTitle = document.querySelector('.hero-title');
    const heroWords = heroTitle ? heroTitle.querySelectorAll('span') : [];
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtonWrapper = document.querySelector('.hero-button-wrapper');
    const heroSection = document.querySelector('.hero');

    if (heroTitle && heroSection) {
        setTimeout(() => {
            heroTitle.classList.add('visible');
            heroSection.classList.add('visible');

            heroWords.forEach((word, index) => {
                word.style.transitionDelay = `${index * 0.2}s`;
            });
        }, 300);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== PROJECT MODAL ====================

    let currentProject = null;
    let currentImageIndex = 0;

    const modal = document.getElementById('projectModal');
    const modalOverlay = modal ? modal.querySelector('.project-modal-overlay') : null;
    const modalClose = document.getElementById('modalClose');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const carouselStack = document.getElementById('carouselStack');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    const modalThumbs = document.getElementById('modalThumbs');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    // ==================== IMAGE VIEWER ====================

    const viewer = document.getElementById('imageViewer');
    const viewerImg = document.getElementById('viewerImg');
    const viewerCounter = document.getElementById('viewerCounter');
    const viewerClose = document.getElementById('viewerClose');
    let viewerImages = [];
    let viewerIndex = 0;

    function openImageViewer(images, index) {
        viewerImages = images;
        viewerIndex = index;
        updateViewerImage();
        viewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeImageViewer() {
        viewer.classList.remove('active');
        if (!modal.classList.contains('active')) {
            document.body.style.overflow = 'auto';
        }
    }

    function updateViewerImage() {
        viewerImg.src = viewerImages[viewerIndex];
        viewerCounter.textContent = `${viewerIndex + 1} / ${viewerImages.length}`;
    }

    function navigateViewer(direction) {
        viewerIndex = (viewerIndex + direction + viewerImages.length) % viewerImages.length;
        updateViewerImage();
    }

    if (viewerClose) {
        viewerClose.addEventListener('click', closeImageViewer);
    }

    if (viewer) {
        viewer.querySelector('.image-viewer-overlay').addEventListener('click', closeImageViewer);
    }

    // ==================== PROJECT MODAL (continued) ====================

    function openProjectModal(project) {
        currentProject = project;
        currentImageIndex = 0;

        modalCategory.textContent = project.category.toUpperCase();
        modalTitle.textContent = getProjectField(project, 'title');
        modalDescription.textContent = getProjectField(project, 'description');

        // Tags
        modalTags.innerHTML = '';
        if (project.technologies && project.technologies.length > 0) {
            project.technologies.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'project-modal-tag';
                tag.textContent = tech;
                modalTags.appendChild(tag);
            });
        }

        // Build stacked slides
        carouselStack.innerHTML = '';
        const title = getProjectField(project, 'title');
        if (project.images && project.images.length > 0) {
            project.images.forEach((src, index) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.dataset.status = 'hidden';
                slide.innerHTML = `<img src="${src}" alt="${title} - ${index + 1}">`;
                slide.addEventListener('click', () => {
                    openImageViewer(project.images, index);
                });
                carouselStack.appendChild(slide);
            });
        }

        renderThumbs();
        updateSlideStates();

        // Setup scroll observer for mobile after DOM update
        requestAnimationFrame(() => {
            setupScrollObserver();
            if (isMobile() && carouselStack.querySelectorAll('.carousel-slide').length > 0) {
                scrollToSlide(0);
            }
        });

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (scrollObserver) scrollObserver.disconnect();
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentProject = null;
        currentImageIndex = 0;
        carouselStack.innerHTML = '';
    }

    function updateSlideStates() {
        const slides = carouselStack.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.dataset.status = index === currentImageIndex ? 'active' : 'hidden';
        });
    }

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function scrollToSlide(index) {
        const slides = carouselStack.querySelectorAll('.carousel-slide');
        if (slides[index]) {
            const slide = slides[index];
            const scrollLeft = slide.offsetLeft - (carouselStack.clientWidth - slide.offsetWidth) / 2;
            carouselStack.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }

    let scrollObserver = null;

    function setupScrollObserver() {
        if (scrollObserver) scrollObserver.disconnect();
        if (!isMobile()) return;

        const slides = carouselStack.querySelectorAll('.carousel-slide');
        if (slides.length === 0) return;

        scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const index = Array.from(slides).indexOf(entry.target);
                    if (index !== -1 && index !== currentImageIndex) {
                        currentImageIndex = index;
                        updateThumbs();
                    }
                }
            });
        }, {
            root: carouselStack,
            threshold: 0.6
        });

        slides.forEach(slide => scrollObserver.observe(slide));
    }

    function renderThumbs() {
        modalThumbs.innerHTML = '';
        if (!currentProject || !currentProject.images) return;

        currentProject.images.forEach((src, index) => {
            const thumb = document.createElement('button');
            thumb.className = 'carousel-thumb' + (index === 0 ? ' active' : '');
            thumb.innerHTML = `<img src="${src}" alt="Thumb ${index + 1}">`;
            thumb.addEventListener('click', () => {
                currentImageIndex = index;
                if (isMobile()) {
                    scrollToSlide(index);
                } else {
                    updateSlideStates();
                }
                updateThumbs();
            });
            modalThumbs.appendChild(thumb);
        });
    }

    function updateThumbs() {
        const thumbs = modalThumbs.querySelectorAll('.carousel-thumb');
        thumbs.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
    }

    function navigateCarousel(direction) {
        if (!currentProject || !currentProject.images) return;

        const total = currentProject.images.length;
        currentImageIndex = (currentImageIndex + direction + total) % total;
        updateSlideStates();
        updateThumbs();
    }

    // Modal event listeners
    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProjectModal);
    }

    if (modalPrev) {
        modalPrev.addEventListener('click', () => navigateCarousel(-1));
    }

    if (modalNext) {
        modalNext.addEventListener('click', () => navigateCarousel(1));
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Image viewer has priority
        if (viewer && viewer.classList.contains('active')) {
            if (e.key === 'Escape') closeImageViewer();
            if (e.key === 'ArrowLeft') navigateViewer(-1);
            if (e.key === 'ArrowRight') navigateViewer(1);
            return;
        }

        if (!modal || !modal.classList.contains('active')) return;

        if (e.key === 'Escape') closeProjectModal();
        if (e.key === 'ArrowLeft') navigateCarousel(-1);
        if (e.key === 'ArrowRight') navigateCarousel(1);
    });

    // Re-setup observer on resize (device rotation)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (modal && modal.classList.contains('active')) {
                setupScrollObserver();
            }
        }, 250);
    });

    // ==================== RENDER PROJECTS ====================

    let activeCategory = 'all';

    function renderProjects(category = activeCategory) {
        activeCategory = category;
        const projectsContainer = document.getElementById('projectsContainer');
        const showMoreBtn = document.getElementById('showMoreBtn');
        const showLessBtn = document.getElementById('showLessBtn');
        if (!projectsContainer) return;

        projectsContainer.innerHTML = '';

        const filteredProjects = category === 'all'
            ? projectsData
            : projectsData.filter(project => project.category === category);

        const initialProjects = filteredProjects.slice(0, 4);
        const remainingProjects = filteredProjects.slice(4);

        initialProjects.forEach((project, index) => {
            createProjectCard(projectsContainer, project, index);
        });

        if (remainingProjects.length > 0) {
            showMoreBtn.style.display = 'block';
            showLessBtn.style.display = 'none';

            showMoreBtn.onclick = () => {
                remainingProjects.forEach((project, index) => {
                    createProjectCard(projectsContainer, project, index + initialProjects.length);
                });
                showMoreBtn.style.display = 'none';
                showLessBtn.style.display = 'block';
            };

            showLessBtn.onclick = () => {
                projectsContainer.innerHTML = '';
                initialProjects.forEach((project, index) => {
                    createProjectCard(projectsContainer, project, index);
                });
                showMoreBtn.style.display = 'block';
                showLessBtn.style.display = 'none';
            };
        } else {
            showMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'none';
        }
    }

    // Helper: get translated project field
    function getProjectField(project, field) {
        if (currentLang === 'en') return project[field];
        const translatedField = project[field + '_' + currentLang];
        return translatedField || project[field];
    }

    function createProjectCard(container, project, index) {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card project-card-link bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300';
        projectCard.style.cursor = 'pointer';

        const thumbnail = project.images && project.images.length > 0 ? project.images[0] : '';
        const title = getProjectField(project, 'title');
        const description = getProjectField(project, 'description');

        projectCard.innerHTML = `
            <div class="project-image-container">
                <img src="${thumbnail}" alt="${title}" class="project-image">
                <div class="project-image-overlay"></div>
                <div class="project-link-icon">
                    <i class="fas fa-expand"></i>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${title}</h3>
                <p class="text-white/80 mb-4">${description}</p>
                <span class="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-xs font-medium">
                    ${project.category.toUpperCase()}
                </span>
            </div>
        `;

        projectCard.addEventListener('click', () => openProjectModal(project));

        projectCard.style.setProperty('--animate-delay', `${index * 0.15}s`);
        container.appendChild(projectCard);

        requestAnimationFrame(() => {
            setTimeout(() => {
                projectCard.classList.add('visible');
            }, 10);
        });
    }

    // Render skills
    function renderSkills() {
        const skillsContainer = document.getElementById('skillsContainer');
        if (!skillsContainer) return;

        skillsContainer.innerHTML = '';

        skillsData.forEach((skill) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.innerHTML = `
                 <div class="skill-icon">
                     <img src="${skill.icon}" alt="${skill.name} icon">
                 </div>
                     <h4 class="font-bold">${skill.name}</h4>
                `;

            skillsContainer.appendChild(skillCard);
        });
    }

    // Initialize category filters
    function initCategoryFilters() {
        const categoryFilters = document.querySelectorAll('.category-filter');
        if (categoryFilters.length === 0) return;

        categoryFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                categoryFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                const category = filter.dataset.category;
                renderProjects(category);
            });
        });
    }

    // Intersection Observer for scroll animations
    function initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });
    }

    // Preload project images
    function preloadProjectImages() {
        projectsData.forEach(project => {
            if (project.images && project.images.length > 0) {
                project.images.forEach(src => {
                    const img = new Image();
                    img.src = src;
                });
            }
        });
    }

    // Initialize everything
    function init() {
        loadTranslations();
        initLanguageSwitcher();
        renderProjects();
        renderSkills();
        initCategoryFilters();
        initIntersectionObserver();
        preloadProjectImages();
    }

    // Expose renderers so applyTranslations() can re-render on language change
    window.renderProjects = renderProjects;
    window.renderSkills = renderSkills;

    // Language switcher dropdown
    function initLanguageSwitcher() {
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

            // Close dropdown on outside click
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.lang-wrapper')) {
                    langDropdown.classList.remove('active');
                }
            });
        }
    }

    init();
});