document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.add('hidden'));

            button.classList.add('active');
            document.getElementById(`${tabName}-content`).classList.remove('hidden');
        });
    });

    // Dummy data with actual post images
    const posts = [
        { 
            id: 1, 
            imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1470&q=80',
            likes: 42, 
            comments: 7 
        },
        { 
            id: 2, 
            imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1470&q=80',
            likes: 38, 
            comments: 5 
        },
        { 
            id: 3, 
            imageUrl: 'https://images.unsplash.com/photo-1532634896-26909d0d4b6a?auto=format&fit=crop&w=1470&q=80',
            likes: 56, 
            comments: 9 
        },
        { 
            id: 4, 
            imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80',
            likes: 27, 
            comments: 3 
        },
        { 
            id: 5, 
            imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1470&q=80',
            likes: 84, 
            comments: 12 
        },
        { 
            id: 6, 
            imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1470&q=80',
            likes: 31, 
            comments: 4 
        }
    ];

    const friends = [
        { id: 1, name: 'Chidi Okonkwo', avatar: 'https://i.pravatar.cc/150?img=33', mutualFriends: 15 },
        { id: 2, name: 'Amina Bello', avatar: 'https://i.pravatar.cc/150?img=34', mutualFriends: 8 },
        { id: 3, name: 'Emeka Nwosu', avatar: 'https://i.pravatar.cc/150?img=35', mutualFriends: 23 },
        { id: 4, name: 'Fatima Usman', avatar: 'https://i.pravatar.cc/150?img=36', mutualFriends: 5 },
        { id: 5, name: 'Oluwadamilola Adebayo', avatar: 'https://i.pravatar.cc/150?img=37', mutualFriends: 12 },
        { id: 6, name: 'Yusuf Ibrahim', avatar: 'https://i.pravatar.cc/150?img=38', mutualFriends: 19 }
    ];

    const achievements = [
        { id: 1, title: 'Dean\'s List', description: 'Achieved academic excellence', icon: 'fa-award' },
        { id: 2, title: 'Hackathon Champion', description: 'Won the annual coding competition', icon: 'fa-trophy' },
        { id: 3, title: 'Perfect Attendance', description: 'Never missed a class this semester', icon: 'fa-calendar-check' },
        { id: 4, title: 'Research Publication', description: 'Co-authored a research paper', icon: 'fa-book' },
        { id: 5, title: 'Community Leader', description: '100 hours of volunteer work', icon: 'fa-hands-helping' },
        { id: 6, title: 'Tech Innovator', description: 'Developed a campus mobile app', icon: 'fa-mobile-alt' }
    ];

    // Render posts
    const postGrid = document.querySelector('.post-grid');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-item');
        postElement.innerHTML = `
            <img src="${post.imageUrl}" alt="Post ${post.id}">
            <div class="post-overlay">
                <span><i class="fas fa-heart"></i> ${post.likes}</span>
                <span><i class="fas fa-comment"></i> ${post.comments}</span>
            </div>
        `;
        postGrid.appendChild(postElement);
    });

    // Render friends
    const friendsGrid = document.querySelector('.friends-grid');
    friends.forEach(friend => {
        const friendElement = document.createElement('div');
        friendElement.classList.add('friend-item');
        friendElement.innerHTML = `
            <img src="${friend.avatar}" alt="${friend.name}">
            <h3>${friend.name}</h3>
            <p>${friend.mutualFriends} mutual friends</p>
        `;
        friendsGrid.appendChild(friendElement);
    });

    // Render achievements
    const achievementsGrid = document.querySelector('.achievements-grid');
    achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.classList.add('achievement-item');
        achievementElement.innerHTML = `
            <i class="fas ${achievement.icon}"></i>
            <h3>${achievement.title}</h3>
            <p>${achievement.description}</p>
        `;
        achievementsGrid.appendChild(achievementElement);
    });
});