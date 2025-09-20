// Get a reference to the body and other elements
const body = document.body;
const page1Section = document.getElementById('page1'); // Get the parent section
const heading = document.getElementById('page1_heading');
const imageBtn = document.getElementById('img-btn');
const image = document.querySelector('.page1 img');
const heart = document.getElementById('heart');

// Preload images to ensure a smooth transition
const tapMeImage = new Image();
tapMeImage.src = 'images/tap-me.gif';
const curtainImage = new Image();
curtainImage.src = 'images/curtain.jpg';

// Add a new Audio object for background music
const backgroundMusic = new Audio('Sounds/background.mp3');
backgroundMusic.loop = true;

// State variables
let clickCount = 0;
const MAX_CLICKS_FOR_GROWTH = 5;
const BEAR_GROWTH_FACTOR = 1.2;
let animationStage = 0;

// --- Helper Functions ---

function typeText(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}

function startHeartRain() {
    animationStage = 2;
    const heartsContainer = document.createElement('div');
    heartsContainer.style.position = 'fixed';
    heartsContainer.style.top = '0';
    heartsContainer.style.left = '0';
    heartsContainer.style.width = '100%';
    heartsContainer.style.height = '100%';
    heartsContainer.style.pointerEvents = 'none';
    heartsContainer.style.zIndex = '999';
    body.appendChild(heartsContainer);

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        .raining-heart {
            position: absolute;
            color: red;
            font-size: 24px;
            opacity: 0;
            animation: fall 5s linear forwards;
            pointer-events: none;
        }
        @keyframes fall {
            0% { transform: translateY(-50px) scale(0.5); opacity: 0; }
            10% { opacity: 1; transform: translateY(0px) scale(1); }
            100% { transform: translateY(100vh) scale(0.8); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    let heartCounter = 0;
    const rainInterval = setInterval(() => {
        if (heartCounter >= 50) {
            clearInterval(rainInterval);
            return;
        }
        const fallingHeart = document.createElement('span');
        fallingHeart.classList.add('raining-heart');
        fallingHeart.innerHTML = '💕';
        fallingHeart.style.left = `${Math.random() * 100}vw`;
        fallingHeart.style.animationDelay = `${Math.random() * 2}s`;
        heartsContainer.appendChild(fallingHeart);
        heartCounter++;
    }, 200);
}

function dropCurtain() {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        .curtain-left, .curtain-right {
            position: fixed;
            top: 0;
            width: 50vw;
            height: 0;
            background-image: url('images/curtain.jpg');
            background-size: cover;
            background-position: center;
            transition: height 3s ease-in-out;
            z-index: 1000;
        }
        .curtain-left { left: 0; }
        .curtain-right { right: 0; }
    `;
    document.head.appendChild(styleSheet);
    
    const curtainLeft = document.createElement('div');
    curtainLeft.classList.add('curtain-left');
    const curtainRight = document.createElement('div');
    curtainRight.classList.add('curtain-right');
    
    body.appendChild(curtainLeft);
    body.appendChild(curtainRight);
    
    setTimeout(() => {
        curtainLeft.style.height = '100vh';
        curtainRight.style.height = '100vh';
    }, 100);
}

function fadeOutMusic() {
    const fadeDuration = 3000;
    const interval = 50;
    const steps = fadeDuration / interval;
    const volumeDecrease = backgroundMusic.volume / steps;

    const fadeInterval = setInterval(() => {
        if (backgroundMusic.volume > volumeDecrease) {
            backgroundMusic.volume -= volumeDecrease;
        } else {
            backgroundMusic.volume = 0;
            backgroundMusic.pause();
            clearInterval(fadeInterval);
        }
    }, interval);
}

function showWish() {
    // Hide the previous elements
    heading.style.opacity = '0';
    image.style.opacity = '0';
    imageBtn.style.display = 'none';
    heart.style.display = 'none';

    // Change background and start heart rain
    body.style.backgroundColor = 'rgb(240, 164, 177)';
    startHeartRain();

    // Show the wish box with a slight delay for a smooth transition
    const wishBox = document.createElement('div');
    wishBox.classList.add('wish-box');
    wishBox.innerHTML = `<p style="font-size: 16px;"><b>Happy Birthday Nandhana💗</b>, You deserve a day full of smiles, surprises, and love... and I hope this little effort makes you feel how important you are.</p>`;
    wishBox.style.width = "250px";
    wishBox.style.padding = "20px";
    wishBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.8)";
    body.appendChild(wishBox);
    
    setTimeout(() => {
        wishBox.style.opacity = '1';
        wishBox.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);

    // Add the popper gif at the bottom of the screen
    const popperElement = document.createElement('img');
    popperElement.src = 'images/popper.gif';
    popperElement.style.position = 'fixed';
    popperElement.style.bottom = '10px';
    popperElement.style.left = '50%';
    popperElement.style.transform = 'translateX(-50%)';
    popperElement.style.width = '350px';
    popperElement.style.zIndex = '999';
    body.appendChild(popperElement);
    
    // Remove the popper after 3 seconds
    setTimeout(() => {
        popperElement.remove();
    }, 3000);

    // After 15 seconds, drop the curtain and fade music
    setTimeout(() => {
        fadeOutMusic();
        dropCurtain();
    }, 15000);
}

// --- Main Logic ---

document.addEventListener('DOMContentLoaded', () => {
    typeText(heading, "Something is special today, Right?", 100, () => {
        setTimeout(() => {
            heading.style.opacity = '0';
            image.style.opacity = '0';
            
            setTimeout(() => {
                heading.innerText = "Tap Me!";
                image.src = tapMeImage.src;
                image.alt = "Tap me";
                body.style.backgroundColor = "rgb(255, 192, 203)";
                
                heading.style.opacity = '1';
                image.style.opacity = '1';
                animationStage = 1;

                heart.style.top = '20%';
                heart.style.opacity = '0';
            }, 500);
        }, 2000);
    });
});

// The event listener is now on the parent section, 'page1Section',
// which contains both the button (with the teddy) and the heading.
// This handles clicks on either element due to event bubbling.
page1Section.addEventListener('click', (event) => {
    // Check if the click occurred on a child element of page1Section
    const isClickOnChild = page1Section.contains(event.target);

    if (isClickOnChild && animationStage === 1) {
        // Play background music on the first click
        if (clickCount === 0) {
            backgroundMusic.play().catch(e => console.error("Autoplay was prevented:", e));
        }

        if (clickCount < MAX_CLICKS_FOR_GROWTH) {
            heart.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            heart.style.opacity = '1';
            
            const currentScale = parseFloat(heart.style.transform.match(/scale\((\d+\.?\d*)\)/)?.[1]) || 0;
            const newScale = currentScale === 0 ? 1 : currentScale * 1.2;
            heart.style.transform = `translate(-50%, -50%) scale(${newScale})`;
            
            const currentBearWidth = parseFloat(image.style.width) || 180;
            const currentBearHeight = parseFloat(image.style.height) || 180;
            image.style.width = `${currentBearWidth * BEAR_GROWTH_FACTOR}px`;
            image.style.height = `${currentBearHeight * BEAR_GROWTH_FACTOR}px`;
            
            clickCount++;
            const clicksound = new Audio('Sounds/click.mp3');
            clicksound.play();
            if (clickCount === MAX_CLICKS_FOR_GROWTH) {
                heading.innerText = "Wow! You really like it!";
            }
        } else if (clickCount === MAX_CLICKS_FOR_GROWTH) {
            clickCount++;
            imageBtn.disabled = true;
            showWish();
        }
    }
});
