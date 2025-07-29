// Images List Page JavaScript

// Sample data for images/galleries (in real implementation, this would come from a database)
const imagesData = [
    {
        id: 1,
        title: "Project Kick-off Meeting Gallery",
        date: "2024-03-15",
        description: "Photo gallery from the project kick-off meeting showing team members, presentations, and collaborative activities. Includes group photos and key moments from the event.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 2,
        title: "Field Study Site Visits",
        date: "2024-04-22",
        description: "Collection of photographs from field study visits to various Southeast Asian cities. Images showcase existing Nature-based Solutions, urban water challenges, and research activities.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 3,
        title: "Stakeholder Workshop Highlights",
        date: "2024-05-30",
        description: "Visual highlights from the stakeholder workshop including presentations, group discussions, and networking sessions. Features key stakeholders and their contributions to the project.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 4,
        title: "Project Planning Sessions",
        date: "2024-02-10",
        description: "Photos from initial project planning sessions and team meetings. Shows the collaborative process of developing the research framework.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 5,
        title: "Team Introduction and Setup",
        date: "2024-01-20",
        description: "Introduction photos of the project team members and initial setup activities. Includes team building and project initiation moments.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 6,
        title: "Site Assessment Documentation",
        date: "2024-01-15",
        description: "Comprehensive photo documentation of site assessments conducted across Southeast Asian cities. Includes before and after images of potential NbS implementation sites.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 7,
        title: "Community Engagement Activities",
        date: "2024-01-10",
        description: "Visual documentation of community engagement activities and stakeholder consultations. Shows local community participation in project planning.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 8,
        title: "Technical Training Sessions",
        date: "2024-01-05",
        description: "Photos from technical training sessions and capacity building workshops. Documents knowledge transfer activities between partner institutions.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 9,
        title: "Equipment and Technology Setup",
        date: "2024-01-01",
        description: "Documentation of equipment setup and technology integration for monitoring and data collection activities.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 10,
        title: "Partner Institution Visits",
        date: "2023-12-20",
        description: "Photo collection from visits to partner institutions across Southeast Asia. Shows collaborative activities and institutional partnerships.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 11,
        title: "Research Methodology Development",
        date: "2023-12-15",
        description: "Visual documentation of research methodology development process. Includes workshops, discussions, and framework development activities.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 12,
        title: "Project Framework Development",
        date: "2023-12-01",
        description: "Photos from project framework development sessions and strategic planning meetings. Documents the evolution of project structure and objectives.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 13,
        title: "Initial Literature Review Process",
        date: "2023-11-15",
        description: "Documentation of literature review process and research compilation activities. Shows the systematic approach to gathering existing knowledge.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    },
    {
        id: 14,
        title: "Project Proposal Development",
        date: "2023-11-01",
        description: "Visual record of project proposal development process. Includes collaborative writing sessions and proposal refinement activities.",
        image: "images/placeholder_event.jpg",
        link: "#",
        category: "images"
    }
];

// Global variables
let currentPage = 1;
let itemsPerPage = 9;
let filteredData = [...imagesData];
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
    document.title = "Images & Media - APN Project CRRP2024-01MY-Le";
    
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
    
    filteredData = imagesData.filter(item => 
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
    const grid = document.getElementById('images-grid');
    grid.innerHTML = '';
    
    if (articles.length === 0) {
        grid.innerHTML = '<div class="no-results">No images found matching your search criteria.</div>';
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
                <a href="${article.link}" class="read-more">View Gallery</a>
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
        'No images found' : 
        `Showing ${startItem}-${endItem} of ${totalItems} images`;
    
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