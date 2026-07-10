/*==========================================
            REVEAL ANIMATION
==========================================*/

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

sections.forEach((section) => observer.observe(section));


/*==========================================
          FLOATING PARTICLES
==========================================*/

const particleCount = 60;

for (let i = 0; i < particleCount; i++) {

    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${5 + Math.random() * 8}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.opacity = Math.random();

    document.body.appendChild(particle);

}


/*==========================================
            LOADING SCREEN
==========================================*/

const loader = document.getElementById("loader");
const systemText = document.getElementById("systemText");

window.addEventListener("load", () => {

    if (!loader || !systemText) return;

    setTimeout(() => {
        systemText.textContent = "LOADING SHADOW ARMY...";
    }, 600);

    setTimeout(() => {
        systemText.textContent = "CONNECTING TO THE SYSTEM...";
    }, 1200);

    setTimeout(() => {
        systemText.textContent = "ARISE.";
    }, 1800);

    setTimeout(() => {
        loader.classList.add("hide");
    }, 2000);

});


/*==========================================
          SHADOW SYSTEM PANEL
==========================================*/

const container = document.querySelector(".system-container");
const orb = document.querySelector(".system-orb");
const panel = document.querySelector(".system-panel");
const closeBtn = document.getElementById("closePanel");

// Toggle panel
orb.addEventListener("click", (e) => {
    e.stopPropagation();
    container.classList.toggle("open");
});

// Prevent clicks inside panel from closing it
panel.addEventListener("click", (e) => {
    e.stopPropagation();
});

// Close button
closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    container.classList.remove("open");
});

// Click outside closes panel
document.addEventListener("click", () => {
    container.classList.remove("open");
});

/*==========================================
            MUSIC PLAYER
==========================================*/

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const volumeSlider = document.getElementById("volumeSlider");
const visualizer = document.querySelector(".visualizer");

if (music && volumeSlider) {
    music.volume = volumeSlider.value / 100;
}

if (music && musicBtn && visualizer) {

    musicBtn.addEventListener("click", async () => {

        if (music.paused) {

            try {

                await music.play();

                musicBtn.textContent = "● DARK ARIA ACTIVE";
                visualizer.classList.add("playing");

            } catch (error) {

                console.warn("Autoplay blocked:", error);

            }

        } else {

            music.pause();

            musicBtn.textContent = "● SYSTEM STANDBY";
            visualizer.classList.remove("playing");

        }

    });

}

if (music && volumeSlider) {

    volumeSlider.addEventListener("input", () => {
        music.volume = volumeSlider.value / 100;
    });

}

/*==========================================
            MUSIC PROGRESS BAR
==========================================*/

const progressBar = document.getElementById("progressBar");
const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${secs.toString().padStart(2, "0")}`;

}

if (music && progressBar && progress && currentTime && duration) {

    // Show total duration
    music.addEventListener("loadedmetadata", () => {

        duration.textContent = formatTime(music.duration);

    });

    // Update progress while playing
    music.addEventListener("timeupdate", () => {

        if (!music.duration) return;

        const percent = (music.currentTime / music.duration) * 100;

        progress.style.width = `${percent}%`;
        currentTime.textContent = formatTime(music.currentTime);

    });

    // Seek when clicking the progress bar
    progressBar.addEventListener("click", (event) => {

        if (!music.duration) return;

        const rect = progressBar.getBoundingClientRect();

        const percent =
            (event.clientX - rect.left) / rect.width;

        music.currentTime = percent * music.duration;

    });

}


/*==========================================
            SYSTEM QUOTES
==========================================*/

const quotes = [

    "ARISE.",
    "YOU HAVE LEVELED UP.",
    "THE SHADOW MONARCH AWAKENS.",
    "WELCOME, HUNTER.",
    "SHADOW EXTRACTION READY.",
    "QUEST ACCEPTED.",
    "SYSTEM ONLINE."

];

const quote = document.getElementById("systemQuote");

let quoteIndex = 0;

if (quote) {

    setInterval(() => {

        quoteIndex = (quoteIndex + 1) % quotes.length;

        quote.textContent = quotes[quoteIndex];

    }, 3500);

}

/*==========================================
            SHADOW AURA
==========================================*/

const auraFill = document.querySelector(".aura-fill");
const auraPercent = document.getElementById("auraPercent");

let aura = 72;
let direction = 1;

if (auraFill && auraPercent) {

    setInterval(() => {

        aura += direction;

        if (aura >= 100) {
            direction = -1;
        }

        if (aura <= 65) {
            direction = 1;
        }

        auraFill.style.width = `${aura}%`;
        auraPercent.textContent = `${aura}%`;

    }, 120);

}


/*==========================================
            HUNTER LEVEL
==========================================*/

const level = document.getElementById("hunterLevel");

let hunterLevel = 99;

if (level) {

    setInterval(() => {

        hunterLevel++;

        if (hunterLevel > 100) {
            hunterLevel = 99;
        }

        level.textContent = hunterLevel;

    }, 4000);

}


/*==========================================
            SYSTEM QUESTS
==========================================*/

const questPopup = document.getElementById("questPopup");
const questTitle = document.getElementById("questTitle");
const questText = document.getElementById("questText");
const rewardText = document.getElementById("rewardText");

const flash = document.getElementById("systemFlash");
const systemSound = document.getElementById("systemSound");

const quests = [

    {
        title: "DAILY QUEST",
        quest: "Complete Daily Training",
        reward: "+5 Stat Points"
    },

    {
        title: "NEW QUEST",
        quest: "Enter the Double Dungeon",
        reward: "+300 EXP"
    },

    {
        title: "MISSION",
        quest: "Clear the Demon Castle",
        reward: "Rare Rune Stone"
    },

    {
        title: "SYSTEM",
        quest: "Extract Shadow",
        reward: "New Shadow Soldier"
    },

    {
        title: "MISSION",
        quest: "Summon Igris",
        reward: "+200 EXP"
    },

    {
        title: "MISSION",
        quest: "Summon Beru",
        reward: "+500 EXP"
    },

    {
        title: "NEW QUEST",
        quest: "Defeat the Ant King",
        reward: "Unique Shadow"
    },

    {
        title: "MISSION",
        quest: "Close the Gate",
        reward: "+400 EXP"
    },

    {
        title: "SYSTEM",
        quest: "Increase Strength",
        reward: "+3 Strength"
    },

    {
        title: "MISSION",
        quest: "Protect Humanity",
        reward: "Hidden Reward"
    }

];

function showQuest() {

    if (
        !questPopup ||
        !questTitle ||
        !questText ||
        !rewardText ||
        !flash
    ) {
        return;
    }

    const randomQuest =
        quests[Math.floor(Math.random() * quests.length)];

    questTitle.textContent = randomQuest.title;
    questText.textContent = randomQuest.quest;
    rewardText.textContent = randomQuest.reward;

    flash.classList.add("active");

    if (systemSound) {

        systemSound.currentTime = 0;

        systemSound.play().catch(() => {
            // Browser blocked autoplay
        });

    }

    questPopup.classList.add("show");

    setTimeout(() => {
        flash.classList.remove("active");
    }, 450);

    setTimeout(() => {
        questPopup.classList.remove("show");
    }, 5000);

}

setTimeout(showQuest, 3000);

if (orb) {

    orb.addEventListener("click", showQuest);

}