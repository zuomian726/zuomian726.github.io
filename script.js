// script.js

// 获取 DOM 元素
const videoElement = document.getElementById('tv-video');
const snowCanvas = document.getElementById('snow-canvas');
const ctx = snowCanvas.getContext('2d');

// 初始化 HLS.js 实例
let hls = null;

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

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('tv-video');
    let hls = null;

    function initHLS(url) {
        if (hls) {
            hls.destroy();
        }

        hls = new Hls({
            debug: false,
            autoStartLoad: true,
            startPosition: -1
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
            // 对于 Safari 等原生支持 HLS 的浏览器
            video.src = url;
            video.play().catch(e => console.log('播放失败:', e));
        } else {
            console.log('浏览器不支持 HLS');
        }
    }

    // 为所有频道按钮添加点击事件
    document.querySelectorAll('.channel-btn').forEach(button => {
        button.addEventListener('click', function() {
            const url = this.dataset.url;
            changeChannel(url);
        });
    });
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
