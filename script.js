// script.js

// 获取 DOM 元素
const video = document.getElementById('tv-video');
const snowCanvas = document.getElementById('snow-canvas');
const ctx = snowCanvas.getContext('2d');

// 创建雪花效果
const snowflakes = [];
function createSnowflakes() {
    const maxSnowflakes = 200;
    for (let i = 0; i < maxSnowflakes; i++) {
        snowflakes.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: Math.random() * 2 + 1,
            speedY: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.5 + 0.5
        });
    }
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < snowflakes.length; i++) {
        let flake = snowflakes[i];
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();

        flake.y += flake.speedY;
        if (flake.y > snowCanvas.height) {
            flake.y = -flake.radius;
            flake.x = Math.random() * snowCanvas.width;
        }
    }
    requestAnimationFrame(drawSnowflakes);
}

// 将 changeChannel 和 initHLS 函数移到全局作用域
document.addEventListener('DOMContentLoaded', function() {
    const channelsContainer = document.querySelector('.channels');
    const searchInput = document.getElementById('channelSearch');
    const video = document.getElementById('tv-video');
    let hls = null;

    // 生成频道列表
    function renderChannels(channelList) {
        channelsContainer.innerHTML = channelList.map(channel => `
            <button class="channel-btn" data-url="${channel.url}">
                ${channel.name}
            </button>
        `).join('');
    }

    // 初始渲染
    renderChannels(channels);

    // 搜索功能
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredChannels = channels.filter(channel => 
            channel.name.toLowerCase().includes(searchTerm)
        );
        renderChannels(filteredChannels);
    });

    // 频道切换功能
    function initHLS(url) {
        if (hls) {
            hls.destroy();
        }

        hls = new Hls({
            debug: false,
            autoStartLoad: true,
        });

        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.loadSource(url);
        });

        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        console.log('网络错误，尝试重新加载...');
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log('媒体错误，尝试恢复...');
                        hls.recoverMediaError();
                        break;
                    default:
                        console.log('无法恢复的错误');
                        hls.destroy();
                        break;
                }
            }
        });
    }

    function changeChannel(url) {
        if (Hls.isSupported()) {
            initHLS(url);
            video.play().catch(e => console.log('播放失败:', e));
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
            video.play().catch(e => console.log('播放失败:', e));
        } else {
            console.log('浏览器不支持 HLS');
        }
    }

    // 点击事件监听
    channelsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('channel-btn')) {
            const url = e.target.dataset.url;
            changeChannel(url);
        }
    });

    // 默认播放第一个频道
    if (channels.length > 0) {
        changeChannel(channels[0].url);
    }
});

// 页面加载时创建雪花效果
window.onload = () => {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
    createSnowflakes();
    drawSnowflakes();
    changeChannel('channel1.m3u8'); // 默认频道
};

// 监听窗口大小变化，重新设置画布大小
window.onresize = () => {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
};
