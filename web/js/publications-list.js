// Publications List Page JavaScript

// Sample data for publications (in real implementation, this would come from a database)
const publicationsData = [
    {
        id: 1,
        title: "Nature-based Solutions in Urban Water Management",
        date: "2024-06-15",
        description: "Research paper published in the International Journal of Environmental Studies. This publication presents the theoretical framework for evaluating Nature-based Solutions in Southeast Asian urban contexts.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "publications"
    },
    {
        id: 2,
        title: "Policy Recommendations for Urban Water Security",
        date: "2024-07-20",
        description: "Policy brief outlining key recommendations for enhancing urban water security through Nature-based Solutions. The document targets policymakers and urban planners in the region.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "publications"
    },
    {
        id: 3,
        title: "Case Studies: NbS Implementation in Southeast Asia",
        date: "2024-08-10",
        description: "Comprehensive case study document featuring successful Nature-based Solutions implementations across different Southeast Asian cities, with detailed analysis and lessons learned.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "publications"
    },
    {
        id: 4,
        title: "Literature Review: Urban Water Security Challenges",
        date: "2024-05-30",
        description: "Comprehensive literature review examining urban water security challenges across Southeast Asian cities and existing mitigation strategies.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "publications"
    },
    {
        id: 5,
        title: "Methodology Framework for NbS Assessment",
        date: "2024-04-15",
        description: "Detailed methodology framework for assessing Nature-based Solutions effectiveness in urban water management contexts.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "publications"
    },
    {
        id: 6,
        title: "Urban Water Security Index Development",
        date: "2024-03-20",
        description: "Development of a comprehensive urban water security index for Southeast Asian cities, incorporating multiple indicators and assessment criteria.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "publications"
    },
    {
        id: 7,
        title: "Stakeholder Engagement in NbS Projects",
        date: "2024-02-15",
        description: "Analysis of stakeholder engagement strategies and best practices for implementing Nature-based Solutions in urban environments.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "publications"
    },
    {
        id: 8,
        title: "Economic Analysis of NbS Implementation",
        date: "2024-01-30",
        description: "Economic analysis of Nature-based Solutions implementation costs and benefits in Southeast Asian urban contexts.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "publications"
    },
    {
        id: 9,
        title: "Climate Change Adaptation through NbS",
        date: "2024-01-15",
        description: "Research on how Nature-based Solutions can contribute to climate change adaptation in urban water management systems.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "publications"
    },
    {
        id: 10,
        title: "Community Participation in Water Security",
        date: "2024-01-01",
        description: "Study on community participation and engagement in urban water security initiatives and Nature-based Solutions projects.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "publications"
    },
    {
        id: 11,
        title: "Technology Integration in NbS Projects",
        date: "2023-12-15",
        description: "Analysis of technology integration opportunities in Nature-based Solutions projects for enhanced monitoring and effectiveness.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "publications"
    },
    {
        id: 12,
        title: "Capacity Building for NbS Implementation",
        date: "2023-12-01",
        description: "Framework for capacity building and knowledge transfer in Nature-based Solutions implementation across Southeast Asian institutions.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "publications"
    }
];

// Global variables
let currentPage = 1;
let itemsPerPage = 9;
let filteredData = [...publicationsData];
let currentSort = 'date-desc';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    renderPage();
});

// Initialize page
function initializePage() {
    // Set page title and description
    document.title = "Publications - APN Project CRRP2024-01MY-Le";
    
    // Sort data by date (newest first) initially
    sortData('date-desc');
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    searchInput.addEventListener('input', function() {
        filterData();
    });
    
    searchBtn.addEventListener('click', function() {
        filterData();
    });
    
    // Sort functionality
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        sortData(currentSort);
        renderPage();
    });
    
    // Pagination buttons
    document.getElementById('prev-btn').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderPage();
        }
    });
    
    document.getElementById('next-btn').addEventListener('click', function() {
        const maxPages = Math.ceil(filteredData.length / itemsPerPage);
        if (currentPage < maxPages) {
            currentPage++;
            renderPage();
        }
    });
}

// Filter data based on search input
function filterData() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    filteredData = publicationsData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1; // Reset to first page when filtering
    renderPage();
}

// Sort data
function sortData(sortType) {
    switch(sortType) {
        case 'date-desc':
            filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'title-asc':
            filteredData.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            filteredData.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }
}

// Render the current page
function renderPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = filteredData.slice(startIndex, endIndex);
    
    // Render articles
    renderArticles(currentPageData);
    
    // Update pagination
    updatePagination();
    
    // Update pagination info
    updatePaginationInfo();
}

// Render articles
function renderArticles(articles) {
    const grid = document.getElementById('publications-grid');
    grid.innerHTML = '';
    
    if (articles.length === 0) {
        grid.innerHTML = '<div class="no-results">No publications found matching your search criteria.</div>';
        return;
    }
    
    articles.forEach(article => {
        const articleHTML = createArticleHTML(article);
        grid.insertAdjacentHTML('beforeend', articleHTML);
    });
}

// Create article HTML
function createArticleHTML(article) {
    return `
        <article class="article-item" data-date="${article.date}">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="article-content">
                <h4>${article.title}</h4>
                <p class="article-date">${formatDate(article.date)}</p>
                <p>${article.description}</p>
                <a href="${article.link}" class="read-more">View Publication</a>
            </div>
        </article>
    `;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Update pagination
function updatePagination() {
    const maxPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationNumbers = document.getElementById('pagination-numbers');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === maxPages;
    
    // Generate page numbers
    paginationNumbers.innerHTML = '';
    
    if (maxPages <= 1) {
        return;
    }
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(maxPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Add first page and dots if needed
    if (startPage > 1) {
        paginationNumbers.innerHTML += '<span class="page-number" data-page="1">1</span>';
        if (startPage > 2) {
            paginationNumbers.innerHTML += '<span class="page-number dots">...</span>';
        }
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        paginationNumbers.innerHTML += `<span class="page-number ${activeClass}" data-page="${i}">${i}</span>`;
    }
    
    // Add last page and dots if needed
    if (endPage < maxPages) {
        if (endPage < maxPages - 1) {
            paginationNumbers.innerHTML += '<span class="page-number dots">...</span>';
        }
        paginationNumbers.innerHTML += `<span class="page-number" data-page="${maxPages}">${maxPages}</span>`;
    }
    
    // Add click listeners to page numbers
    const pageNumbers = paginationNumbers.querySelectorAll('.page-number:not(.dots)');
    pageNumbers.forEach(pageNum => {
        pageNum.addEventListener('click', function() {
            const page = parseInt(this.getAttribute('data-page'));
            if (page !== currentPage) {
                currentPage = page;
                renderPage();
            }
        });
    });
}

// Update pagination info
function updatePaginationInfo() {
    const totalItems = filteredData.length;
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    const infoText = totalItems === 0 ? 
        'No publications found' : 
        `Showing ${startItem}-${endItem} of ${totalItems} publications`;
    
    document.getElementById('pagination-info').textContent = infoText;
}

// Add CSS for no results
const style = document.createElement('style');
style.textContent = `
    .no-results {
        text-align: center;
        padding: 3rem;
        color: #666;
        font-size: 1.1rem;
        grid-column: 1 / -1;
    }
`;
document.head.appendChild(style); 