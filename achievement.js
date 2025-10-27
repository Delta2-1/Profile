// =========================
// Data for each milestone (keyed by data-key attribute)
// Update image filenames or texts as needed.
// =========================
const milestoneData = {
  "shs-high-honors": {
    title: "Senior High School High Honors",
    images: ["shs1.jpeg","shs2.jpeg"],
    texts: [
      "Awarded high honors for academic performance and extracurricular contributions.",
      "Recognized for consistent excellence and leadership during senior high."
    ]
  },
  "mod-developer": {
    title: "Most Valued Mod Developer",
    images: ["mod1.png","mod2.png"],
    texts: [
      "Contributed to Carnage Wars audio mod system and tools.",
      "Built and released a community-loved audio mod that enhanced game immersion."
    ]
  },
  "redzone-development": {
    title: "Development of Redzone Low Poly Extraction",
    images: ["anim1.png","proto1.png","anim3.png"],
    texts: [
      "Prototype work for Redzone: a low poly extraction game.",
      "Focused on level layout, loot balancing, and core extraction loop.",
      "Built initial prototype in Unity and iterated on feedback."
    ]
  },
  "harvestlane-prototype": {
    title: "HarvestLane Mamburao Prototype",
    images: ["frontend1.png","frontend3.png"],
    texts: [
      "Prototype to learn level design and simple economy systems.",
      "Explored Economy Based Layout, framework, fuctions and UI design."
    ]
  },
  "topdown-shooter": {
    title: "Top-down Shooter Demo",
    images: ["tds.png","uiux3.png"],
    texts: [
      "Small PC demo built to practice combat and enemy AI.",
      "Developed to test AI systems and Physics.",],
  }
};

// =========================
// Initialization
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const milestones = document.querySelectorAll(".milestone");
  const infoPanel = document.getElementById("infoPanel");
  const panelContent = document.getElementById("panelContent");
  const closePanel = document.getElementById("closePanel");
  const viewer = document.getElementById("imageViewer");
  const fullImage = document.getElementById("fullImage");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  // For slide effect on page content if needed (not strictly necessary for this layout)
  const cardsContainer = document.querySelector(".timeline");

  let isTransitioning = false;

  function loadPanelContent(key, data) {
    let html = `<h2>${data.title}</h2>`;
    data.images.forEach((img, i) => {
      const text = data.texts[i] || "";
      html += `
        <div>
          <img src="${img}" alt="${data.title} image ${i + 1}">
          <p>${text}</p>
        </div>
      `;
    });
    panelContent.innerHTML = html;
    enableImageViewer(); // attach click handlers to panel images
  }

  function openPanel(key, data) {
    loadPanelContent(key, data);
    infoPanel.classList.add("active");
    if (cardsContainer) cardsContainer.classList.add("shift-left");
    infoPanel.setAttribute("aria-hidden", "false");
  }

  function closePanelSmooth() {
    infoPanel.classList.remove("active");
    if (cardsContainer) cardsContainer.classList.remove("shift-left");
    infoPanel.setAttribute("aria-hidden", "true");
  }

  // Attach click handlers to milestones
  milestones.forEach(ms => {
    ms.addEventListener("click", () => {
      if (isTransitioning) return;
      const key = ms.getAttribute("data-key");
      const data = milestoneData[key];
      if (!data) return; // no data for this milestone
      if (infoPanel.classList.contains("active")) {
        isTransitioning = true;
        closePanelSmooth();
        setTimeout(() => {
          openPanel(key, data);
          isTransitioning = false;
        }, 300);
      } else {
        openPanel(key, data);
      }
    });
  });

  // Close panel button
  closePanel.addEventListener("click", () => {
    closePanelSmooth();
  });

  // IMAGE VIEWER: attach to any .info-panel img or other images you might add
  function enableImageViewer() {
    const imgs = document.querySelectorAll(".info-panel img");
    imgs.forEach(img => {
      // remove previous handler if present to avoid duplicate listeners
      img.replaceWith(img.cloneNode(true));
    });
    // re-query after replacing nodes
    const freshImgs = document.querySelectorAll(".info-panel img");
    freshImgs.forEach(img => {
      img.addEventListener("click", (e) => {
        e.preventDefault();
        fullImage.src = img.src;
        fullImage.alt = img.alt || "";
        viewer.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });
  }

  // Backdrop click closes viewer
  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) {
      viewer.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // ESC closes viewer or panel
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (viewer.classList.contains("active")) {
        viewer.classList.remove("active");
        document.body.style.overflow = "";
        return;
      }
      if (infoPanel.classList.contains("active")) {
        closePanelSmooth();
      }
    }
  });

  // NAV toggle
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 760) navLinks.classList.remove("open");
      });
    });
  }
});

//particles

const canvas = document.getElementById("matrixParticles");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 100; // adjust for more or fewer particles

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 1;
      this.speed = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.8 + 0.2;
      this.color = `hsl(120, 100%, ${40 + Math.random() * 20}%)`; // green glow
    }

    update() {
      this.y -= this.speed;
      if (this.y < -10) this.reset();
    }

    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size * 4);
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });