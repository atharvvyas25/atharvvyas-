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

window.addEventListener("load", () => {
  bootAnimation();
  setupNavTriggers();
  setupAnimations();
  setupHeroFX();
});


// Scroll-driven headline movement
gsap.to(".scroll-text", {
  x: "-100%",
  ease: "none",
  scrollTrigger: {
    trigger: "#scroll-headline",
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  }
});
