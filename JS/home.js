let selectedMedia = null;
let selectedMediaType = null;
// --- Dummy Data ---
const dummyPosts = [
    {
        id: 1,
        author: "Eniola Goodness",
        avatar: "https://i.pravatar.cc/150?img=16",
        content: "Just finished my final exam for the semester! Time to celebrate! 🎉",
        timestamp: "2023-05-15T14:30:00Z",
        media: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        mediaType: "image",
        likes: 42,
        comments: [],
        commentCount: 0,
        isLiked: false,
        showComments: false
    },
    {
        id: 2,
        author: "Makinde Dayo",
        avatar: "https://i.pravatar.cc/150?img=2",
        content: "Looking for study partners for the upcoming Chemistry midterm. Anyone interested?",
        timestamp: "2023-05-15T10:15:00Z",
        media: null,
        mediaType: null,
        likes: 15,
        comments: [],
        commentCount: 23,
        isLiked: false,
        showComments: false
    },
    {
        id: 3,
        author: "Charlie Brown",
        avatar: "https://i.pravatar.cc/150?img=3",
        content: "Just joined the university's debate club. Excited for the upcoming competitions!",
        timestamp: "2023-05-14T18:45:00Z",
        media: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        mediaType: "image",
        likes: 38,
        comments: [],
        commentCount: 5,
        isLiked: false,
        showComments: false
    },
    {
        id: 4,
        author: "Diana Ross",
        avatar: "https://i.pravatar.cc/150?img=4",
        content: "Reminder: Student Council meeting tomorrow at 3 PM in the Main Hall.",
        timestamp: "2023-05-14T09:00:00Z",
        media: null,
        mediaType: null,
        likes: 27,
        comments: [],
        commentCount: 12,
        isLiked: false,
        showComments: false
    },
    {
        id: 5,
        author: "Ethan Hunt",
        avatar: "https://i.pravatar.cc/150?img=5",
        content: "Check out this amazing sunset from my dorm room!",
        timestamp: "2023-05-13T20:30:00Z",
        media: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1176&q=80",
        mediaType: "image",
        likes: 89,
        comments: [],
        commentCount: 15,
        isLiked: false,
        showComments: false
    }
];

const dummyStories = [
    { id: 1, author: "Makinde Dayo", avatar: "https://i.pravatar.cc/150?img=7" },
    { id: 2, author: "Ajayi Grace", avatar: "https://i.pravatar.cc/150?img=8" },
    { id: 3, author: "John Charlie", avatar: "https://i.pravatar.cc/150?img=9" },
    { id: 4, author: "Michel Ogunbyi", avatar: "https://i.pravatar.cc/150?img=10" },
    { id: 5, author: "Ayomide Iremisi", avatar: "https://i.pravatar.cc/150?img=11" }
];

const dummySuggestedAccounts = [
    { id: 1, name: "Jane Doe", username: "@jane_doe", avatar: "https://i.pravatar.cc/150?img=6" },
    { id: 2, name: "John Smith", username: "@john_smith", avatar: "https://i.pravatar.cc/150?img=7" },
    { id: 3, name: "Emma Wilson", username: "@emma_wilson", avatar: "https://i.pravatar.cc/150?img=8" }
];

// --- Helper Functions ---
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return days > 0 ? `${days}d ago` 
         : hours > 0 ? `${hours}h ago` 
         : minutes > 0 ? `${minutes}m ago` 
         : 'Just now';
}

function handleMediaUpload(file, type) {
    const reader = new FileReader();
    const mediaPreview = document.getElementById('media-preview');
    const imagePreview = document.getElementById('image-preview');
    const videoPreview = document.getElementById('video-preview');

    reader.onload = function(e) {
        selectedMedia = e.target.result;
        selectedMediaType = type;
        mediaPreview.style.display = 'block';
        
        if (type === 'image') {
            imagePreview.style.display = 'block';
            videoPreview.style.display = 'none';
            imagePreview.src = e.target.result;
        } else {
            imagePreview.style.display = 'none';
            videoPreview.style.display = 'block';
            videoPreview.src = e.target.result;
        }
    };

    reader.readAsDataURL(file);
}

// --- Post Creation ---
function createPost(content) {
    const newPost = {
        id: Date.now(),
        author: "Current User",
        avatar: "https://i.pravatar.cc/150?img=7",
        content: content,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        commentCount: 0,
        isLiked: false,
        showComments: false,
        media: selectedMedia,
        mediaType: selectedMediaType
    };
    
    // Reset media selection
    selectedMedia = null;
    selectedMediaType = null;
    document.getElementById('media-preview').style.display = 'none';
    
    dummyPosts.unshift(newPost);
    updateFeed();
}


// Add event listeners for media uploads
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('image-upload').addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            handleMediaUpload(this.files[0], 'image');
        }
    });

    document.getElementById('video-upload').addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            handleMediaUpload(this.files[0], 'video');
        }
    });
});

// Add event listener for the "Post" button
document.querySelector('.create-post button').addEventListener('click', function() {
    const input = document.querySelector('.create-post input');
    if (input.value.trim()) {
        createPost(input.value);
        input.value = '';
    }
});

