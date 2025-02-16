// Sample events data
let events = [
    {
        id: 1,
        name: "Tech Innovation Summit",
        date: "2024-03-15T14:00",
        venue: "Innovation Hub",
        club: "Tech Club",
        description: "Join us for a day of cutting-edge technology discussions and demonstrations."
    },
    {
        id: 2,
        name: "Annual Art Exhibition",
        date: "2024-03-20T10:00",
        venue: "Art Gallery",
        club: "Art Society",
        description: "Showcase of student artwork from various mediums and styles."
    },
    {
        id: 3,
        name: "Sports Tournament",
        date: "2024-02-01T09:00",
        venue: "Sports Complex",
        club: "Sports Club",
        description: "Inter-university sports competition featuring multiple disciplines."
    },
    {
        id: 4,
        name: "Science Fair 2024",
        date: "2024-01-15T11:00",
        venue: "Main Auditorium",
        club: "Science Club",
        description: "Annual science fair featuring student projects and research presentations."
    }
];

// DOM Elements
const createEventBtn = document.getElementById('createEventBtn');
const eventForm = document.getElementById('eventForm');
const upcomingEventsContainer = document.getElementById('upcomingEvents');
const pastEventsContainer = document.getElementById('pastEvents');

// Show/Hide event form
createEventBtn.addEventListener('click', () => {
    eventForm.classList.toggle('d-none');
});

// Handle form submission
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newEvent = {
        id: Date.now(),
        name: document.getElementById('eventName').value,
        date: document.getElementById('eventDate').value,
        venue: document.getElementById('venue').value,
        club: document.getElementById('club').value,
        description: document.getElementById('description').value
    };

    events.push(newEvent);
    eventForm.reset();
    eventForm.classList.add('d-none');
    displayEvents();
});

// Display events
function displayEvents() {
    const now = new Date();
    const upcomingEvents = events.filter(event => new Date(event.date) > now);
    const pastEvents = events.filter(event => new Date(event.date) <= now);

    upcomingEventsContainer.innerHTML = renderEvents(upcomingEvents, false);
    pastEventsContainer.innerHTML = renderEvents(pastEvents, true);
}

function renderEvents(events, isPast) {
    return events.map(event => {
        const eventDate = new Date(event.date);
        return `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 ${isPast ? 'past-event' : ''}">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">
                            <i class="far fa-calendar me-2"></i>${eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br>
                            <i class="far fa-clock me-2"></i>${eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}<br>
                            <i class="fas fa-map-marker-alt me-2"></i>${event.venue}<br>
                            <i class="fas fa-users me-2"></i>${event.club}
                        </p>
                        <p class="card-text">${event.description}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary w-100" ${isPast ? 'disabled' : ''}>
                            ${isPast ? 'Event Ended' : 'Join Event'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Initial display
displayEvents();