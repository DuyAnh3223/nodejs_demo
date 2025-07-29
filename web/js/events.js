// Events Page JavaScript

// Sample events data (in real implementation, this would come from a database)
const eventsData = [
    {
        id: 1,
        title: "Project Kick-off Meeting",
        date: "2024-03-18",
        endDate: "2024-03-18",
        location: "Ho Chi Minh City, Vietnam",
        type: "meeting",
        status: "past",
        description: "Official launch of the APN project with hybrid meeting bringing together project partners from Vietnam, Cambodia, and Thailand. Participants discussed project objectives, research activities, and collaboration plans.",
        image: "images/placeholder_event.jpg",
        link: "#",
        country: "vietnam"
    },
    {
        id: 2,
        title: "Stakeholder Workshop",
        date: "2024-04-22",
        endDate: "2024-04-22",
        location: "Bangkok, Thailand",
        type: "workshop",
        status: "past",
        description: "First stakeholder workshop focused on identifying key challenges in urban water security and exploring potential Nature-based Solutions. Featured presentations and group discussions.",
        image: "images/placeholder_event.jpg",
        link: "#",
        country: "thailand"
    },
    {
        id: 3,
        title: "Field Study Site Visits",
        date: "2024-05-10",
        endDate: "2024-05-15",
        location: "Multiple Cities, Southeast Asia",
        type: "field-visit",
        status: "past",
        description: "Comprehensive field study visits to selected Southeast Asian cities to assess existing Nature-based Solutions and urban water challenges. Included site assessments and data collection.",
        image: "images/placeholder_event.jpg",
        link: "#",
        country: "multiple"
    },
    {
        id: 4,
        title: "Technical Training Workshop",
        date: "2024-06-15",
        endDate: "2024-06-17",
        location: "Phnom Penh, Cambodia",
        type: "training",
        status: "past",
        description: "Technical training workshop on Nature-based Solutions assessment methodologies and data collection techniques for project partners and local stakeholders.",
        image: "images/placeholder_event.jpg",
        link: "#",
        country: "cambodia"
    },
    {
        id: 5,
        title: "Regional Conference on Urban Water Security",
        date: "2024-07-20",
        endDate: "2024-07-22",
        location: "Hanoi, Vietnam",
        type: "conference",
        status: "past",
        description: "Regional conference bringing together researchers, policymakers, and practitioners to discuss urban water security challenges and Nature-based Solutions implementation.",
        image: "images/placeholder_event.jpg",
        link: "#",
        country: "vietnam"
    },
    {
        id: 6,
        title: "Policy Dialogue Workshop",
        date: "2024-08-15",
        endDate: "2024-08-16",
        location: "Online",
        type: "workshop",
        status: "past",
        description: "Virtual policy dialogue workshop focusing on policy recommendations for enhancing urban water security through Nature-based Solutions in Southeast Asian cities.",
        image: "images/placeholder_event.jpg",
        link: "#",
        country: "online"
    },
    {
        id: 7,
        title: "Community Engagement Sessions",
        date: "2024-09-10",
        endDate: "2024-09-12",
        location: "Bangkok, Thailand",
        type: "workshop",
        status: "past",
        description: "Community engagement sessions to gather local perspectives on urban water challenges and potential Nature-based Solutions implementation strategies.",
        image: "images/placeholder_event.jpg",
        link: "#",
        country: "thailand"
    },
    {
        id: 8,
        title: "Research Methodology Workshop",
        date: "2024-10-05",
        endDate: "2024-10-07",
        location: "Phnom Penh, Cambodia",
        type: "training",
        status: "past",
        description: "Workshop on research methodology development and data analysis techniques for Nature-based Solutions assessment in urban contexts.",
        image: "images/placeholder_event.jpg",
        link: "#",
        country: "cambodia"
    },
    {
        id: 9,
        title: "Regional Workshop on NbS Implementation",
        date: "2024-12-15",
        endDate: "2024-12-17",
        location: "Bangkok, Thailand",
        type: "workshop",
        status: "upcoming",
        description: "Regional workshop bringing together stakeholders from Southeast Asian cities to discuss Nature-based Solutions implementation strategies and share best practices.",
        image: "images/placeholder_event.jpg",
        link: "#",
        country: "thailand"
    },
    {
        id: 10,
        title: "Final Project Symposium",
        date: "2025-03-15",
        endDate: "2025-03-17",
        location: "Ho Chi Minh City, Vietnam",
        type: "conference",
        status: "upcoming",
        description: "Final project symposium to present research findings, policy recommendations, and showcase successful Nature-based Solutions implementations across Southeast Asian cities.",
        image: "images/placeholder_event.jpg",
        link: "#",
        country: "vietnam"
    }
];

