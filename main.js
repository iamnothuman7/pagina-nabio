// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('#cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

// Cursor hover effect on interactive elements
const hoverables = document.querySelectorAll('a, button, .service-card');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 4, opacity: 0.5 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, opacity: 1 });
    });
});

// Hero Text Reveal
gsap.from(".reveal-text", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    stagger: 0.2
});

gsap.from(".fade-in", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 1,
    ease: "power2.out",
    stagger: 0.2
});

// Scroll Reveal Animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    const title = section.querySelector('h2.reveal-text');
    if (title) {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }

    const cards = section.querySelectorAll('.service-card');
    if (cards) {
        gsap.from(cards, {
            scrollTrigger: {
                trigger: section,
                start: "top 60%",
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });
    }
});

// Background mesh movement
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 50;
    const yPos = (clientY / window.innerHeight - 0.5) * 50;

    gsap.to(".bg-mesh", {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: "power2.out"
    });
});

// Logo animation on scroll
gsap.to("#nabio-logo", {
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    rotation: 360,
    scale: 0.8
});

// Button pulse animation
gsap.to(".btn-cta", {
    scale: 1.1,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});
