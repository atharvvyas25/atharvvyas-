// cursor blob follow
const blob = document.getElementById("cursor-blob");

window.addEventListener("pointermove", (e) => {
  const { clientX, clientY } = e;
  gsap.to(blob, {
    x: clientX,
    y: clientY,
    duration: 0.7,
    ease: "expo.out"
  });
});

// smooth scroll
function scrollToTarget(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({
    top: y,
    behavior: "smooth"
  });
}

function setupNavTriggers() {
  const triggers = document.querySelectorAll("[data-target]");
  triggers.forEach((el) => {
    el.addEventListener("click", () => {
      const tgt = el.getAttribute("data-target");
      scrollToTarget(tgt);
    });
  });
}

// boot animation
function bootAnimation() {
  const boot = document.getElementById("boot-screen");
  const bar = document.querySelector(".boot-bar");

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(boot, {
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.inOut"
      });
    }
  });

  tl.fromTo(
    bar,
    { scaleX: 0.1 },
    { scaleX: 1, duration: 1.4, ease: "power2.out" }
  ).from(
    ".boot-text span",
    {
      opacity: 0,
      y: 10,
      stagger: 0.15,
      duration: 0.5,
      ease: "power2.out"
    },
    "<"
  );
}

// desktop + sections + hero animations
function setupAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // HERO intro timeline
  const tl = gsap.timeline({ delay: 1.1 });

  tl.from(".hero-eyebrow", {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: "power3.out"
  })
    .from(
      ".hero-hi",
      { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" },
      "-=0.2"
    )
    .from(
      ".hero-name",
      { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" },
      "-=0.4"
    )
    .from(
      ".hero-role",
      { y: 24, opacity: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .from(
      ".hero-buttons .primary-btn, .hero-buttons .ghost-btn",
      {
        y: 18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out"
      },
      "-=0.2"
    )
    .from(
      ".hero-scene",
      { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" },
      "-=0.6"
    );

  // sections reveal
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (section.id === "hero") return;

    const header = section.querySelector(".section-header");
    const body = section.querySelector(".section-body");

    if (header) {
      gsap.from(header, {
        scrollTrigger: {
          trigger: section,
          start: "top 75%"
        },
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      });
    }

    if (body) {
      gsap.from(body.children, {
        scrollTrigger: {
          trigger: section,
          start: "top 70%"
        },
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out"
      });
    }
  });

  // ABOUT SECTION - Clean Animation
  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    // Label animation with scroll scrub
    gsap.fromTo(".about-label", 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          end: "top 50%",
          scrub: 1
        }
      }
    );

    // Normal words animation - slide up + fade
    gsap.fromTo(".headline-line span:not(.highlight)", 
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          end: "top 45%",
          scrub: 1.5
        }
      }
    );

    // Highlight words animation - scale + color emphasis
    gsap.fromTo(".headline-line .highlight", 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95,
        color: "#999"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        color: "#7896FF",
        stagger: 0.05,
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
          end: "top 40%",
          scrub: 2
        }
      }
    );

    // Description animation
    gsap.fromTo(".about-description", 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: "#about",
          start: "top 60%",
          end: "top 35%",
          scrub: 1
        }
      }
    );

    // Tagline animation
    gsap.fromTo(".about-tagline", 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: "#about",
          start: "top 55%",
          end: "top 30%",
          scrub: 1
        }
      }
    );

    // Background gradient animation - minimal vertical drift
    gsap.to(".about-bg-gradient", {
      y: 50,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // project hover lift
  const projects = document.querySelectorAll(".project");
  projects.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { y: -4, duration: 0.15, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { y: 0, duration: 0.15, ease: "power2.out" });
    });
  });

  // hero photo float
  gsap.to(".hero-photo-foreground", {
    y: -18,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  // collage subtle float
  gsap.to(".hero-collage", {
    y: 10,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

// particles + parallax
function setupHeroFX() {
  const container = document.getElementById("hero-particles");
  if (container) {
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      container.appendChild(p);

      gsap.to(p, {
        x: () => Math.random() * 20 - 10,
        y: () => Math.random() * 20 - 10,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }

  // parallax on mouse move
  const scene = document.querySelector(".hero-scene");
  if (!scene) return;

  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    gsap.to(".hero-photo-foreground", {
      x: -x,
      y: -y,
      duration: 1.2,
      ease: "power2.out"
    });

    gsap.to(".hero-photo-bg", {
      x: -x * 0.5,
      y: -y * 0.5,
      duration: 1.4,
      ease: "power2.out"
    });

    gsap.to(".hero-collage", {
      x: x * 0.4,
      y: y * 0.4,
      duration: 1.4,
      ease: "power2.out"
    });
  });
}

// Scroll-driven infinite marquee
function setupInfiniteMarquee() {
  gsap.registerPlugin(ScrollTrigger);
  
  const scrollText = document.querySelector(".scroll-text");
  if (!scrollText) return;
  
  // Create infinite scroll animation
  gsap.to(scrollText, {
    x: "-25%", // Move by 25% since we have 4 repetitions
    ease: "none",
    scrollTrigger: {
      trigger: "#scroll-headline",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        // Reset position when it reaches the end to create infinite loop
        const progress = self.progress;
        if (progress >= 1) {
          gsap.set(scrollText, { x: "0%" });
        }
      }
    }
  });
}

window.addEventListener("load", () => {
  bootAnimation();
  setupNavTriggers();
  setupAnimations();
  setupHeroFX();
  setupInfiniteMarquee();
});