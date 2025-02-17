document.addEventListener('DOMContentLoaded', function() {
    // Render Featured Clubs
    const featuredClubsContainer = document.getElementById('featuredClubs');
    clubsData.featured.forEach(club => {
        featuredClubsContainer.innerHTML += `
            <div class="col-md-6">
                <div class="card h-100 shadow-sm">
                    <img src="${club.image}" class="card-img-top" alt="${club.name}">
                    <div class="card-body">
                        <h5 class="card-title">${club.name}</h5>
                        <p class="card-text">${club.description}</p>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge bg-primary">${club.category}</span>
                            <small>${club.members} members</small>
                        </div>
                        <button class="btn btn-primary w-100 join-btn" data-club-id="${club.id}">
                            Join Club
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    // Render Club Grid
    const clubGridContainer = document.getElementById('clubGrid');
    clubsData.allClubs.forEach(club => {
        clubGridContainer.innerHTML += `
            <div class="col">
                <div class="card h-100 shadow-sm">
                    <img src="${club.image}" class="card-img-top" alt="${club.name}">
                    <div class="card-body">
                        <h5 class="card-title">${club.name}</h5>
                        <p class="card-text">${club.description}</p>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge bg-primary">${club.category}</span>
                            <small>${club.members} members</small>
                        </div>
                        <button class="btn btn-primary w-100 join-btn" data-club-id="${club.id}">
                            Join Club
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    // Add join button click handler
    document.querySelectorAll('.join-btn').forEach(button => {
        button.addEventListener('click', function() {
            const clubId = this.getAttribute('data-club-id');
            const isJoined = this.classList.contains('joined');
            
            if (isJoined) {
                this.classList.remove('btn-success');
                this.classList.add('btn-primary');
                this.textContent = 'Join Club';
                this.classList.remove('joined');
            } else {
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                this.textContent = 'Joined ✓';
                this.classList.add('joined');
            }
            
            // You can add API call here to update the backend
            console.log(`Club ${clubId} ${isJoined ? 'left' : 'joined'}`);
        });
    });

    // Handle Category Filters
    const categoryButtons = document.querySelectorAll('.category-filters button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.textContent;
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter clubs
            const filteredClubs = category === 'All Clubs' 
                ? clubsData.allClubs 
                : clubsData.allClubs.filter(club => club.category === category);
            
            // Re-render club grid
            clubGridContainer.innerHTML = '';
            filteredClubs.forEach(club => {
                clubGridContainer.innerHTML += `
                    <div class="col">
                        <div class="card h-100 shadow-sm">
                            <img src="${club.image}" class="card-img-top" alt="${club.name}">
                            <div class="card-body">
                                <h5 class="card-title">${club.name}</h5>
                                <p class="card-text">${club.description}</p>
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <span class="badge bg-primary">${club.category}</span>
                                    <small>${club.members} members</small>
                                </div>
                                <button class="btn btn-primary w-100 join-btn" data-club-id="${club.id}">
                                    Join Club
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Re-attach join button click handler
            document.querySelectorAll('.join-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const clubId = this.getAttribute('data-club-id');
                    const isJoined = this.classList.contains('joined');
                    
                    if (isJoined) {
                        this.classList.remove('btn-success');
                        this.classList.add('btn-primary');
                        this.textContent = 'Join Club';
                        this.classList.remove('joined');
                    } else {
                        this.classList.remove('btn-primary');
                        this.classList.add('btn-success');
                        this.textContent = 'Joined ✓';
                        this.classList.add('joined');
                    }
                    
                    // You can add API call here to update the backend
                    console.log(`Club ${clubId} ${isJoined ? 'left' : 'joined'}`);
                });
            });
        });
    });
});