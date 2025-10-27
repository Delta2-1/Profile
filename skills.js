// =========================
// Skill Cards Data
// =========================
const cardData = {
  "Frontend Development": {
    images: ["frontend1.png","frontend2.png","frontend3.png"],
    texts: [
      "Frontend development allows me to bring ideas to life using clean UI.",
      "I use responsive design so my projects look great on all devices.",
      "I focus on both aesthetics and functionality for the best experience."
    ]
  },
  "Backend Development": {
    images: ["backend1.png","backend2.png","backend3.png"],
    texts: [
      "Backend ensures the system runs smoothly and securely.",
      "I have experience building REST APIs and managing databases.",
      "Scalability and security are always my top priorities."
    ]
  },
  "UI/UX": {
    images: ["uiux1.png","uiux2.png","uiux3.png"],
    texts: [
      "UI/UX design helps bridge creativity with usability.",
      "I create prototypes to test user flows effectively.",
      "Minimalist design is my go-to style for clarity."
    ]
  },
  "Game Development": {
    images: ["dev1.png","dev2.png","dev3.png"],
    texts: [
      "I develop Games that I dream Of making.",
      "Gives me satisfaction on pursuing my career as an Indie Game Developer.",
      "I am inspired to create mobile game versions of other popular games on PC."
    ]
  },
  "3D Animation": {
    images: ["anim1.png","anim2.png","anim3.png"],
    texts: [
      "Made 3D Animations for Unity game assets and object animations.",
      "Improves my skills as an Indie Game Developer in the early stage .",
      "Animations are the Body of the Games."
    ]
  },
  "3D Modeling": {
    images: ["model1.png","model2.png","model3.png"],
    texts: [
      "Created 3D models for game assets such as game environment and game levels.",
      "Gives me more Techniques and improve my skills in creating good quality 3D models.",
      "3D modeling can be sometimes frustrating but, hey, if it's hard then it's worth it."
    ]
  },
  "Digital Arts": {
    images: ["dig1.png","dig2.png","dig3.png"],
    texts: [
      "I created Digital arts for commissions and covers of novels I'm writing.",
      "Digital arts help me save materials when drafting and sketching.",
      "Digital art feels modern, but traditional sketching still hits different."
    ]
  },
  "Historical Books": {
    images: ["book1.png","book2.png","book3.png"],
    texts: [
      "I enjoy exploring timelines and cultures through books.",
      "History allows me to reflect on human progress and mistakes.",
      "It’s a hobby that deepens my perspective."
    ]
  },
  "Gaming": {
    images: ["game1.png","game2.png","game3.png"],
    texts: [
      "Gaming sharpens my reflexes and strategic thinking.",
      "FPS games are my favorite for immersive experiences.",
      "Gaming is also a great way to bond with friends."
    ]
  },
  "Fitness": {
    images: ["fitness1.jpg","fitness2.png","fitness3.jpeg"],
    texts: [
      "Fitness keeps me disciplined and energetic.",
      "Calisthenics builds functional strength and agility.",
      "Consistency in fitness reflects in all areas of life."
    ]
  },
  "Outdoor Adventure": {
    images: ["outdoor1.jpg","outdoor2.jpeg","outdoo3.jpeg","outdoor4.jpeg"],
    texts: [
      "Outdoor and adventure is fun to do at a young age.",
      "Discovering new beautiful places that I can literally see and touch instead of seeing it in my phone.",
      "Meeting new people along the way is one of the best experiences.",
      "Traveling in places with the people I care about is the best way to explore new places."
    ]
  },
  "Roadtrips": {
    images: ["road1.jpg","road2.jpg","road3.jpg"],
    texts: [
      "Roadtrips give me relaxation while on the road.",
      "Being with friends on the road is much more fun than going solo.",
      "Sometimes peace and contentment can be found on a wheel."
    ]
  },
  "Arts": {
    images: ["art1.jpg","art3.jpg","art4.jpg"],
    texts: [
      "Art is something that is limited by imagination.",
      "Whether dark or light art, it gives a lo-fi feeling that makes me relax.",
      "Talent can be anywhere — it’s always in the hands of every person."
    ]
  },
  "Guns": {
    images: ["gun1.jpg","gun2.jpg","gun3.webp"],
    texts: [
      "I dreamed of becoming a soldier once.",
      "Sometimes lost dreams can still be found in different places.",
      "I love guns."
    ]
  }
};

// =========================
// Event Listeners Setup
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const infoPanel = document.getElementById("infoPanel");
  const panelContent = document.getElementById("panelContent");
  const closePanel = document.getElementById("closePanel");
  const cardsContainer = document.querySelector(".cards, .cards2");
  const viewer = document.getElementById("imageViewer");
  const fullImage = document.getElementById("fullImage");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  let isTransitioning = false;

  // Function: Build info panel
  function loadPanelContent(title, data) {
    let html = `<h2>${title}</h2>`;
    data.images.forEach((img, i) => {
      html += `
        <div>
          <img src="${img}" alt="${title} image ${i + 1}">
          <p>${data.texts[i]}</p>
        </div>`;
    });
    panelContent.innerHTML = html;
    enableImageViewer(); // reattach click events to new images
  }

  function openPanel(title, data) {
    loadPanelContent(title, data);
    infoPanel.classList.add("active");
    cardsContainer?.classList.add("shift-left");
  }

  function closePanelSmooth() {
    infoPanel.classList.remove("active");
    cardsContainer?.classList.remove("shift-left");
  }

  // Card click
  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (isTransitioning) return;
      const title = card.querySelector("h3").innerText;
      const data = cardData[title];
      if (data) {
        if (infoPanel.classList.contains("active")) {
          isTransitioning = true;
          closePanelSmooth();
          setTimeout(() => {
            openPanel(title, data);
            isTransitioning = false;
          }, 300);
        } else {
          openPanel(title, data);
        }
      }
    });
  });

  closePanel.addEventListener("click", () => closePanelSmooth());

  // =========================
  // Image Viewer Logic
  // =========================
  function enableImageViewer() {
    const allImgs = document.querySelectorAll(".card img, .info-panel img");
    allImgs.forEach(img => {
      img.addEventListener("click", e => {
        e.preventDefault();
        fullImage.src = img.src;
        fullImage.alt = img.alt || "";
        viewer.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });
  }

  viewer.addEventListener("click", e => {
    if (e.target === viewer) {
      viewer.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && viewer.classList.contains("active")) {
      viewer.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  enableImageViewer();

  // =========================
  // Navigation Toggle
  // =========================
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 760) navLinks.classList.remove("open");
      });
    });
  }
});

//Particles

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