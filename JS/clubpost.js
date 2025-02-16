// Modal and File Upload Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal-overlay');
    const floatingBtn = document.querySelector('.floating-post-btn');
    const fileInput = document.querySelector('.file-input');
    const previewContainer = document.querySelector('.preview-container');
    const modalPostBtn = document.querySelector('.modal-post-btn');
    const modalInput = document.querySelector('.modal-input');

    // Sample posts data
    const samplePosts = [
        {
            id: 1,
            author: 'Alex Chen',
            avatar: 'https://i.pravatar.cc/150?img=33',
            content: 'Just finished the robotics prototype! 🚀 Who\'s interested in collaborating on the documentation?',
            timestamp: '2 hours ago',
            likes: 12,
            comments: [],
            attachments: []
        },
        {
            id: 2,
            author: 'Maria Gonzalez',
            avatar: 'https://i.pravatar.cc/150?img=47',
            content: 'Reminder: Hackathon workshop tomorrow at 3 PM in the engineering lab! 🛠️',
            timestamp: '4 hours ago',
            likes: 28,
            comments: [],
            attachments: []
        }
    ];

    function createCommentElement(comment) {
        return `
            <div class="comment">
                <img src="${comment.avatar}" alt="${comment.author}" class="user-avatar">
                <div>
                    <div class="comment-header">
                        <span class="post-author">${comment.author}</span>
                        <span class="post-time">${comment.timestamp}</span>
                    </div>
                    <div class="comment-content">${comment.content}</div>
                </div>
            </div>
        `;
    }

    function createPostElement(post) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.dataset.postId = post.id;

        // Generate media HTML
        const mediaHTML = post.attachments ? `
            <div class="post-media-container">
                ${post.attachments.map(attachment => {
                    return attachment.type === 'img' ? 
                        `<img src="${attachment.src}" class="post-media" alt="Post media">` :
                        `<video src="${attachment.src}" controls></video>`;
                }).join('')}
            </div>
        ` : '';

        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" alt="${post.author}" class="user-avatar">
                <div>
                    <div class="post-author">${post.author}</div>
                    <div class="post-time">${post.timestamp}</div>
                </div>
            </div>
            <div class="post-content">
                ${post.content}
                ${mediaHTML}
            </div>
            <div class="post-footer">
                <button class="interaction-btn like-btn" data-liked="false">
                    👍 Like (${post.likes})
                </button>
                <button class="interaction-btn comment-btn">
                    💬 Comment (${post.comments.length})
                </button>
            </div>
            <div class="comments-section" style="display: none;">
                <div class="comments-container">
                    ${post.comments.map(comment => createCommentElement(comment)).join('')}
                </div>
                <div class="comment-input-wrapper" style="display: flex; gap: 10px; margin-top: 10px;">
                    <input type="text" placeholder="Write a comment..." class="post-input" style="flex-grow: 1;">
                    <button class="post-btn">Send</button>
                </div>
            </div>
        `;

         // Handle all post triggers
        document.querySelectorAll('.post-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'flex';
            });
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        function closeModal() {
            modal.style.display = 'none';
            document.querySelector('.modal-input').value = '';
            previewContainer.innerHTML = '';
            fileInput.value = '';
        }

        // Handle file uploads
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => fileInput.click());
        });

        // Add event listeners
        const likeBtn = postElement.querySelector('.like-btn');
        const commentBtn = postElement.querySelector('.comment-btn');
        const commentsSection = postElement.querySelector('.comments-section');
        const commentInput = postElement.querySelector('.comment-input-wrapper input');
        const commentSubmitBtn = postElement.querySelector('.comment-input-wrapper .post-btn');

        likeBtn.addEventListener('click', () => {
            const isLiked = likeBtn.dataset.liked === 'true';
            const currentLikes = parseInt(post.likes);
            post.likes = isLiked ? currentLikes - 1 : currentLikes + 1;
            likeBtn.textContent = `👍 Like (${post.likes})`;
            likeBtn.dataset.liked = !isLiked;
            likeBtn.style.background = isLiked ? 'var(--neutral-light)' : 'var(--secondary)';
            likeBtn.style.color = isLiked ? 'var(--text-primary)' : 'var(--neutral)';
        });

        commentBtn.addEventListener('click', () => {
            commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
        });

        commentSubmitBtn.addEventListener('click', () => {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const newComment = {
                    author: 'You',
                    avatar: 'https://i.pravatar.cc/150?img=11',
                    content: commentText,
                    timestamp: 'Just now'
                };
                post.comments.push(newComment);
                const commentsContainer = postElement.querySelector('.comments-container');
                commentsContainer.insertAdjacentHTML('beforeend', createCommentElement(newComment));
                commentInput.value = '';
                commentBtn.textContent = `💬 Comment (${post.comments.length})`;
            }
        });

        return postElement;
    }

    // Handle file selections for media attachments
    function handleFileSelect(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    previewItem.innerHTML = `
                        ${file.type.startsWith('image/') ? 
                            `<img src="${e.target.result}" alt="Preview">` : 
                            `<video src="${e.target.result}" controls></video>`}
                        <button class="remove-preview">×</button>
                    `;
                    previewContainer.appendChild(previewItem);
                    
                    // Add remove functionality
                    previewItem.querySelector('.remove-preview').addEventListener('click', () => {
                        previewItem.remove();
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Clear the modal content and previews
    function clearModal() {
        modalInput.value = '';
        previewContainer.innerHTML = '';
        fileInput.value = '';
    }

    // Open the modal
    floatingBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close the modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            clearModal();
        }
    });

    // File input handling
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', () => fileInput.click());
    });

    fileInput.addEventListener('change', handleFileSelect);

    // Submit new post from modal
    modalPostBtn.addEventListener('click', () => {
        const content = modalInput.value.trim();
        const attachments = Array.from(previewContainer.children).map(preview => ({
            type: preview.querySelector('img, video').tagName.toLowerCase(),
            src: preview.querySelector('img, video').src
        }));

        if (content || attachments.length > 0) {
            const newPost = {
                id: Date.now(),
                author: 'You',
                avatar: 'https://i.pravatar.cc/150?img=11',
                content: content,
                timestamp: 'Just now',
                likes: 0,
                comments: [],
                attachments: attachments
            };

            // Create and prepend the new post
            const postElement = createPostElement(newPost);
            const postsContainer = document.getElementById('posts-container');
            postsContainer.prepend(postElement);

            // Clear modal and close
            clearModal();
            modal.style.display = 'none';

            // Scroll to the new post
            postElement.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Initialize with sample posts
    samplePosts.forEach(post => {
        const postElement = createPostElement(post);
        document.getElementById('posts-container').prepend(postElement);
    });
});