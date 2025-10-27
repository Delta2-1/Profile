document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const links = navLinks.querySelectorAll("a");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Auto-close menu when clicking a link (on mobile)
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 760) navLinks.classList.remove("open");
    });
  });
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

//new update pdf download function

 document.getElementById("downloadBtn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "Clyne_Jester_Aquino_Resume.pdf";
    link.download = "Clyne_Jester_Aquino_Resume.pdf";
    link.click();
  });
