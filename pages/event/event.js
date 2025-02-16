document.getElementById("createEventBtn").addEventListener("click", function() {
    document.getElementById("eventFormSection").classList.toggle("hidden");
});

document.getElementById("eventForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const eventName = document.getElementById("eventName").value;
    const eventDateTime = document.getElementById("eventDateTime").value;
    const venue = document.getElementById("venue").value;
    const associatedClub = document.getElementById("associatedClub").value;
    const description = document.getElementById("description").value;
    
    const eventList = document.getElementById("eventList");
    const eventCard = document.createElement("div");
    eventCard.classList.add("eventCard");
    eventCard.innerHTML = `
        <h3>${eventName}</h3>
        <p><strong>Date & Time:</strong> ${eventDateTime}</p>
        <p><strong>Venue:</strong> ${venue}</p>
        ${associatedClub ? `<p><strong>Club:</strong> ${associatedClub}</p>` : ""}
        <p>${description}</p>
    `;
    
    eventList.appendChild(eventCard);
    document.getElementById("eventForm").reset();
    document.getElementById("eventFormSection").classList.add("hidden");
});