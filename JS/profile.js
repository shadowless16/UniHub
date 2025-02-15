document.addEventListener('DOMContentLoaded', () => {
    // Profile Header
    document.querySelector('.profile-header img').src = profileData.user.avatar;
    document.querySelector('.profile-header h2').textContent = profileData.user.name;
    document.querySelector('.department').textContent = profileData.user.department;
    document.querySelector('.level').textContent = profileData.user.level;
    document.querySelector('.bio').textContent = profileData.user.bio;
    document.querySelector('.member-since').textContent = profileData.user.memberSince;
    document.querySelectorAll('.followers-count').forEach(el => el.textContent = profileData.user.followers);
    document.querySelectorAll('.following-count').forEach(el => el.textContent = profileData.user.following);

    // Tabs Count
    document.querySelector('#posts-tab span').textContent = profileData.user.postsCount;
    document.querySelector('#friends-tab span').textContent = profileData.user.friendsCount;

    // Update the post rendering section
    const postsContainer = document.querySelector('#posts .row');
    postsContainer.innerHTML = profileData.posts.map(post => `
        <div class="col">
            <div class="card shadow-sm">
                <img src="${post.image}" class="card-img-top">
                <div class="card-body d-flex justify-content-between">
                    <span class="text-secondary"> 
                        <i class="fas fa-heart"></i> ${post.likes}
                    </span>
                    <span class="text-secondary">  
                        <i class="fas fa-comment"></i> ${post.comments}
                    </span>
                </div>
            </div>
        </div>
    `).join('');

    // Render Friends
    const friendsContainer = document.querySelector('#friends .row');
    friendsContainer.innerHTML = profileData.friends.map(friend => `
        <div class="col">
            <div class="card shadow-sm text-center p-3">
                <img src="${friend.avatar}" 
                     class="rounded-circle mx-auto" 
                     width="80" height="80">
                <h5 class="mt-3 mb-1">${friend.name}</h5>
                <small class="text-muted">${friend.mutual} mutual friends</small>
            </div>
        </div>
    `).join('');
});