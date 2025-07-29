// Reports List Page JavaScript

// Sample data for reports (in real implementation, this would come from a database)
const reportsData = [
    {
        id: 1,
        title: "Project Kick-off Meeting Report",
        date: "2024-03-15",
        description: "Comprehensive report on the initial project kick-off meeting held in Ho Chi Minh City. The meeting brought together all partner institutions to discuss project objectives, timelines, and collaborative strategies.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "reports"
    },
    {
        id: 2,
        title: "Stakeholder Workshop Summary",
        date: "2024-04-22",
        description: "Detailed summary of the first stakeholder workshop conducted in Bangkok. The workshop focused on identifying key challenges in urban water security and exploring potential Nature-based Solutions.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "reports"
    },
    {
        id: 3,
        title: "Field Study Progress Report",
        date: "2024-05-10",
        description: "Progress report on field studies conducted in selected Southeast Asian cities. This report covers initial findings from site visits and preliminary data collection activities.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "reports"
    },
    {
        id: 4,
        title: "Pre-project Planning Report",
        date: "2024-02-20",
        description: "Initial planning and preparation report for the APN project. This document outlines the project framework, methodology, and expected outcomes.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "reports"
    },
    {
        id: 5,
        title: "Project Proposal and Framework",
        date: "2024-01-15",
        description: "Original project proposal and theoretical framework document. This report establishes the foundation for the Nature-based Solutions research.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "reports"
    },
    {
        id: 6,
        title: "Literature Review Report",
        date: "2024-01-10",
        description: "Comprehensive literature review examining existing research on Nature-based Solutions in urban water management across Southeast Asia.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "reports"
    },
    {
        id: 7,
        title: "Methodology Development Report",
        date: "2024-01-05",
        description: "Detailed methodology development report outlining the research approach and data collection methods for the project.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "reports"
    },
    {
        id: 8,
        title: "Initial Assessment Report",
        date: "2024-01-01",
        description: "Initial assessment report of selected study cities and their current water security challenges and opportunities.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "reports"
    },
    {
        id: 9,
        title: "Partner Institution Analysis",
        date: "2023-12-15",
        description: "Analysis of partner institutions and their capabilities for implementing Nature-based Solutions in their respective regions.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "reports"
    },
    {
        id: 10,
        title: "Project Framework Development",
        date: "2023-12-01",
        description: "Development of the overall project framework and collaboration structure between partner institutions.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "reports"
    }
];

// Global variables
let currentPage = 1;
let itemsPerPage = 9;
let filteredData = [...reportsData];
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
    document.title = "Reports - APN Project CRRP2024-01MY-Le";
    
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
    
    filteredData = reportsData.filter(item => 
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
    const grid = document.getElementById('reports-grid');
    grid.innerHTML = '';
    
    if (articles.length === 0) {
        grid.innerHTML = '<div class="no-results">No reports found matching your search criteria.</div>';
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
                <a href="${article.link}" class="read-more">Read Full Report</a>
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
        'No reports found' : 
        `Showing ${startItem}-${endItem} of ${totalItems} reports`;
    
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