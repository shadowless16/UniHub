document.addEventListener('DOMContentLoaded', function() {
    // Initialize data with joined state
    let joinedClubId = null;

    clubData.allClubs.forEach(club => club.joined = false);

    // Add search input to header
    const headerSearchDiv = document.querySelector('.d-none.d-lg-flex');
    headerSearchDiv.innerHTML = `
        <div class="input-group rounded-pill bg-light w-100">
            <input type="text" class="form-control border-0 bg-transparent" 
                placeholder="Search clubs...">
            <button class="btn btn-link text-secondary">
                <i class="fas fa-search"></i>
            </button>
        </div>
    `;

    // Render initial content
    renderClubCards('clubGrid', clubData.allClubs);
    renderFeaturedClubs();

    // Search functionality
    document.querySelector('.input-group input').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredClubs = clubData.allClubs.filter(club => 
            club.name.toLowerCase().includes(searchTerm) ||
            (club.category && club.category.toLowerCase().includes(searchTerm))
        );
        renderClubCards('clubGrid', filteredClubs);
    });

    // Category filter events
    document.querySelectorAll('.category-filters .btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.category-filters .btn').forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            const category = this.textContent.trim();
            const filteredClubs = category === 'All Clubs' 
                ? clubData.allClubs 
                : clubData.allClubs.filter(club => club.category === category);
            renderClubCards('clubGrid', filteredClubs);
        });
    });

    // Join club functionality
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('join-btn')) {
            const clubId = parseInt(event.target.dataset.clubId);
            const button = event.target;

            if (joinedClubId === null) {
                // Joining a club
                joinedClubId = clubId;
                button.textContent = 'Joined';
                button.classList.add('joined');
                
                // Update member count in data
                const club = clubData.allClubs.find(c => c.id === clubId);
                if (club) {
                    club.memberCount++;
                    // Update all instances of this club's member count
                    updateMemberCount(clubId, club.memberCount);
                }
            } else if (joinedClubId === clubId) {
                // Leaving the club
                joinedClubId = null;
                button.textContent = 'Join';
                button.classList.remove('joined');
                
                // Update member count in data
                const club = clubData.allClubs.find(c => c.id === clubId);
                if (club) {
                    club.memberCount--;
                    // Update all instances of this club's member count
                    updateMemberCount(clubId, club.memberCount);
                }
            } else {
                showAlreadyJoinedPopup();
            }
        }
    });
});

// Add function to update member count display
function updateMemberCount(clubId, newCount) {
    document.querySelectorAll(`[data-club-id="${clubId}"]`).forEach(button => {
        const memberCountSpan = button.closest('.card-body').querySelector('.text-secondary');
        memberCountSpan.innerHTML = `
            <i class="fas fa-user-friends me-2"></i> ${newCount} members
        `;
    });
}

// Search functionality
const searchInput = document.querySelector('.input-group input');
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredClubs = clubData.allClubs.filter(club => 
        club.name.toLowerCase().includes(searchTerm) ||
        (club.category && club.category.toLowerCase().includes(searchTerm))
    );
    renderClubCards('clubGrid', filteredClubs);
    
    // Also update featured clubs visibility
    const featuredContainer = document.querySelector('.row.g-4.mb-5');
    const featuredClubs = featuredContainer.querySelectorAll('.col-md-3');
    featuredClubs.forEach(clubEl => {
        const clubName = clubEl.querySelector('.card-title').textContent.toLowerCase();
        clubEl.style.display = clubName.includes(searchTerm) ? 'block' : 'none';
    });
});


// Add this function to show the popup
function showAlreadyJoinedPopup() {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'position-fixed top-50 start-50 translate-middle bg-white p-4 rounded-4 shadow-lg';
    popup.style.zIndex = '1050';
    popup.innerHTML = `
        <h5 class="mb-3">Already in a Club</h5>
        <p class="text-muted mb-4">You can only be a member of one club at a time. Please leave your current club before joining another.</p>
        <button class="btn btn-secondary w-100" onclick="this.parentElement.remove()">OK</button>
    `;
    document.body.appendChild(popup);

    // Remove popup after 3 seconds
    setTimeout(() => popup.remove(), 3000);
}

function renderClubCards(containerId, clubs) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    clubs.forEach(club => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'col-md-4';
        cardContainer.innerHTML = `
            <div class="card h-100 rounded-4 shadow-sm">
                <img src="${club.image}" class="card-img-top rounded-4" alt="${club.name}">
                <div class="card-body p-4">
                    <h5 class="card-title">${club.name}</h5>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="text-secondary">
                            <i class="fas fa-user-friends me-2"></i> ${club.memberCount || 0} members
                        </span>
                        <button class="btn btn-follow px-4 join-btn" data-club-id="${club.id}">
                            ${club.joined ? 'Joined' : 'Join'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(cardContainer);
    });
}

function renderFeaturedClubs() {
    const container = document.querySelector('.row.g-4.mb-5');
    container.innerHTML = '';
    
    clubData.featuredClubs.forEach(club => {
        const featuredClub = clubData.allClubs.find(c => c.id === club.id);
        if (featuredClub) {
            const col = document.createElement('div');
            col.className = 'col-md-3';
            col.innerHTML = `
                <div class="card h-100 rounded-4 shadow-sm">
                    <img src="${featuredClub.image}" class="card-img-top rounded-4" alt="${featuredClub.name}">
                    <div class="card-body p-4 text-center">
                        <h5 class="card-title">${featuredClub.name}</h5>
                        <div class="d-flex justify-content-between mt-3">
                            <span class="text-secondary">
                                <i class="fas fa-user-friends me-2"></i> ${featuredClub.memberCount} members
                            </span>
                            <button class="btn btn-follow px-4 join-btn" data-club-id="${featuredClub.id}">
                                ${featuredClub.joined ? 'Joined' : 'Join'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(col);
        }
    });
}