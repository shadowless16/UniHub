const dummyPosts = [
    {
        id: 1,
        author: "Eniola Goodness",
        avatar: "https://i.pravatar.cc/150?img=16",
        content: "Just finished my final exam for the semester! Time to celebrate! 🎉",
        timestamp: "2023-05-15T14:30:00Z",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        likes: 42,
        comments: 8
    },
    {
        id: 2,
        author: "Makinde Dayo",
        avatar: "https://i.pravatar.cc/150?img=2",
        content: "Looking for study partners for the upcoming Chemistry midterm. Anyone interested?",
        timestamp: "2023-05-15T10:15:00Z",
        likes: 15,
        comments: 23
    },
    {
        id: 3,
        author: "Charlie Brown",
        avatar: "https://i.pravatar.cc/150?img=3",
        content: "Just joined the university's debate club. Excited for the upcoming competitions!",
        timestamp: "2023-05-14T18:45:00Z",
        imageUrl: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        likes: 38,
        comments: 5
    },
    {
        id: 4,
        author: "Diana Ross",
        avatar: "https://i.pravatar.cc/150?img=4",
        content: "Reminder: Student Council meeting tomorrow at 3 PM in the Main Hall.",
        timestamp: "2023-05-14T09:00:00Z",
        likes: 27,
        comments: 12
    },
    {
        id: 5,
        author: "Ethan Hunt",
        avatar: "https://i.pravatar.cc/150?img=5",
        content: "Check out this amazing sunset from my dorm room!",
        timestamp: "2023-05-13T20:30:00Z",
        imageUrl: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
        likes: 89,
        comments: 15
    }
];

// Dummy data for stories
const dummyStories = [
    { id: 1, author: "Makinde Dayo", avatar: "https://i.pravatar.cc/150?img=7" },
    { id: 2, author: "Stainless", avatar: "https://i.pravatar.cc/150?img=16" },
    { id: 3, author: "Ese", avatar: "https://i.pravatar.cc/150?img=46" },
    { id: 4, author: "Tosin Sg", avatar: "https://i.pravatar.cc/150?img=51" },
    { id: 5, author: "Keshi Jakes", avatar: "https://i.pravatar.cc/150?img=49" }
];

// Dummy data for suggested accounts
const dummySuggestedAccounts = [
    { id: 1, name: "Jane Doe", username: "@jane_doe", avatar: "https://i.pravatar.cc/150?img=6" },
    { id: 2, name: "John Smith", username: "@john_smith", avatar: "https://i.pravatar.cc/150?img=7" },
    { id: 3, name: "Emma Wilson", username: "@emma_wilson", avatar: "https://i.pravatar.cc/150?img=8" }
];

// Function to format the timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}d ago`;
    } else if (hours > 0) {
        return `${hours}h ago`;
    } else if (minutes > 0) {
        return `${minutes}m ago`;
    } else {
        return 'Just now';
    }
}

// Function to create a post element
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const postContent = `
        <div class="post-header">
            <img src="${post.avatar}" alt="${post.author}" class="post-avatar">
            <span class="post-author">${post.author}</span>
            <span class="post-timestamp">${formatTimestamp(post.timestamp)}</span>
        </div>
        <p class="post-content">${post.content}</p>
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image" class="post-image">` : ''}
        <div class="post-actions">
            <div class="post-action" data-action="like">
                <i class="far fa-heart"></i>
                <span>${post.likes}</span>
            </div>
            <div class="post-action" data-action="comment">
                <i class="far fa-comment"></i>
                <span>${post.comments}</span>
            </div>
            <div class="post-action" data-action="share">
                <i class="far fa-share-square"></i>
            </div>
        </div>
    `;

    postElement.innerHTML = postContent;
    return postElement;
}

// Function to create a story element
function createStoryElement(story) {
    const storyElement = document.createElement('div');
    storyElement.classList.add('story');

    const storyContent = `
        <div class="story-avatar">
            <img src="${story.avatar}" alt="${story.author}">
        </div>
        <span>${story.author}</span>
    `;

    storyElement.innerHTML = storyContent;
    return storyElement;
}

// Function to create a suggested account element
function createSuggestedAccountElement(account) {
    const accountElement = document.createElement('div');
    accountElement.classList.add('suggested-account');

    const accountContent = `
        <img src="${account.avatar}" alt="${account.name}">
        <div class="suggested-account-info">
            <div class="suggested-account-name">${account.name}</div>
            <div class="suggested-account-username">${account.username}</div>
        </div>
        <button class="follow-btn">Follow</button>
    `;

    accountElement.innerHTML = accountContent;
    return accountElement;
}

// Function to simulate fetching posts from an API
function fetchPosts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyPosts);
        }, 1000);
    });
}

// Function to render posts
async function renderPosts() {
    const feedContainer = document.getElementById('feed-container');
    feedContainer.innerHTML = '<p>Loading posts...</p>';

    try {
        const posts = await fetchPosts();
        feedContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = createPostElement(post);
            feedContainer.appendChild(postElement);
        });
    } catch (error) {
        feedContainer.innerHTML = '<p>Error loading posts. Please try again later.</p>';
    }
}

// Function to render stories
function renderStories() {
    const storiesContainer = document.querySelector('.stories-container');
    dummyStories.forEach(story => {
        const storyElement = createStoryElement(story);
        storiesContainer.appendChild(storyElement);
    });
}

// Function to render suggested accounts
function renderSuggestedAccounts() {
    const suggestedAccountsContainer = document.querySelector('.suggested-accounts');
    dummySuggestedAccounts.forEach(account => {
        const accountElement = createSuggestedAccountElement(account);
        suggestedAccountsContainer.appendChild(accountElement);
    });
}

// Call render functions when the page loads
window.addEventListener('load', () => {
    renderPosts();
    renderStories();
    renderSuggestedAccounts();
});

// Add event listeners for post actions
document.addEventListener('click', function(e) {
    const action = e.target.closest('.post-action');
    if (action) {
        const icon = action.querySelector('i');
        const count = action.querySelector('span');

        switch (action.dataset.action) {
            case 'like':
                icon.classList.toggle('fas');
                icon.classList.toggle('far');
                action.classList.toggle('liked');
                count.textContent = parseInt(count.textContent) + (action.classList.contains('liked') ? 1 : -1);
                break;
            case 'comment':
                console.log('Comment clicked');
                break;
            case 'share':
                console.log('Share clicked');
                break;
        }
    }
});

// Add event listener for the post button
document.querySelector('.create-post button').addEventListener('click', function() {
    const input = document.querySelector('.create-post input');
    const content = input.value.trim();
    if (content) {
        const newPost = {
            id: dummyPosts.length + 1,
            author: 'You',
            avatar: 'https://i.pravatar.cc/150?img=7',
            content: content,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: 0
        };
        dummyPosts.unshift(newPost);
        renderPosts();
        input.value = '';
    }
});