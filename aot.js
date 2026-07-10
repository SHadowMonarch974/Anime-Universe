
// ======================================
// ATTACK ON TITAN WEBSITE
// MUSIC PANEL
// ======================================

// ---------- ELEMENTS ----------
const reveals = document.querySelectorAll(".reveal");

const bgMusic = document.getElementById("bgMusic");

const panel = document.getElementById("music-panel");
const panelToggle = document.getElementById("panel-toggle");
const closePanel = document.getElementById("close-panel");

const musicBtn = document.getElementById("music-btn");

const volumeSlider = document.getElementById("volume-slider");
const volumeLabel = document.getElementById("volume-label");

const musicProgress = document.getElementById("music-progress");
const progressBar = document.getElementById("progress-bar");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const musicStatus = document.getElementById("music-status");
const musicTitle = document.getElementById("music-title");

const visualizer = document.getElementById("music-visualizer");

// ---------- CHECK ----------
if (!bgMusic) console.error("Audio element not found.");
if (!panelToggle) console.error("Panel toggle button not found.");
if (!musicBtn) console.error("Music button not found.");

// ======================================
// REVEAL ANIMATION
// ======================================

function reveal() {

    reveals.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// ======================================
// INITIAL PLAYER SETUP
// ======================================

if (bgMusic && volumeSlider) {

    bgMusic.volume = volumeSlider.value / 100;

}

if (volumeLabel && volumeSlider) {

    volumeLabel.textContent = `🔊 Volume ${volumeSlider.value}%`;

}

if (musicStatus) {

    musicStatus.textContent = "⏸ PAUSED";

}

if (musicTitle) {

    musicTitle.textContent = "Click Play Music";

}

// ======================================
// PANEL OPEN / CLOSE
// ======================================

panelToggle?.addEventListener("click", () => {

    panel.classList.toggle("open");

});

closePanel?.addEventListener("click", () => {

    panel.classList.remove("open");

});

// ======================================
// PLAYER UI
// ======================================

function updatePlayerUI(playing) {

    if (playing) {

        musicBtn.innerHTML = "⏸ Pause Music";

        musicStatus.textContent = "🎵 NOW PLAYING";

        musicTitle.textContent = "Attack on Titan OST";

        visualizer.classList.add("playing");

        panelToggle.classList.add("playing");

    }

    else {

        musicBtn.innerHTML = "▶ Play Music";

        musicStatus.textContent = "⏸ PAUSED";

        musicTitle.textContent = "Click Play Music";

        visualizer.classList.remove("playing");

        panelToggle.classList.remove("playing");

    }

}

// ======================================
// PLAY / PAUSE
// ======================================

musicBtn?.addEventListener("click", async () => {

    try {

        if (bgMusic.paused) {

            await bgMusic.play();

        }

        else {

            bgMusic.pause();

        }

    }

    catch (error) {

        console.error(error);

    }

});

// ======================================
// AUDIO EVENTS
// ======================================

bgMusic?.addEventListener("play", () => {

    updatePlayerUI(true);

});

bgMusic?.addEventListener("pause", () => {

    updatePlayerUI(false);

});

bgMusic?.addEventListener("ended", () => {

    updatePlayerUI(false);

});

// ======================================
// VOLUME
// ======================================

volumeSlider?.addEventListener("input", () => {

    bgMusic.volume = volumeSlider.value / 100;

    volumeLabel.textContent = `🔊 Volume ${volumeSlider.value}%`;

});

// ======================================
// TIME FORMAT
// ======================================

function formatTime(seconds) {

    if (isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${String(secs).padStart(2, "0")}`;

}

// ======================================
// AUDIO METADATA
// ======================================

bgMusic?.addEventListener("loadedmetadata", () => {

    duration.textContent = formatTime(bgMusic.duration);

});

// ======================================
// MUSIC PROGRESS
// ======================================

bgMusic?.addEventListener("timeupdate", () => {

    if (!bgMusic.duration) return;

    progressBar.style.width =
        (bgMusic.currentTime / bgMusic.duration) * 100 + "%";

    currentTime.textContent =
        formatTime(bgMusic.currentTime);

});

// ======================================
// SEEK BAR
// ======================================

musicProgress?.addEventListener("click", (e) => {

    if (!bgMusic.duration) return;

    const rect = musicProgress.getBoundingClientRect();

    const percent =
        (e.clientX - rect.left) / rect.width;

    bgMusic.currentTime =
        percent * bgMusic.duration;

});

// ======================================
// DEBUG
// ======================================

bgMusic?.addEventListener("error", () => {

    console.error("❌ Audio failed to load.");

});

bgMusic?.addEventListener("canplay", () => {

    console.log("✅ Audio ready.");

});

bgMusic?.addEventListener("loadedmetadata", () => {

    console.log("✅ Metadata loaded.");

});

// ======================================
// NAVBAR
// ======================================

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        }

        else {

            navbar.classList.remove("scrolled");

        }

    });

}

// ======================================
// ACTIVE NAVIGATION
// ======================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (window.scrollY >= top) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// ======================================
// LOADER
// ======================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader?.classList.add("hide");

    }, 3000);

});

// ======================================
// SCROLL PROGRESS BAR
// ======================================

const scrollProgress = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {

    if (!scrollProgress) return;

    const total =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percent =
        (window.scrollY / total) * 100;

    scrollProgress.style.width = percent + "%";

});
function showTimeline() {

    const items = document.querySelectorAll(".timeline-item");

    items.forEach((item, index) => {

        if (item.getBoundingClientRect().top < window.innerHeight - 120) {

            setTimeout(() => {
                item.classList.add("show");
            }, index * 200);

        }

    });

}

window.addEventListener("scroll", showTimeline);
window.addEventListener("load", showTimeline);