/**
 * Blog JavaScript for Advisor website
 * Handles blog functionality including category filtering and article viewing
 */

document.addEventListener('DOMContentLoaded', function() {
    const articleListView = document.getElementById('article-list-view');
    const singleArticleView = document.getElementById('single-article-view');

    if (!articleListView || !singleArticleView) {
        // console.warn('Blog view elements not found. Blog functionality may be limited.');
        return;
    }

    let articlesData = [];
    let currentArticleIndex = -1;

    initCategoryFilters();
    collectArticlesData();
    initReadMoreLinks();
    initNavigationButtons();

    /**
     * Initialize category filtering functionality
     */
    function initCategoryFilters() {
        const filterButtons = document.querySelectorAll('.category-filter');
        const blogPostElements = document.querySelectorAll('#blog-posts .blog-article-card');
        
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const category = this.getAttribute('data-category');
                    
                    filterButtons.forEach(btn => {
                        btn.classList.remove('bg-primary', 'text-white');
                        btn.classList.add('bg-white', 'text-gray-700', 'border');
                    });
                    
                    this.classList.remove('bg-white', 'text-gray-700', 'border');
                    this.classList.add('bg-primary', 'text-white');
                    
                    blogPostElements.forEach(post => {
                        if (category === 'all' || post.getAttribute('data-category') === category) {
                            post.classList.remove('hidden');
                        } else {
                            post.classList.add('hidden');
                        }
                    });
                });
            });
        }
    }

    /**
     * Collects data from article cards in the DOM.
     */
    function collectArticlesData() {
        const articleCards = document.querySelectorAll('#blog-posts .blog-article-card');
        articlesData = Array.from(articleCards).map((card, index) => {
            const readMoreLink = card.querySelector('.read-more-link');
            return {
                id: card.dataset.id || `article-${index + 1}`,
                mdUrl: readMoreLink ? readMoreLink.getAttribute('href') : null,
                element: card, // Keep reference to the card element if needed later
                // Potentially pre-load title, summary etc. from card for faster display if needed
                // title: card.querySelector('.article-title')?.textContent || 'مقال غير معنون', 
            };
        });
    }

    /**
     * Initialize "Read More" link click handlers
     */
    function initReadMoreLinks() {
        const readMoreLinks = document.querySelectorAll('.read-more-link');
        readMoreLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const articleCard = this.closest('.blog-article-card');
                const articleId = articleCard.dataset.id;
                
                currentArticleIndex = articlesData.findIndex(article => article.id === articleId);
                const articleMdUrl = this.getAttribute('href');

                if (articleMdUrl && currentArticleIndex !== -1) {
                    displayFullArticle(articleMdUrl);
                } else {
                    console.error('Article URL or ID not found for this link.');
                    // Optionally show an error to the user
                }
            });
        });
    }

    /**
     * Initialize back, next, and previous navigation buttons
     */
    function initNavigationButtons() {
        const backButton = document.getElementById('back-to-list-button');
        const nextButton = document.getElementById('next-article-button');
        const prevButton = document.getElementById('prev-article-button');

        if (backButton) {
            backButton.addEventListener('click', () => {
                showArticleList();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentArticleIndex < articlesData.length - 1) {
                    currentArticleIndex++;
                    displayFullArticle(articlesData[currentArticleIndex].mdUrl);
                }
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentArticleIndex > 0) {
                    currentArticleIndex--;
                    displayFullArticle(articlesData[currentArticleIndex].mdUrl);
                }
            });
        }
    }
    
    /**
     * Switches view to show the full article content.
     * @param {string} articleUrl - URL of the Markdown file for the article.
     */
    function displayFullArticle(articleUrl) {
        articleListView.classList.add('hidden');
        singleArticleView.classList.remove('hidden');
        window.scrollTo({ top: singleArticleView.offsetTop - 80, behavior: 'smooth' }); // Adjust for sticky header
        
        loadAndRenderArticle(articleUrl);
        updateNavigationButtonsState();
    }

    /**
     * Switches view back to the article list.
     */
    function showArticleList() {
        singleArticleView.classList.add('hidden');
        articleListView.classList.remove('hidden');
        currentArticleIndex = -1; // Reset current article
        window.scrollTo({ top: articleListView.offsetTop - 80, behavior: 'smooth' });
    }

    /**
     * Updates the state (enabled/disabled) of Next/Previous article buttons.
     */
    function updateNavigationButtonsState() {
        const nextButton = document.getElementById('next-article-button');
        const prevButton = document.getElementById('prev-article-button');

        if (nextButton) {
            nextButton.disabled = currentArticleIndex >= articlesData.length - 1;
        }
        if (prevButton) {
            prevButton.disabled = currentArticleIndex <= 0;
        }
    }

    /**
     * Load article content from Markdown file and render it.
     * @param {string} url - URL of the Markdown file
     */
    function loadAndRenderArticle(url) {
        const articleViewImage = document.getElementById('article-view-image');
        const articleViewTitle = document.getElementById('article-view-title');
        const articleViewAuthor = document.getElementById('article-view-author');
        const articleViewDate = document.getElementById('article-view-date');
        const articleViewCategoryTag = document.getElementById('article-view-category-tag');
        const articleViewBody = document.getElementById('article-view-body');

        // Show loading state (optional)
        articleViewTitle.textContent = 'جار التحميل...';
        articleViewBody.innerHTML = '<p>جار تحميل محتوى المقال...</p>';
        articleViewImage.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="; // Transparent pixel
        articleViewImage.alt = "";
        articleViewAuthor.textContent = '';
        articleViewDate.textContent = '';
        articleViewCategoryTag.textContent = '';


        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(markdownText => {
                processAndRenderMarkdown(markdownText);
            })
            .catch(error => {
                console.error('Error loading article content:', error);
                articleViewTitle.textContent = 'خطأ في تحميل المقال';
                articleViewBody.innerHTML = `<p>عذراً، لم نتمكن من تحميل محتوى المقال. يرجى المحاولة مرة أخرى لاحقاً.</p><p class="text-xs text-gray-500">${error.message}</p>`;
            });
    }

    /**
     * Process markdown content with YAML front matter and render it.
     * @param {string} markdownText - Raw markdown text with YAML front matter
     */
    function processAndRenderMarkdown(markdownText) {
        const articleViewImage = document.getElementById('article-view-image');
        const articleViewTitle = document.getElementById('article-view-title');
        const articleViewAuthor = document.getElementById('article-view-author');
        const articleViewDate = document.getElementById('article-view-date');
        const articleViewCategoryTag = document.getElementById('article-view-category-tag');
        const articleViewBody = document.getElementById('article-view-body');

        try {
            const parts = markdownText.split('---');
            if (parts.length < 3) {
                throw new Error('Invalid markdown format: Missing YAML front matter');
            }

            const yamlString = parts[1].trim();
            const contentString = parts.slice(2).join('---').trim();
            
            const metadata = jsyaml.load(yamlString);
            const htmlContent = marked.parse(contentString);

            articleViewTitle.textContent = metadata.title || 'مقال غير معنون';
            
            if (metadata.image) {
                articleViewImage.src = metadata.image;
                articleViewImage.alt = metadata.title || 'صورة المقال';
                articleViewImage.classList.remove('hidden');
            } else {
                articleViewImage.classList.add('hidden');
            }

            articleViewAuthor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg> ${metadata.author || 'غير معروف'}`;
            articleViewDate.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" /></svg> ${metadata.date ? formatArabicDate(metadata.date) : 'بدون تاريخ'}`;
            articleViewCategoryTag.textContent = metadata.category || 'عام';
            
            articleViewBody.innerHTML = htmlContent;

        } catch (error) {
            console.error('Error processing markdown:', error);
            articleViewTitle.textContent = 'خطأ في عرض المقال';
            articleViewBody.innerHTML = `<p>عذراً، حدث خطأ أثناء معالجة محتوى المقال.</p><p class="text-xs text-gray-500">${error.message}</p>`;
        }
    }

    // Helper function to format date (can be moved to main.js if used globally)
    function formatArabicDate(dateString) {
        try {
            const date = new Date(dateString);
            // Check if date is valid
            if (isNaN(date.getTime())) {
                return dateString; // Return original string if date is invalid
            }
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('ar-EG', options); // Using ar-EG for common Arabic date format
        } catch (e) {
            return dateString; // Fallback to original string in case of error
        }
    }

});



