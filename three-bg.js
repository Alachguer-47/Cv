// three-bg.js

// Initialisation de la scène, caméra et rendu
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// alpha: true permet d'avoir un fond transparent (le body css bg apparaîtra derrière)
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Création des particules géométriques
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 800; // Nombre de particules

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    // Dispersion des particules sur un grand espace
    posArray[i] = (Math.random() - 0.5) * 120;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Matériau des particules (couleur primaire)
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    color: 0x8b5cf6, // Couleur violette (var(--primary))
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending // Effet lumineux
});

// Création du maillage de points
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Gestion de l'interaction avec la souris
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Boucle d'animation
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotation lente continue
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Interaction subtile avec la souris
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Interpolation douce pour le mouvement de la souris
    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

    // Mouvement vertical flottant
    particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 2;

    renderer.render(scene, camera);
}

animate();

// Gérer le redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});