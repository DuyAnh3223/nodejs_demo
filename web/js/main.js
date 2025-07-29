// Main JavaScript for APN Project Website

document.addEventListener('DOMContentLoaded', function() {
    
    // View More functionality for Events page
    initializeViewMore();
    
    // Initialize other features
    initializeAnimations();
    initializeNavigation();
});

// View More functionality
function initializeViewMore() {
    const viewMoreButtons = document.querySelectorAll('.view-more-btn');
    
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const hiddenArticles = document.getElementById(`${category}-hidden`);
            const buttonText = this.textContent;
            
            if (hiddenArticles) {
                if (hiddenArticles.classList.contains('show')) {
                    // Hide articles
                    hiddenArticles.classList.remove('show');
                    this.textContent = buttonText.replace('Show Less', 'View More ' + category.charAt(0).toUpperCase() + category.slice(1));
                    this.classList.remove('expanded');
                } else {
                    // Show articles
                    hiddenArticles.classList.add('show');
                    this.textContent = buttonText.replace('View More', 'Show Less');
                    this.classList.add('expanded');
                    
                    // Add loading animation
                    this.classList.add('loading');
                    setTimeout(() => {
                        this.classList.remove('loading');
                    }, 500);
                }
            }
        });
    });
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
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
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.content-block, .article-item, .team-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize navigation
function initializeNavigation() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
}

// WordPress Integration Helper Functions
// These functions can be used when converting to WordPress

// Function to create article HTML dynamically
function createArticleHTML(articleData) {
    const { title, date, description, image, link, category } = articleData;
    
    return `
        <article class="article-item" data-date="${date}" data-category="${category}">
            <div class="article-image">
                <img src="${image}" alt="${title}">
            </div>
            <div class="article-content">
                <h4>${title}</h4>
                <p class="article-date">${formatDate(date)}</p>
                <p>${description}</p>
                <a href="${link}" class="read-more">${getReadMoreText(category)}</a>
            </div>
        </article>
    `;
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to get appropriate read more text based on category
function getReadMoreText(category) {
    const textMap = {
        'reports': 'Read Full Report',
        'publications': 'View Publication',
        'pictures': 'View Gallery'
    };
    return textMap[category] || 'Read More';
}

// Function to sort articles by date (newest first)
function sortArticlesByDate(articles) {
    return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to limit articles to 3 per category
function limitArticles(articles, limit = 3) {
    return articles.slice(0, limit);
}

// Function to populate articles dynamically
function populateArticles(category, articles) {
    const grid = document.getElementById(`${category}-grid`);
    const hiddenContainer = document.getElementById(`${category}-hidden`);
    
    if (!grid) return;
    
    // Clear existing content
    grid.innerHTML = '';
    if (hiddenContainer) {
        hiddenContainer.innerHTML = '';
    }
    
    // Sort articles by date
    const sortedArticles = sortArticlesByDate(articles);
    
    // Split into visible and hidden
    const visibleArticles = limitArticles(sortedArticles, 3);
    const hiddenArticles = sortedArticles.slice(3);
    
    // Add visible articles
    visibleArticles.forEach(article => {
        grid.insertAdjacentHTML('beforeend', createArticleHTML(article));
    });
    
    // Add hidden articles if any
    if (hiddenArticles.length > 0 && hiddenContainer) {
        hiddenArticles.forEach(article => {
            hiddenContainer.insertAdjacentHTML('beforeend', createArticleHTML(article));
        });
    }
}

// Export functions for WordPress integration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createArticleHTML,
        formatDate,
        getReadMoreText,
        sortArticlesByDate,
        limitArticles,
        populateArticles
    };
} 