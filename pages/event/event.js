document.addEventListener("DOMContentLoaded", function () {
    const createEventBtn = document.getElementById("createEventBtn");
    const eventForm = document.getElementById("eventForm");
    const upcomingEventsContainer = document.getElementById("upcomingEvents");

    createEventBtn.addEventListener("click", function () {
        // Get values from the form
        const eventName = document.getElementById("eventName").value.trim();
        const eventDateTime = document.getElementById("eventDateTime").value.trim();
        const eventVenue = document.getElementById("eventVenue").value.trim();
        const eventClub = document.getElementById("eventClub").value.trim();
        const eventDescription = document.getElementById("eventDescription").value.trim();
        const eventBannerInput = document.getElementById("eventBanner");

        if (!eventName || !eventDateTime || !eventVenue || !eventDescription) {
            alert("Please fill in all required fields.");
            return;
        }

        // Handle image upload
        let eventBannerUrl = "https://via.placeholder.com/400x200"; // Default image
        if (eventBannerInput.files.length > 0) {
            const file = eventBannerInput.files[0];
            eventBannerUrl = URL.createObjectURL(file); // Temporary URL for preview
        }

        // Create event card dynamically
        const eventCard = document.createElement("div");
        eventCard.classList.add("col-md-4");

        eventCard.innerHTML = `
            <div class="card event-card">
                <img src="${eventBannerUrl}" class="card-img-top event-banner" alt="Event Banner">
                <div class="card-body">
                    <h5 class="card-title">${eventName}</h5>
                    <p class="card-text"><strong>Date:</strong> ${eventDateTime}</p>
                    <p class="card-text"><strong>Venue:</strong> ${eventVenue}</p>
                    <p class="card-text"><strong>Club:</strong> ${eventClub || "N/A"}</p>
                    <p class="card-text">${eventDescription}</p>
                    <button class="btn btn-danger btn-sm delete-event">Delete</button>
                </div>
            </div>
        `;

        // Append new event to the UI
        upcomingEventsContainer.appendChild(eventCard);

        // Close the modal
        document.querySelector("#createEventModal .btn-close").click();

        // Clear the form
        eventForm.reset();

        // Delete event functionality
        eventCard.querySelector(".delete-event").addEventListener("click", function () {
            eventCard.remove();
        });
    });
});
