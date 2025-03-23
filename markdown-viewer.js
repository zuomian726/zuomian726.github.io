// markdown-viewer.js

document.addEventListener('DOMContentLoaded', function() {
    // 拦截Markdown文档链接的点击事件
    document.querySelectorAll('a[href$=".md"]').forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            try {
                const response = await fetch(href);
                const markdown = await response.text();
                showMarkdownModal(markdown);
            } catch (error) {
                console.error('Error loading markdown:', error);
            }
        });
    });

    // 创建模态框
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'markdown-modal';
        modal.innerHTML = `
            <div class="markdown-content">
                <div class="markdown-close">×</div>
                <div class="markdown-body"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // 关闭按钮事件
        modal.querySelector('.markdown-close').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        return modal;
    }

    // 显示Markdown内容
    function showMarkdownModal(markdown) {
        let modal = document.querySelector('.markdown-modal');
        if (!modal) {
            modal = createModal();
        }

        const markdownBody = modal.querySelector('.markdown-body');
        // 使用marked解析Markdown
        markdownBody.innerHTML = marked.parse(markdown);
        // 应用Prism代码高亮
        Prism.highlightAll();

        modal.style.display = 'flex';
    }
}));