// Global variables
let filteredEvents = [...eventsData];
let currentSort = 'date-desc';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    renderEvents();
});

// Initialize page
function initializePage() {
    // Sort events by date (newest first) initially
    sortEvents('date-desc');
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    searchInput.addEventListener('input', function() {
        filterEvents();
    });
    
    searchBtn.addEventListener('click', function() {
        filterEvents();
    });
    
    // Filter functionality
    const eventTypeFilter = document.getElementById('event-type-filter');
    const locationFilter = document.getElementById('location-filter');
    const statusFilter = document.getElementById('status-filter');
    
    eventTypeFilter.addEventListener('change', filterEvents);
    locationFilter.addEventListener('change', filterEvents);
    statusFilter.addEventListener('change', filterEvents);
}

// Filter events based on search and filter inputs
function filterEvents() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const eventType = document.getElementById('event-type-filter').value;
    const location = document.getElementById('location-filter').value;
    const status = document.getElementById('status-filter').value;
    
    filteredEvents = eventsData.filter(event => {
        // Search filter
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) ||
                             event.description.toLowerCase().includes(searchTerm) ||
                             event.location.toLowerCase().includes(searchTerm);
        
        // Type filter
        const matchesType = !eventType || event.type === eventType;
        
        // Location filter
        const matchesLocation = !location || event.country === location;
        
        // Status filter
        const matchesStatus = !status || event.status === status;
        
        return matchesSearch && matchesType && matchesLocation && matchesStatus;
    });
    
    renderEvents();
}

// Sort events
function sortEvents(sortType) {
    switch(sortType) {
        case 'date-desc':
            filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'title-asc':
            filteredEvents.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            filteredEvents.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }
}

// Render events
function renderEvents() {
    const eventsGrid = document.getElementById('events-grid');
    eventsGrid.innerHTML = '';
    
    if (filteredEvents.length === 0) {
        eventsGrid.innerHTML = '<div class="no-results">No events found matching your criteria.</div>';
        return;
    }
    
    // Separate upcoming and past events
    const upcomingEvents = filteredEvents.filter(event => event.status === 'upcoming');
    const pastEvents = filteredEvents.filter(event => event.status === 'past');
    
    // Render upcoming events first
    upcomingEvents.forEach(event => {
        const eventHTML = createEventHTML(event);
        eventsGrid.insertAdjacentHTML('beforeend', eventHTML);
    });
    
    // Render past events
    pastEvents.forEach(event => {
        const eventHTML = createEventHTML(event);
        eventsGrid.insertAdjacentHTML('beforeend', eventHTML);
    });
}

// Create event HTML
function createEventHTML(event) {
    const isUpcoming = event.status === 'upcoming';
    const upcomingClass = isUpcoming ? 'upcoming' : '';
    const upcomingBadge = isUpcoming ? '<div class="upcoming-badge">Upcoming</div>' : '';
    
    return `
        <article class="event-item ${upcomingClass}">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
                ${upcomingBadge}
            </div>
            <div class="event-content">
                <h4>${event.title}</h4>
                <div class="event-meta">
                    <span class="event-date">${formatEventDate(event.date, event.endDate)}</span>
                    <span class="event-location">${event.location}</span>
                    <span class="event-type">${formatEventType(event.type)}</span>
                </div>
                <p>${event.description}</p>
                <a href="${event.link}" class="read-more">Learn More</a>
            </div>
        </article>
    `;
}

// Format event date
function formatEventDate(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (startDate === endDate) {
        return start.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } else {
        const startFormatted = start.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        const endFormatted = end.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        return `${startFormatted} - ${endFormatted}`;
    }
}

// Format event type
function formatEventType(type) {
    const typeMap = {
        'workshop': 'Workshop',
        'conference': 'Conference',
        'training': 'Training',
        'field-visit': 'Field Visit',
        'meeting': 'Meeting'
    };
    return typeMap[type] || type;
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