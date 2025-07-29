// Main JavaScript for the website

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileNavigation();
    initializeAnimations();
    initializeNavigation();
    initializeViewMore();
});

// Initialize mobile navigation
function initializeMobileNavigation() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    if (!mobileToggle || !navMenu) return;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    body.appendChild(overlay);
    
    // Toggle menu
    mobileToggle.addEventListener('click', function() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            // Close menu
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        } else {
            // Open menu
            navMenu.classList.add('active');
            mobileToggle.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
        }
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Initialize animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.key-figure-item, .collaborator, .content-block, .event-item, .news-article');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize navigation
function initializeNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// View More functionality for Outcomes page 
function initializeViewMore() {
    const viewMoreBtns = document.querySelectorAll('.view-more-btn');

    viewMoreBtns.forEach(btn => {
        // Only handle buttons without href (for toggle functionality)
        if (!btn.hasAttribute('href') || btn.getAttribute('href') === '#') {
            btn.addEventListener('click', function(e) {
                e.preventDefault();

                const container = this.closest('.content-block');
                const hiddenArticles = container.querySelector('.hidden-articles');

                if (hiddenArticles) {
                    // Toggle visibility using style.display
                    if (hiddenArticles.style.display === 'none' || hiddenArticles.style.display === '') {
                        hiddenArticles.style.display = 'block';
                        this.textContent = 'Show Less';
                    } else {
                        hiddenArticles.style.display = 'none';
                        this.textContent = 'View More';
                    }
                }
            });

            // Ensure initial state is correct
            const container = btn.closest('.content-block');
            const hiddenArticles = container ? container.querySelector('.hidden-articles') : null;
            if (hiddenArticles) {
                hiddenArticles.style.display = 'none';
                btn.textContent = 'View More';
            }
        }
        // If button has href, let it work as a normal link (no JavaScript interference)
    });
}


// WordPress Integration Helper Functions
// These functions would be useful when migrating to WordPress

// Create article HTML for dynamic content
function createArticleHTML(article) {
    return `
        <article class="article-item">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="article-content">
                <h4>${article.title}</h4>
                <div class="article-date">${formatDate(article.date)}</div>
                <p>${article.excerpt}</p>
                <a href="${article.link}" class="read-more">${getReadMoreText(article.type)}</a>
            </div>
        </article>
    `;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Get appropriate "Read More" text based on content type
function getReadMoreText(type) {
    const textMap = {
        'report': 'Read Report',
        'publication': 'Read Publication',
        'image': 'View Gallery',
        'default': 'Read More'
    };
    return textMap[type] || textMap.default;
}

// Sort articles by date
function sortArticlesByDate(articles, ascending = false) {
    return articles.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return ascending ? dateA - dateB : dateB - dateA;
    });
}

// Limit articles to specified number
function limitArticles(articles, limit) {
    return articles.slice(0, limit);
}

// Populate articles in a container
function populateArticles(container, articles, limit = null) {
    const limitedArticles = limit ? limitArticles(articles, limit) : articles;
    
    container.innerHTML = limitedArticles.map(article => 
        createArticleHTML(article)
    ).join('');
}

// Initialize view more if on events page
if (document.querySelector('.view-more-btn')) {
    initializeViewMore();
} 

