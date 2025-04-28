const skills = [
"cpp", "html", "css", "arduino", "react", "spring", "aws", "java",
"python", "javascript", "c", "mysql", "bash", "mongodb", "docker", "vite", "figma", "photoshop", "git","github","linux"
];

const container = document.getElementById("container");
let icons = [];
let animationId = null;
let startTime = null;

function getIconSize() {
return window.innerWidth < 600 ? 30 : 50;
}

function getTargetPosition(index, iconSize, spacing) {
const iconsPerRow = Math.floor(container.clientWidth / (iconSize + spacing));
const row = Math.floor(index / iconsPerRow);
const col = index % iconsPerRow;
return {
    x: col * (iconSize + spacing),
    y: row * (iconSize + spacing)
};
}

function setupIcons() {
container.innerHTML = "";
icons = [];
const iconSize = getIconSize();
const spacing = 10;

skills.forEach((skill, index) => {
    const icon = document.createElement("img");
    icon.src = `https://skillicons.dev/icons?i=${skill}`;
    icon.className = "icon";
    icon.style.position = "absolute";
    icon.style.width = `${iconSize}px`;
    icon.style.height = `${iconSize}px`;
    container.appendChild(icon);

    const target = getTargetPosition(index, iconSize, spacing);

    icons.push({
    el: icon,
    x: Math.random() * (container.clientWidth - iconSize),
    y: Math.random() * (container.clientHeight - iconSize),
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4,
    size: iconSize,
    targetX: target.x,
    targetY: target.y,
    canGuide: false,
    hasHitWall: false
    });
});
}

function animate() {
const now = Date.now();
const elapsed = now - startTime;

icons.forEach((icon, i) => {
    if (!icon.canGuide) {
    icon.x += icon.dx;
    icon.y += icon.dy;

    if (icon.x <= 0 || icon.x >= container.clientWidth - icon.size) {
        icon.dx *= -1;
        if (elapsed > 5000) icon.hasHitWall = true;
    }

    if (icon.y <= 0 || icon.y >= container.clientHeight - icon.size) {
        icon.dy *= -1;
        if (elapsed > 5000) icon.hasHitWall = true;
    }

    for (let j = i + 1; j < icons.length; j++) {
        const other = icons[j];
        const dx = icon.x - other.x;
        const dy = icon.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < icon.size) {
        const angle = Math.atan2(dy, dx);
        const speed1 = Math.sqrt(icon.dx ** 2 + icon.dy ** 2);
        const speed2 = Math.sqrt(other.dx ** 2 + other.dy ** 2);
        icon.dx = Math.cos(angle) * speed1;
        icon.dy = Math.sin(angle) * speed1;
        other.dx = -Math.cos(angle) * speed2;
        other.dy = -Math.sin(angle) * speed2;
        const overlap = icon.size - dist;
        const pushX = Math.cos(angle) * (overlap / 2);
        const pushY = Math.sin(angle) * (overlap / 2);
        icon.x += pushX;
        icon.y += pushY;
        other.x -= pushX;
        other.y -= pushY;
        }
    }

    if (elapsed > 5000 && icon.hasHitWall) {
        icon.canGuide = true;
    }
    }

    if (icon.canGuide) {
    const dx = icon.targetX - icon.x;
    const dy = icon.targetY - icon.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const speed = 2;
    if (dist > 3) {
        const angle = Math.atan2(dy, dx);
        icon.dx = Math.cos(angle) * speed;
        icon.dy = Math.sin(angle) * speed;
        icon.x += icon.dx;
        icon.y += icon.dy;
    } else {
        icon.x = icon.targetX;
        icon.y = icon.targetY;
        icon.dx = 0;
        icon.dy = 0;
    }
    }

    icon.el.style.left = icon.x + "px";
    icon.el.style.top = icon.y + "px";
});

animationId = requestAnimationFrame(animate);
}

function startBounce() {
if (animationId) cancelAnimationFrame(animationId);
startTime = Date.now();
setupIcons();
animate();
}

startBounce();


window.addEventListener("resize", () => {
if (icons.length > 0) startBounce();
});

document.getElementById("bounceBtn")?.addEventListener("click", startBounce);


const toggle = document.getElementById('themeToggle');
const iconSlider = toggle.querySelector('.icon-slider');
let dark = false;

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  dark = !dark;
  iconSlider.style.transform = dark ? 'translateX(-30px)' : 'translateX(0)';
});

