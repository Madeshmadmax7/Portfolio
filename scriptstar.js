(function() {
    const starsCanvas = document.getElementById('stars');
    const cometsCanvas = document.getElementById('comets');
    if (!starsCanvas || !cometsCanvas) return; // If no canvas, do nothing

    const starsCtx = starsCanvas.getContext('2d');
    const cometsCtx = cometsCanvas.getContext('2d');

    let stars = [];
    let cometTimer;
    let comets = [];

    function resizeCanvas() {
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
        cometsCanvas.width = window.innerWidth;
        cometsCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    function createStars(count) {
        stars = [];
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: Math.random() * 1.5,
                opacity: Math.random()
            });
        }
    }

    function drawStars() {
        starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        stars.forEach(star => {
            starsCtx.beginPath();
            starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            starsCtx.fillStyle = `rgba(255,255,255,${star.opacity})`;
            starsCtx.fill();
        });
    }

    function twinkleStars() {
        stars.forEach(star => {
            star.opacity += (Math.random() - 0.5) * 0.05;
            if (star.opacity < 0.1) star.opacity = 0.1;
            if (star.opacity > 1) star.opacity = 1;
        });
    }

    function startComet() {
        const cometContainer = document.getElementById("comets");
        cometContainer.innerHTML = '';
        const comet = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        comet.classList.add('comet');
        comet.setAttribute('fill', 'url(#comet-gradient)');
        comet.setAttribute('cx', '0');
        comet.setAttribute('cy', '0');
        comet.setAttribute('rx', '150');
        comet.setAttribute('ry', '2');
        cometContainer.appendChild(comet);

        const cometStartX = Math.random() * window.innerWidth; // Random starting x
        const cometStartY = Math.random() * window.innerHeight * 0.7; // Random starting y within 70% of height
        comet.setAttribute('cx', cometStartX);
        comet.setAttribute('cy', cometStartY);

        const cometSpeed = 5 + Math.random() * 5;

        function moveComet() {
            const direction = Math.random() > 0.5 ? 1 : -1;
            const movement = Math.random() > 0.5 ? 'horizontal' : 'vertical';

            let currentX = parseFloat(comet.getAttribute('cx'));
            let currentY = parseFloat(comet.getAttribute('cy'));

            if (movement === 'horizontal') {
                currentX += cometSpeed * direction;
            } else {
                currentY += cometSpeed * direction;
            }

            comet.setAttribute('cx', currentX);
            comet.setAttribute('cy', currentY);

            if (currentX < 0 || currentY < 0 || currentX > window.innerWidth || currentY > window.innerHeight) {
                cometContainer.removeChild(comet);
                clearTimeout(cometTimer);
                cometTimer = setTimeout(startComet, 10000);
            } else {
                requestAnimationFrame(moveComet);
            }
        }

        moveComet();
    }

    function createComet() {
        startComet();
    }

    function animateBackground() {
        twinkleStars();
        drawStars();
        requestAnimationFrame(animateBackground);
    }

    createStars(200);
    setInterval(createComet, 8000);
    animateBackground();
})();


