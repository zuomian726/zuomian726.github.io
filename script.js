// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子效果
    particlesJS('particles-canvas', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#4a6bff', '#ff4a8d', '#ffffff']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#4a6bff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // 导航栏滚动效果
    const navMenu = document.querySelector('.nav-menu');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navMenu.classList.add('scrolled');
        } else {
            navMenu.classList.remove('scrolled');
        }
    });

    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const docCards = document.querySelectorAll('.doc-card');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        docCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.classList.add('animate__animated', 'animate__fadeIn');
            } else {
                card.style.display = 'none';
            }
        });
    });

    // 添加卡片悬停动画效果
    docCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.doc-icon').style.animation = 'float 3s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.doc-icon').style.animation = 'none';
        });
    });

    // 添加滚动动画
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate__animated:not(.animate__fadeIn)');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                const animationClass = element.classList.contains('animate__fadeInUp') ? 
                    'animate__fadeInUp' : 'animate__fadeIn';
                element.classList.add(animationClass);
            }
        });
    };

    // 初始执行一次
    animateOnScroll();
    
    // 滚动时执行
    window.addEventListener('scroll', animateOnScroll);
});
