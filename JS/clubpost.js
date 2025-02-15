document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const newPostText = document.getElementById('newPostText');
    const newPostAttachment = document.getElementById('newPostAttachment');
    const postModal = document.getElementById('clubModal');

    const samplePosts = [
        {
            id: 1,
            author: 'Alex Chen',
            avatar: 'https://i.pravatar.cc/150?img=33',
            content: 'Just finished the robotics prototype! 🚀',
            timestamp: '2 hours ago',
            likes: 12,
            comments: []
        },
        {
            id: 2,
            author: 'Maria Gonzalez',
            avatar: 'https://i.pravatar.cc/150?img=47',
            content: 'Reminder: Hackathon workshop tomorrow! 🛠️',
            timestamp: '4 hours ago',
            likes: 28,
            comments: []
        }
    ];

    function createPostElement(post) {
        const postElement = document.createElement('div');
        postElement.classList.add('card', 'mb-3');
        postElement.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                    <img src="${post.avatar}" class="rounded-circle me-3" width="40" height="40">
                    <div>
                        <h5 class="mb-0">${post.author}</h5>
                        <small class="text-muted">${post.timestamp}</small>
                    </div>
                </div>
                <p>${post.content}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <button class="btn btn-primary btn-sm">Like</button>
                    <button class="btn btn-secondary btn-sm">Comment</button>
                </div>
            </div>
        `;
        return postElement;
    }

    samplePosts.forEach(post => {
        postsContainer.prepend(createPostElement(post));
    });

    postModal.addEventListener('shown.bs.modal', () => {
        newPostText.focus();
    });

    postModal.querySelector('.btn-primary').addEventListener('click', () => {
        const content = newPostText.value.trim();
        const attachment = newPostAttachment.files[0];
        if (content || attachment) {
            const newPost = {
                id: Date.now(),
                author: 'You',
                avatar: 'https://i.pravatar.cc/150?img=11',
                content: content,
                timestamp: 'Just now',
                likes: 0,
                comments: []
            };
            postsContainer.prepend(createPostElement(newPost));
            newPostText.value = '';
            newPostAttachment.value = '';
            postModal.classList.remove('show');
        }
    });
});