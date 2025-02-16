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
    postsContainer.innerHTML = profileData.posts.map((post, index) => `
        <div class="col">
            <div class="card shadow-sm post-card">
                <img src="${post.image}" class="card-img-top" alt="Post image">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <span class="post-interaction like-btn" data-post-id="${index}"> 
                        <i class="far fa-heart"></i> <span class="likes-count">${post.likes}</span>
                    </span>
                    <span class="post-interaction comment-btn" data-post-id="${index}">  
                        <i class="far fa-comment"></i> <span class="comments-count">${post.comments}</span>
                    </span>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners for likes
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const postId = btn.dataset.postId;
            const likesCount = btn.querySelector('.likes-count');
            const heartIcon = btn.querySelector('i');
            
            if (heartIcon.classList.contains('far')) {
                heartIcon.classList.replace('far', 'fas');
                profileData.posts[postId].likes++;
                btn.classList.add('liked');
            } else {
                heartIcon.classList.replace('fas', 'far');
                profileData.posts[postId].likes--;
                btn.classList.remove('liked');
            }
            
            likesCount.textContent = profileData.posts[postId].likes;
        });
    });

    // Add event listeners for comments
    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const postId = btn.dataset.postId;
            // You can add comment functionality here
            // For example, open a comment modal
            alert('Comment feature coming soon!');
        });
    });

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