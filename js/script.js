function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* =========================
   AUDIO SETUP
   Put these files in /assets:
   - music.mp3
   - gift.mp3
   - meow.mp3
   - pop.mp3
   ========================= */

const bgMusic = new Audio("assets/music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.05;

const giftSound = new Audio("assets/gift.mp3");
giftSound.volume = 0.05;

const catSound = new Audio("assets/meow.mp3");
catSound.volume = 0.05;

const popSound = new Audio("assets/pop.mp3");
popSound.volume = 0.05;

function playSound(sound) {
  sound.currentTime = 0;
  sound.play().catch(() => {
    // Browser may block sound until user interaction.
  });
}

/* Gift Box */
const giftBox = document.getElementById("giftBox");
const giftMessage = document.getElementById("giftMessage");

giftBox.addEventListener("click", openGift);
giftBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") openGift();
});

function openGift() {
  giftBox.classList.add("open");
  giftMessage.classList.remove("hidden");
  createConfetti();
  playSound(giftSound);
}

/* Confetti */
function createConfetti() {
  const confettiContainer = document.getElementById("confettiContainer");
  const colors = ["#ff8bd1", "#c9a7ff", "#fff", "#ffd1ec", "#f7b7ff"];

  for (let i = 0; i < 45; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    confetti.style.width = Math.random() * 10 + 8 + "px";
    confetti.style.height = Math.random() * 10 + 8 + "px";

    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3200);
  }
}

/* Pixel Cat + Floating Meme GIF */
const pixelCat = document.getElementById("pixelCat");
const catMessage = document.getElementById("catMessage");

const catMessages = [
  "meow meow birthday mode activated 🎂",
  "pspsps... you are loved, my baby 💖",
  "cat says: give my baby flowers now 🌸",
  "loading cuteness... 100% complete ✨",
  "no thoughts, only my baby 💜",
  "she is beauty, she is grace, she deserves cake 🍰",
  "mission: protect my baby 🐱",
  "certified baby moment detected 💖",
  "cat approval granted: very cute ✅"
];

const catGifs = [
  "assets/cat-meme-1.gif",
  "assets/cat-meme-2.gif",
  "assets/cat-meme-3.gif",
  "assets/cat-meme-4.gif",
  "assets/cat-meme-5.gif",
  "assets/cat-meme-6.gif",
  "assets/cat-meme-7.gif",
  "assets/cat-meme-8.gif",
  "assets/cat-meme-9.gif",
  "assets/cat-meme-10.gif",
  "assets/cat-meme-11.gif",
  "assets/cat-meme-12.gif",
  "assets/cat-meme-13.gif",
  "assets/cat-meme-14.gif",
  "assets/cat-meme-15.gif",
  "assets/cat-meme-16.gif",
  "assets/cat-meme-17.gif"
];

pixelCat.addEventListener("click", () => {
  const randomMessage =
    catMessages[Math.floor(Math.random() * catMessages.length)];

  catMessage.textContent = randomMessage;

  pixelCat.classList.remove("wiggle");
  void pixelCat.offsetWidth;
  pixelCat.classList.add("wiggle");

  spawnFloatingGif();
  playSound(catSound);
});

function spawnFloatingGif() {
  const gif = document.createElement("img");
  const randomGif = catGifs[Math.floor(Math.random() * catGifs.length)];

  gif.src = randomGif;
  gif.alt = "Cute cat meme";
  gif.classList.add("floating-gif");

  const gifMaxSize = 150;
  const safePadding = 20;

  const maxX = Math.max(window.innerWidth - gifMaxSize - safePadding, safePadding);
  const maxY = Math.max(window.innerHeight - gifMaxSize - safePadding, safePadding);

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  gif.style.left = `${x}px`;
  gif.style.top = `${y}px`;

  document.body.appendChild(gif);
  setTimeout(() => gif.remove(), 1800);
}

/* Hearts Compliments */
const hearts = document.querySelectorAll(".heart");
const complimentText = document.getElementById("complimentText");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    complimentText.textContent = heart.dataset.compliment;

    heart.classList.remove("clicked");
    void heart.offsetWidth;
    heart.classList.add("clicked");

    playSound(popSound);
  });
});

/* Memory Flip Cards */
const memoryCards = document.querySelectorAll(".memory-card");

memoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
    playSound(popSound);
  });
});

/* Heartfelt Typewriter Message */
const revealMessageBtn = document.getElementById("revealMessageBtn");
const typewriterText = document.getElementById("typewriterText");

const mainMessage = `Happy Birthday, my baby. I just want you to know how proud I am of you. You are not only cute and beautiful, but also strong, responsible, hardworking, smart, and amazing in everything you do. You always try your best, even when things are difficult, and that makes me admire you even more.

To me, you are perfect—not because you never get tired or never make mistakes, but because you keep going, you keep caring, and you keep being the wonderful person that you are.

Every message, every laugh, every small moment with you has become something special to me.

I hope this birthday reminds you how loved, appreciated, and special you are. You deserve all the happiness, peace, success, and love in the world.

I love you so much. Happy Birthday, my baby.`;

let typewriterStarted = false;

revealMessageBtn.addEventListener("click", () => {
  if (typewriterStarted) return;

  typewriterStarted = true;
  revealMessageBtn.disabled = true;
  revealMessageBtn.textContent = "Typing my heart... 💖";

  playSound(popSound);
  typeWriter(mainMessage, 0);
});

function typeWriter(text, index) {
  if (index < text.length) {
    typewriterText.textContent += text.charAt(index);
    setTimeout(() => typeWriter(text, index + 1), 28);
  } else {
    revealMessageBtn.textContent = "Message Revealed 💌";
    createConfetti();
    playSound(giftSound);
  }
}

/* Music Toggle */
const musicToggle = document.getElementById("musicToggle");
let musicPlaying = false;

musicToggle.addEventListener("click", () => {
  musicPlaying = !musicPlaying;

  if (musicPlaying) {
    musicToggle.textContent = "♫";
    bgMusic.play().catch(() => {});
  } else {
    musicToggle.textContent = "♪";
    bgMusic.pause();
  }
});

/* Cute Click Sparkles */
document.addEventListener("click", (event) => {
  const sparkle = document.createElement("div");
  sparkle.textContent = Math.random() > 0.5 ? "💖" : "✨";

  sparkle.style.position = "fixed";
  sparkle.style.left = `${event.clientX}px`;
  sparkle.style.top = `${event.clientY}px`;
  sparkle.style.pointerEvents = "none";
  sparkle.style.fontSize = "1.5rem";
  sparkle.style.zIndex = "999";
  sparkle.style.animation = "clickSparkle 0.9s ease forwards";

  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 900);
});

const sparkleStyle = document.createElement("style");
sparkleStyle.textContent = `
  @keyframes clickSparkle {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-45px) scale(1.4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(sparkleStyle);