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

function changeChannel(channel) {
    // 停止当前视频播放
    if (hls) {
        hls.destroy();
    }

    // 开始播放新频道
    if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(channel);
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            videoElement.play();
        });
    }
}

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
