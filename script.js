// --- Configuration ---
const REPLAY_TIMESTAMP_SECONDS = 15; // Set this to the timestamp you want!

// --- Floating Hearts ---
function createHearts() {
    const container = document.getElementById('hearts-container');
    const heartCount = 15;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 10 + 15 + 's';
        heart.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
        container.appendChild(heart);
    }
}
createHearts();

// --- Music Auto-Play ---
const bgMusic = document.getElementById('bgMusic');

// Try to play immediately (often blocked by browser)
bgMusic.play().catch(err => {
    console.log("Autoplay prevented. Waiting for interaction.");
});

// Play on first interaction (tap/click anywhere)
function enableAudio() {
    bgMusic.play();
    document.removeEventListener('click', enableAudio);
    document.removeEventListener('touchstart', enableAudio);
}

document.addEventListener('click', enableAudio);
document.addEventListener('touchstart', enableAudio);

// --- Envelopes Interaction ---
window.openEnvelope = function (element) {
    element.classList.toggle('open');
};


// --- Scroll Animations ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-on-scroll').forEach(el => observer.observe(el));


// --- "No" Button Interaction ---
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionContainer = document.querySelector('.question-container');

const noMessages = [
    "Wait, really?",
    "Are you sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "I wouldn't say no!",
    "Think about the future!",
    "Reconsider?",
    "Is that your final answer?"
];

let messageIndex = 0;
let noScale = 1;
let yesScale = 1;

noBtn.addEventListener('click', () => {
    if (messageIndex < noMessages.length) {
        noBtn.textContent = noMessages[messageIndex];
        messageIndex++;
    }

    // Make No button smaller
    noScale -= 0.1;
    noBtn.style.transform = `scale(${noScale})`;

    // Make Yes button bigger
    yesScale += 0.5; // Grow faster
    yesBtn.style.transform = `scale(${yesScale})`;

    // If No button becomes too small, hide it or just leave it tiny
    // Optionally, increase force on the Yes button
});

// --- "Yes" Celebration ---
yesBtn.addEventListener('click', () => {
    // Confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF69B4', '#FFB7C5', '#FFF']
    });

    // Change Content
    questionContainer.innerHTML = `
        <h1 class="big-question">Yay! I Love You! 💖</h1>
        <p>You've made me the happiest person ever.</p>
        <div style="font-size: 4rem; margin-top: 1rem;">💑</div>
    `;
});
