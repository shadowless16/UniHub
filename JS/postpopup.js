class PostModal {
    constructor() {
        this.modalHTML = `
            <div class="modal-overlay" style="display: none;">
                <div class="post-modal">
                    <div class="modal-header">
                        <img id="modal-user-avatar" src="https://i.pravatar.cc/150?img=7" alt="Your avatar">
                        <span id="modal-username" class="user-name">You</span>
                    </div>
                    <div class="modal-content">
                        <textarea class="modal-input" placeholder="What's happening on campus?"></textarea>
                        <div class="preview-container"></div>
                    </div>
                    <div class="modal-footer">
                        <div class="attachment-tools">
                            <input type="file" class="file-input" id="imageInput" accept="image/*,video/*" multiple>
                            <button class="tool-btn" id="imageBtn" title="Add image">🖼️</button>
                            <button class="tool-btn" id="videoBtn" title="Add video">🎥</button>
                        </div>
                        <button class="modal-post-btn">Post</button>
                    </div>
                </div>
            </div>`;
        this.initializeModal();
    }

    initializeModal() {
        document.body.insertAdjacentHTML('beforeend', this.modalHTML);
        this.setupEventListeners(); // Removed loadUserData call
    }

    setupEventListeners() {
        const modal = document.querySelector('.modal-overlay');
        const postBtn = document.querySelector('.modal-post-btn');
        const fileInput = document.querySelector('.file-input');
        const plusIcon = document.querySelector('.fa-plus').parentElement;

        // Open modal when plus icon is clicked
        plusIcon.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Handle file uploads
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => fileInput.click());
        });

        fileInput.addEventListener('change', this.handleFileSelect.bind(this));

        // Handle post creation
        postBtn.addEventListener('click', () => {
            const content = document.querySelector('.modal-input').value;
            const media = Array.from(document.querySelectorAll('.preview-item'));
            this.createPost(content, media);
            this.closeModal();
        });
    }

    createPost(content, mediaElements) {
        console.log("New Post Content:", content);
        const media = Array.from(mediaElements).map(el => ({
            type: el.querySelector("img") ? "image" : "video",
            src: el.querySelector("img, video").src
        }));
        console.log("Attached Media:", media);
        // Add  post-submission logic here
    }

    handleFileSelect(e) {
        const files = Array.from(e.target.files);
        const previewContainer = document.querySelector('.preview-container');

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

    closeModal() {
        const modal = document.querySelector('.modal-overlay');
        modal.style.display = 'none';
        document.querySelector('.modal-input').value = '';
        document.querySelector('.preview-container').innerHTML = '';
        document.querySelector('.file-input').value = '';
    }
}

document.addEventListener('DOMContentLoaded', () => new PostModal());