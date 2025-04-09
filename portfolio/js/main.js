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

    // Fetch projects and skills data
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error loading data:', error);
            return [];
        }
    }

    // Render projects
    async function renderProjects(category = 'all') {
        const projectsContainer = document.getElementById('projectsContainer');
        if (!projectsContainer) return;

        const projects = await fetchData('data/projects.json');
        projectsContainer.innerHTML = '';

        const filteredProjects = category === 'all'
            ? projects
            : projects.filter(project => project.category === category);

        filteredProjects.forEach((project, index) => {
            const projectCard = document.createElement('a');
            projectCard.href = project.link;
            projectCard.target = "_blank";
            projectCard.rel = "noopener noreferrer";
            projectCard.className = 'project-card project-card-link bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300';
            projectCard.innerHTML = `
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                    <div class="project-image-overlay"></div>
                    <div class="project-link-icon">
                        <i class="fas fa-external-link-alt"></i>
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                    <p class="text-white/80 mb-4">${project.description}</p>
                    <span class="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-xs font-medium">
                        ${project.category.toUpperCase()}
                    </span>
                </div>
            `;

            projectCard.style.setProperty('--animate-delay', `${index * 0.15}s`);

            projectsContainer.appendChild(projectCard);

            requestAnimationFrame(() => {
                setTimeout(() => {
                    projectCard.classList.add('visible');
                }, 10);
            });
        });
    }

    // Render skills
    async function renderSkills() {
        const skillsContainer = document.getElementById('skillsContainer');
        if (!skillsContainer) return;

        const skills = await fetchData('data/skills.json');
        skillsContainer.innerHTML = '';

        skills.forEach((skill) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.innerHTML = `
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
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
    async function preloadProjectImages() {
        const projects = await fetchData('data/projects.json');
        projects.forEach(project => {
            const img = new Image();
            img.src = project.image;
        });
    }

    // Initialize everything
    async function init() {
        await renderProjects();
        await renderSkills();
        initCategoryFilters();
        initIntersectionObserver();
        preloadProjectImages();
    }

    init();
});
