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
  // ABOUT — Typing Animation
  function typeAboutTitle() {
    const text = "Inside AT·OS";
    const target = document.querySelector(".about-title-text");
    if (!target) return;

    target.innerHTML = "";
    let i = 0;

    function typing() {
      if (i < text.length) {
        target.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 45);
      }
    }
    typing();
  }

  ScrollTrigger.create({
    trigger: "#about",
    start: "top 85%",
    once: true,
    onEnter: () => typeAboutTitle()
  });

  // ABOUT — Floating Cards Animation (scroll-triggered entrance)
  gsap.from(".about-card-anim", {
    scrollTrigger: {
      trigger: "#about",
      start: "top 70%",
      toggleActions: "play none none none"
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out"
  });

  // ==========================
  // ABOUT SECTION ANIMATIONS
  // ==========================

  // Typing effect - REMOVED DUPLICATE (already defined above at line 151)
  // Only one typeAboutTitle function should exist
  // Calling the first instance at line 173

  // ==REMOVED DUPLICATE: Floating cards animation handled above==

  // ==========================
  // ABOUT — ORBITAL ANIMATION
  // ==========================

  function setupOrbitalAnimation() {
    const aboutSection = document.getElementById("about");
    const orbitalItems = document.querySelectorAll(".orbit-item");

    if (!aboutSection || orbitalItems.length === 0) return;

    // Base dimensions - adjusted for right-side layout
    const baseRadius = window.innerWidth > 1024 ? 220 : window.innerWidth > 768 ? 140 : window.innerWidth > 480 ? 100 : 80;
    let orbitRadius = baseRadius;

    // Update orbit radius on resize
    const updateOrbitRadius = () => {
      orbitRadius = window.innerWidth > 1024 ? 220 : window.innerWidth > 768 ? 140 : window.innerWidth > 480 ? 110 : 75;
    };
    window.addEventListener("resize", updateOrbitRadius);

    // Position each orbit item in a circle
    orbitalItems.forEach((item, index) => {
      const angle = (index / orbitalItems.length) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * orbitRadius;
      const y = Math.sin(angle) * orbitRadius;

      gsap.set(item, {
        x: x,
        y: y
      });

      // Micro-floating animation (idle motion)
      const floatDuration = 4 + Math.random() * 2;
      const floatDistance = window.innerWidth > 768 ? 4 + Math.random() * 5 : 3 + Math.random() * 3;

      gsap.to(item, {
        x: x + (Math.random() - 0.5) * floatDistance,
        y: y + (Math.random() - 0.5) * floatDistance,
        duration: floatDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Scroll-driven orbital rotation with continuous spin
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 40%",
        end: "bottom 40%",
        scrub: 1.5,
        markers: false
      }
    });

    tl.to(".orbit-container", {
      rotation: 360,
      ease: "none"
    }, 0);

    // Scroll-linked orbit item animations
    gsap.from(orbitalItems, {
      scrollTrigger: {
        trigger: "#about",
        start: "top 75%"
      },
      scale: 0.3,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.out"
    });

    // Optional: Subtle scale and opacity pulse on scroll
    gsap.to(orbitalItems, {
      scrollTrigger: {
        trigger: "#about",
        start: "top 60%",
        end: "bottom 60%",
        scrub: 1
      },
      opacity: 0.6,
      ease: "sine.inOut"
    });
  }

  setupOrbitalAnimation();

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

  gsap.to(scrollText, {
    x: "-25%",
    ease: "none",
    scrollTrigger: {
      trigger: "#scroll-headline",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        if (self.progress >= 1) {
          gsap.set(scrollText, { x: "0%" });
        }
      }
    }
  });
}

// Card animations with GSAP
function setupCardAnimations() {
  const cards = document.querySelectorAll(".about-card");
  
  // Entrance animation on scroll
  gsap.from(cards, {
    scrollTrigger: {
      trigger: "#about",
      start: "top 70%",
      toggleActions: "play none none none"
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
  });

  // Hover animations
  cards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
      // Lift up and glow
      gsap.to(card, {
        y: -15,
        boxShadow: "0 20px 40px rgba(100, 120, 255, 0.3)",
        duration: 0.4,
        ease: "power2.out"
      });

      // Icon pop animation
      const icon = card.querySelector(".card-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1.3,
          rotation: 8,
          duration: 0.4,
          ease: "back.out"
        });
      }

      // Text highlight glow
      const label = card.querySelector(".card-label");
      if (label) {
        gsap.to(label, {
          color: "#7896FF",
          duration: 0.3
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      // Return to normal
      gsap.to(card, {
        y: 0,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        duration: 0.4,
        ease: "power2.out"
      });

      // Reset icon
      const icon = card.querySelector(".card-icon");
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "back.out"
        });
      }

      // Reset label color
      const label = card.querySelector(".card-label");
      if (label) {
        gsap.to(label, {
          color: "#111",
          duration: 0.3
        });
      }
    });

    // Click ripple effect
    card.addEventListener("click", function() {
      const rect = this.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Create ripple element
      const ripple = document.createElement("div");
      ripple.style.position = "absolute";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.width = "10px";
      ripple.style.height = "10px";
      ripple.style.borderRadius = "50%";
      ripple.style.backgroundColor = "rgba(120, 150, 255, 0.6)";
      ripple.style.pointerEvents = "none";
      ripple.style.zIndex = "10";
      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      // Animate ripple
      gsap.to(ripple, {
        width: 400,
        height: 400,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          ripple.remove();
        }
      });
    });
  });
}

// Advanced card gradient animations
function setupCardGradients() {
  const cards = document.querySelectorAll(".about-card");
  
  cards.forEach((card) => {
    // Create internal gradient animation on mouse move
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Subtle light shine effect
      gsap.to(card, {
        "--shine-x": x + "%",
        "--shine-y": y + "%",
        duration: 0.5,
        overwrite: "auto"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        "--shine-x": "50%",
        "--shine-y": "50%",
        duration: 0.5
      });
    });
  });
}

// Call functions
window.addEventListener("load", () => {
  bootAnimation();
  setupNavTriggers();
  setupAnimations();
  setupHeroFX();
  setupInfiniteMarquee();
  setupCardAnimations();
  setupCardGradients();
});