// --- Feed Rendering ---
function updateFeed() {
    const feedContainer = document.getElementById('feed-container');
    feedContainer.innerHTML = dummyPosts.map(post => `
        <div class="card mb-3" data-post-id="${post.id}">
            <div class="card-body">
                <!-- Post Header -->
                <div class="d-flex align-items-center gap-3 mb-3">
                    <img src="${post.avatar}" 
                         class="rounded-circle" 
                         width="40" 
                         height="40" 
                         alt="${post.author}">
                    <div>
                        <h6 class="mb-0 fw-bold">${post.author}</h6>
                        <small class="text-muted">${formatTimestamp(post.timestamp)}</small>
                    </div>
                </div>
                <!-- Post Content -->
                <p class="card-text">${post.content}</p>
                ${post.media ? 
                    (post.mediaType === 'image' ?
                    `<img src="${post.media}" class="img-fluid rounded mb-3" alt="Post image">` :
                    `<video src="${post.media}" class="w-100 rounded mb-3" controls></video>`) 
                    : ''}
                <!-- Post Actions -->
                <div class="d-flex gap-4">
                    <span class="post-action like-button ${post.isLiked ? 'text-danger' : ''}" data-post-id="${post.id}">
                        <i class="fas fa-heart"></i> ${post.likes}
                    </span>
                    <span class="post-action comment-button" data-post-id="${post.id}">
                        <i class="fas fa-comment"></i> ${post.commentCount}
                    </span>
                </div>
                <!-- Comment Section -->
                <div class="comment-section mt-3" id="comments-${post.id}" style="display: ${post.showComments ? 'block' : 'none'};">
                    <div class="comments-list mb-2">
                        ${post.comments.map(comment => `
                            <div class="comment-item d-flex gap-2 align-items-start mb-2">
                                <img src="https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}" 
                                    class="rounded-circle" width="32" height="32">
                                <div class="comment-content bg-light p-2 rounded flex-grow-1">
                                    <div class="fw-bold">${comment.author}</div>
                                    <div>${comment.text}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="d-flex gap-2">
                        <input type="text" class="form-control comment-input" placeholder="Add a comment...">
                        <button class="btn btn-primary btn-sm add-comment-btn" data-post-id="${post.id}">Comment</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // --- Event Listeners for Feed Items ---
    
    // Toggle Comment Section (update state instead of directly changing style)
    document.querySelectorAll('.comment-button').forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.dataset.postId;
            const post = dummyPosts.find(p => p.id.toString() === postId);
            post.showComments = !post.showComments;
            updateFeed();
        });
    });

    // Add a Comment
    document.querySelectorAll('.add-comment-btn').forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.dataset.postId;
            const post = dummyPosts.find(p => p.id.toString() === postId);
            const commentInput = this.previousElementSibling;
            const commentText = commentInput.value.trim();
            
            if (commentText) {
                const newComment = {
                    id: Date.now(),
                    author: 'Current User',
                    text: commentText,
                    timestamp: new Date().toISOString()
                };
                
                post.comments.push(newComment);
                post.commentCount = post.comments.length;
                commentInput.value = '';
                updateFeed();
            }
        });
    });

    // Like / Unlike a Post
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.dataset.postId;
            const post = dummyPosts.find(p => p.id.toString() === postId);
            post.isLiked = !post.isLiked;
            post.likes += post.isLiked ? 1 : -1;
            updateFeed();
        });
    });
}

// --- Stories & Suggested Accounts (remain unchanged) ---
function createStoryElement(story) {
    const storyElement = document.createElement('div');
    storyElement.className = 'text-center mx-2';
    
    const storyContent = `
        <div class="position-relative">
            <img src="${story.avatar}" 
                 class="story-circle border border-2 border-${story.id === 1 ? 'secondary' : 'primary'}" 
                 width="60" 
                 height="60" 
                 alt="${story.author}">
        </div>
        <small class="text-muted d-block mt-1">${story.author}</small>
    `;
    
    storyElement.innerHTML = storyContent;
    return storyElement;
}

function createSuggestedAccountElement(account) {
    const div = document.createElement('div');
    div.className = 'd-flex align-items-center justify-content-between mb-3';
    div.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <img src="${account.avatar}" 
                class="rounded-circle" 
                width="32" height="32" 
                alt="${account.name}">
            <div>
                <div class="fw-semibold">${account.name}</div>
                <small class="text-muted">${account.username}</small>
            </div>
        </div>
        <button class="btn btn-follow btn-sm rounded-pill">Follow</button>
    `;
    return div;
}

function renderStories() {
    const storiesContainer = document.querySelector('.stories-container > .d-flex');
    storiesContainer.innerHTML = '';

    // Add "Add Story" button
    const addStory = document.createElement('div');
    addStory.className = 'text-center mx-2';
    addStory.innerHTML = `
        <div class="story-circle story-add">
            <i class="fas fa-plus text-white fs-4"></i>
        </div>
        <small class="text-muted">Add Story</small>
    `;
    storiesContainer.appendChild(addStory);

    // Add other stories
    dummyStories.forEach(story => {
        const storyElement = createStoryElement(story);
        storiesContainer.appendChild(storyElement);
    });
}

function renderSuggestedAccounts() {
    const container = document.querySelector('.suggested-accounts-container');
    container.innerHTML = '';
    
    dummySuggestedAccounts.forEach(account => {
        const accountElement = createSuggestedAccountElement(account);
        container.appendChild(accountElement);
    });
}

// --- Initialization ---
window.addEventListener('load', () => {
    updateFeed();
    renderStories();
    renderSuggestedAccounts();
});
