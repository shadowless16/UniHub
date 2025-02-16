// Sample data for events
let events = [
    {
        id: 1,
        name: "Tech Workshop 2024",
        dateTime: "2024-03-15T14:00",
        venue: "Main Auditorium",
        club: "Tech Club",
        description: "Learn about the latest web technologies",
        isPast: false
    },
    {
        id: 2,
        name: "Sports Tournament",
        dateTime: "2024-02-10T09:00",
        venue: "University Stadium",
        club: "Sports Club",
        description: "Annual inter-college sports competition",
        isPast: true
    },
    // Add more sample events as needed
];

// DOM Elements
const modal = document.getElementById("eventFormModal");
const createEventBtn = document.getElementById("createEventBtn");
const closeBtn = document.querySelector(".close");
const eventForm = document.getElementById("eventForm");
const upcomingEventsGrid = document.getElementById("upcomingEvents");
const pastEventsGrid = document.getElementById("pastEvents");
const tabBtns = document.querySelectorAll(".tab-btn");

// Initialize date picker
flatpickr("#eventDateTime", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    minDate: "today"
});

// Event Listeners
createEventBtn.addEventListener("click", () => modal.style.display = "block");
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        document.querySelectorAll(".events-section").forEach(section => {
            section.classList.remove("active");
        });
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});

// Form submission
eventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const newEvent = {
        id: events.length + 1,
        name: document.getElementById("eventName").value,
        dateTime: document.getElementById("eventDateTime").value,
        venue: document.getElementById("venue").value,
        club: document.getElementById("club").value,
        description: document.getElementById("description").value,
        isPast: false
    };
    
    events.push(newEvent);
    renderEvents();
    modal.style.display = "none";
    eventForm.reset();
});

// Render events
function renderEvents() {
    const currentDate = new Date();
    
    // Filter events
    const upcomingEvents = events.filter(event => new Date(event.dateTime) > currentDate);
    const pastEvents = events.filter(event => new Date(event.dateTime) <= currentDate);
    
    // Render upcoming events
    upcomingEventsGrid.innerHTML = upcomingEvents.map(event => createEventCard(event)).join("");
    
    // Render past events
    pastEventsGrid.innerHTML = pastEvents.map(event => createEventCard(event)).join("");
}

// Create event card HTML
function createEventCard(event) {
    const eventDate = new Date(event.dateTime);
    return `
        <div class="event-card">
            <h3>${event.name}</h3>
            <div class="event-info">
                <p>📅 ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}</p>
                <p>📍 ${event.venue}</p>
                ${event.club ? `<p>🎭 ${event.club}</p>` : ''}
            </div>
            <div class="event-actions">
                ${!event.isPast ? 
                    `<button class="join-btn">Join Event</button>` : 
                    `<button class="join-btn" disabled>Event Ended</button>`
                }
                <button class="more-info-btn">More Info</button>
            </div>
        </div>
    `;
}

// Initial render
renderEvents();