// --- LENIS SMOOTH SCROLL ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothTouch: false,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  normalizeWheel: true,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Connect Lenis to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

// Progress Bar Animation
gsap.to(".progress-bar", {
    scaleX: 1,
    transformOrigin: "left",
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
    }
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// --- CUSTOM CURSOR ---
const cursor = document.getElementById('cursor');
const dot = document.querySelector('.cursor-dot');
const circle = document.querySelector('.cursor-circle');

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1
    });

    gsap.to(circle, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: "power2.out"
    });
});

// Cursor Interactions
const links = document.querySelectorAll('a, button, .bento-item, .magnetic');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(circle, {
            scale: 2,
            borderColor: 'white',
            backgroundColor: 'rgba(255,255,255,0.1)',
            duration: 0.3
        });
        gsap.to(dot, { scale: 0, duration: 0.2 });
    });
    
    link.addEventListener('mouseleave', () => {
        gsap.to(circle, {
            scale: 1,
            borderColor: 'rgba(255,255,255,0.3)',
            backgroundColor: 'transparent',
            duration: 0.3
        });
        gsap.to(dot, { scale: 1, duration: 0.2 });
    });
});

// --- MAGNETIC BUTTONS ---
const magneticObjects = document.querySelectorAll('.magnetic');
magneticObjects.forEach(obj => {
    obj.addEventListener('mousemove', (e) => {
        const bound = obj.getBoundingClientRect();
        const centerX = bound.left + bound.width / 2;
        const centerY = bound.top + bound.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        gsap.to(obj, {
            x: deltaX * 0.3,
            y: deltaY * 0.3,
            duration: 0.5,
            ease: "power2.out"
        });
    });
    
    obj.addEventListener('mouseleave', () => {
        gsap.to(obj, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// --- ENTRANCE ANIMATIONS ---

// Entrance Reveal
gsap.from(".hero__title", {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
    delay: 0.3
});

// Fade Up Animations
const fadeUpElements = document.querySelectorAll('.fade-up');
fadeUpElements.forEach(el => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Bento Items Stagger
gsap.to(".bento-item", {
    scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 80%",
    },
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 1,
    ease: "power3.out"
});

// Header Shrink on Scroll
ScrollTrigger.create({
    start: "top top",
    onUpdate: (self) => {
        if (self.direction === 1) {
            gsap.to(".header", { height: 70, backgroundColor: 'rgba(255, 117, 31, 0.9)', duration: 0.3 });
        } else {
            gsap.to(".header", { height: 90, backgroundColor: 'rgba(255, 117, 31, 0.4)', duration: 0.3 });
        }
    }
});

// Reveal Text Scrubbing (Scroll-driven reveal) - Excluding Hero
const revealTexts = document.querySelectorAll('.reveal-text:not(.hero__title)');
revealTexts.forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: "top 90%",
            end: "top 60%",
            scrub: 1
        },
        opacity: 0,
        x: -50,
        duration: 1
    });
});

// Statement Parallax/Scale
gsap.from(".statement__text", {
    scrollTrigger: {
        trigger: ".statement",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    },
    opacity: 0.3,
    scale: 0.8,
    y: 100
});

console.log("NABIO Premium Engine Loaded.");

// --- COUNTER ANIMATION ---
const stats = document.querySelectorAll('.stat-num');
stats.forEach(stat => {
    const target = +stat.getAttribute('data-val');
    ScrollTrigger.create({
        trigger: stat,
        start: "top 90%",
        onEnter: () => {
            let count = 0;
            const updateCount = () => {
                const speed = target / 50;
                if (count < target) {
                    count += speed;
                    stat.innerText = Math.floor(count);
                    setTimeout(updateCount, 20);
                } else {
                    stat.innerText = target;
                }
            };
            updateCount();
        }
    });
});
