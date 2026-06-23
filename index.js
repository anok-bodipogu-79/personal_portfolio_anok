// ==========================================================================
// 📡 1. Canvas Dynamic Neural Network Node Particle System
// ==========================================================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const maxParticles = 65; // Balanced for premium visuals & battery performance
const connectionDistance = 115; // Max distance for drawing neural connection lines

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const datasetLabels = ["Python", "AI", "ML", "DS", "Flutter"];

// Particle Node Blueprint
class ParticleNode {
    constructor() {
        this.reset();
        // Distribute nodes randomly on initial load
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 80;
        this.size = Math.random() * 3 + 1.5; // Slightly larger for nodes
        this.speedY = -(Math.random() * 0.4 + 0.1); // Float upward slowly
        this.speedX = Math.random() * 0.2 - 0.1; // Gentle side drift
        this.opacity = Math.random() * 0.10 + 0.05;
        this.isText = Math.random() < 0.25; // 25% chance of being a dataset text label
        this.textLabel = datasetLabels[Math.floor(Math.random() * datasetLabels.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Reset if float off top or sides
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
            this.reset();
        }
    }

    draw() {
        if (this.isText) {
            ctx.font = '500 11px monospace';
            ctx.fillStyle = `rgba(250, 204, 21, ${this.opacity * 1.5})`; // Gold text glow
            ctx.fillText(this.textLabel, this.x, this.y);
        } else {
            ctx.beginPath();
            // Purple core with gold glow halo
            ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#8B5CF6';
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow for efficiency
        }
    }
}

// Initialize nodes
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < maxParticles; i++) {
        particlesArray.push(new ParticleNode());
    }
}
initParticles();

// Draw connecting lines between close particles (Neural Connections)
function connectNodes() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            const dist = Math.hypot(particlesArray[a].x - particlesArray[b].x, particlesArray[a].y - particlesArray[b].y);

            if (dist < connectionDistance) {
                // Calculate opacity based on closeness
                const alpha = (1 - (dist / connectionDistance)) * 0.12;
                ctx.strokeStyle = `rgba(250, 204, 21, ${alpha})`; // Golden neural connection paths
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation Loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections first
    connectNodes();

    // Update and draw nodes
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    requestAnimationFrame(animateParticles);
}
animateParticles();


// ==========================================================================
// 🤖 2. Hero typewriter/fade role loops
// ==========================================================================
const typewriterTarget = document.getElementById('typewriter-target');
const rolesList = [
    "Building AI Applications",
    "Developing Machine Learning Models",
    "Creating Full Stack Products"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function handleTypewriter() {
    const currentRole = rolesList[roleIndex];

    if (isDeleting) {
        // Deleting characters
        typewriterTarget.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40; // Deletes faster
    } else {
        // Typing characters
        typewriterTarget.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
    }

    // Checking phase switches
    if (!isDeleting && charIndex === currentRole.length) {
        // End of phrase reached: Pause, then start deleting
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Full deletion complete: move to next word
        isDeleting = false;
        roleIndex = (roleIndex + 1) % rolesList.length;
        typeSpeed = 500; // brief pause before writing next
    }

    setTimeout(handleTypewriter, typeSpeed);
}

// Start Typewriter
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(handleTypewriter, 1000);
});


// ==========================================================================
// 🍔 3. Mobile Navigation Menu Toggle & Sticky Scroll Header
// ==========================================================================
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
const navHeader = document.getElementById('nav-header');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
});

// Close menu when links are clicked
const menuLinks = document.querySelectorAll('.nav-link');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
    });
});

// Scroll Listener for Sticky header effects
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navHeader.classList.add('scrolled');
    } else {
        navHeader.classList.remove('scrolled');
    }
});


// ==========================================================================
// 📍 4. Scroll Spy - Active nav indicators
// ==========================================================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies core viewport
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));


// ==========================================================================
// 🗂️ 5. Project Detail Database Mappings
// ==========================================================================
const projectsData = {
    tracker: {
        title: "Smart Proximity Lost & Found Tracker",
        tech: "Flutter • Node.js • Firebase Firestore • Firebase Cloud Messaging • ESP32 • GPS Module",
        cover: "project1.png",
        description: "A smart Internet of Things (IoT) lost & found system. The solution implements micro-controller tracking hardware connected dynamically to a central cloud server, integrated with visual Flutter mobile maps to pinpoint lost coordinates in real-time.",
        features: [
            "Real-time GPS coordinates tracking & telemetry streaming.",
            "Dynamic geofencing boundaries with automated entry/exit alert triggers.",
            "Contact-owner QR-code recovery tag generation.",
            "Instant background push alerts via Firebase Cloud Messaging."
        ],
        codeLink: "https://github.com/anok-bodipogu-79/Lost-and-Found-Tracker"
    },
    disease: {
        title: "AI Disease Prediction System",
        tech: "Python • Scikit-Learn • Pandas • NumPy • Flask • HTML5",
        cover: "project2.png",
        description: "An advanced machine learning application enabling symptom-based predictive diagnostics. Trained on highly dimensional clinical datasets, this classification suite exposes prediction endpoints through a Python Flask API.",
        features: [
            "Multi-symptom diagnostics engine yielding high classification confidence.",
            "Complete data cleansing, scaling, and feature extraction engineering pipelines.",
            "Comparative model evaluations (Random Forest, SVM, Naive Bayes algorithms).",
            "Preventative healthcare recommendation summaries dynamically returned on output."
        ],
        codeLink: "https://github.com/anok-bodipogu-79/AI-Disease-Prediction"
    },
    savvy: {
        title: "Savvy Script AI",
        tech: "Python • Flask • LangChain • gTTS • HTML5 • CSS3 • JavaScript",
        cover: "project3.png",
        description: "An artificial intelligence content generator pipeline built to assist video editors and copywriters. Using LangChain orchestration structures, the tool translates brief inputs into comprehensive video scripts, audio playbacks, and layouts.",
        features: [
            "AI-powered copy script generation utilizing LLM orchestrators.",
            "Multilingual Text-to-Speech (TTS) syntheses using Google gTTS library layers.",
            "Automated PDF document compilation with styling nodes.",
            "Dynamic asset downloads (Instant audio files and formatted script documents)."
        ],
        codeLink: "https://github.com/anok-bodipogu-79/Savvy-Script-AI"
    }
};


// ==========================================================================
// 🪟 6. Overlay Modals Mechanics (Projects, Skills, and Resume)
// ==========================================================================
const projectModal = document.getElementById('project-modal');
const projectModalContent = document.getElementById('modal-project-content');
const projectCloseBtn = document.getElementById('modal-close-trigger');

const skillModal = document.getElementById('skill-modal');
const skillModalContent = document.getElementById('modal-skill-content');
const skillCloseBtn = document.getElementById('skill-close-trigger');


// Project Modal Openers
document.querySelectorAll('.details-trigger, .view-details-btn').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = trigger.getAttribute('data-project');
        const proj = projectsData[projectId];

        if (proj) {
            projectModalContent.innerHTML = `
                <div class="modal-image-wrapper">
                    <img src="${proj.cover}" alt="${proj.title}" class="modal-img">
                </div>
                <h3 class="modal-title">${proj.title}</h3>
                <div class="modal-subtitle-tech">${proj.tech}</div>
                <p class="modal-description">${proj.description}</p>
                <h4 class="modal-feature-title">Core Feature Suite:</h4>
                <ul class="modal-feature-list">
                    ${proj.features.map(feat => `<li>${feat}</li>`).join('')}
                </ul>
                <div style="margin-top: 30px;">
                    <a href="${proj.codeLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                        View Codebase Repository 💻
                    </a>
                </div>
            `;

            projectModal.classList.add('open');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        }
    });
});

projectCloseBtn.addEventListener('click', () => {
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
});

// Detailed technical capability summaries database
const skillDetails = {
    "python": "Highly skilled in Python scripting, automation, statistical modeling, and data formatting. Developed prediction engines and automated document pipelines with Flask and LangChain.",
    "java": "Experienced in Object-Oriented design patterns, abstract class hierarchies, multi-threading architectures, and dynamic data structures.",
    "c": "Capable in lower-level structural procedures, memory structures, manual addresses, and micro-controller interaction logs (such as ESP32 integrations).",
    "r": "Proficient in statistics programming, linear regression modelling, data aggregation steps, and exploratory data diagrams.",
    "html": "Advanced structured semantic configurations. Optimized markup hierarchy for clean readability and web accessibility coordinates.",
    "css": "Expert in styling variables, grid/flex formats, backdrop filters, responsive breakpoints, keyframe transforms, and web page layout mechanics.",
    "javascript": "Proficient in async request handlers, browser document mappings, dynamic DOM nodes, local storage tokens, and interactive event triggers.",
    "react": "Skilled in component design architecture, functional components, state hooks, properties mapping, and visual UI layouts.",
    "express": "Experienced in server setups, endpoint routings, REST API definitions, and securing requests via express middleware functions.",
    "node": "Proficient in server execution threads, backend routing paths, filesystem read-writes, and managing npm libraries.",
    "flutter": "Main framework for constructing high-performance, single-codebase native mobile apps for Android & iOS. Built UI interfaces with geofence widgets and real-time maps.",
    "firebase": "Experienced in configuring Firestore collection collections, FCM push indicators, authentication loops, and backend hosting triggers.",
    "mongodb": "Capable of structuring document collections, query aggregations, sorting parameters, and hosting databases on Mongo Atlas.",
    "sql": "Proficient in structural schemas, tables mapping, queries, join requests, triggers, and indices parameters.",
    "firestore": "Integrated real-time database collection configurations with active Flutter platforms, enabling sub-second synchronization states.",
    "ml": "Developed classifiers using Random Forest, Support Vector Machines, and regression paths. Implemented validation scoring and grid searches.",
    "langchain": "Orchestrated advanced prompt flows, agent chains, document embedding parsers, and custom chat assistants linking to generative LLMs.",
    "dataanalysis": "Expert in parsing CSV datasets, cleansing missing coordinates, plotting statistical correlations, and applying feature scalers using Pandas.",
    "modeldevelopment": "Formulating pipelines from dataset processing, exploratory plotting, target classifications, metrics evaluation, to API model deployments.",
    "git": "Version control versioning tracks and code merges using standard CLI terminal branches.",
    "github": "Configured repository paths, branch pipelines, pull requests validation, and GitHub actions workflow trackers.",
    "vscode": "Primary development editor environment configured with debugger integrations, syntax checks, and automated code highlights.",
};

// Skill Card Modal Openers
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
        const techClass = card.getAttribute('data-tech') || "";
        const nameEl = card.querySelector('.skill-name');
        const techName = nameEl ? nameEl.innerText.trim() : "";
        const iconEl = card.querySelector('.skill-icon-container');
        const iconText = iconEl ? iconEl.innerText.trim() : "🤖";
        const techDesc = skillDetails[techClass] || "Experience in configuring and developing solutions with this technology.";

        skillModalContent.innerHTML = `
            <div class="focus-icon-wrap bg-glow-yellow" style="margin-bottom: 20px; font-size: 2.5rem; width: 64px; height: 64px;">
                ${iconText}
            </div>
            <h3 class="modal-skill-title">${techName}</h3>
            <div class="modal-subtitle-tech">Technical Capability</div>
            <p class="modal-skill-desc">${techDesc}</p>
            <div style="margin-top: 30px; display:flex; gap:10px;">
                <span class="timeline-badge-date" style="margin-bottom:0;">Verified Competency</span>
                <span class="timeline-badge-date" style="margin-bottom:0; text-transform: uppercase;">${techClass}</span>
            </div>
        `;

        skillModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

skillCloseBtn.addEventListener('click', () => {
    skillModal.classList.remove('open');
    document.body.style.overflow = '';
});


// Close modals when clicking outside card boundary
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('open');
        document.body.style.overflow = '';
    }
    if (e.target === skillModal) {
        skillModal.classList.remove('open');
        document.body.style.overflow = '';
    }

});


// ==========================================================================
// ✉️ 7. Contact form Validation & Submission Feedback handlers
// ==========================================================================
const contactForm = document.getElementById('connection-form');
const submitBtn = document.getElementById('btn-submit-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Read input fields
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const message = document.getElementById('form-message').value;

        if (name && email && message) {
            // Change button state to sending feedback
            submitBtn.innerHTML = `Sending Message... ✉️`;
            submitBtn.disabled = true;

            // Construct mailto link
            const subject = encodeURIComponent(`Message from ${name} (via Portfolio)`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoUrl = `mailto:bodipoguanok1006@gmail.com?subject=${subject}&body=${body}`;

            // Simulate brief network latency before opening client
            setTimeout(() => {
                submitBtn.innerHTML = `Message Sent! ✅`;
                submitBtn.style.backgroundColor = '#22c55e'; // Green
                submitBtn.style.color = '#ffffff';

                // Redirect browser to construct standard mail client window
                window.location.href = mailtoUrl;

                // Pop up overlay thanking the user
                alert(`Thank you, ${name}! Your message client has been opened to send this to Bodipogu Anok.`);

                // Reset form elements
                contactForm.reset();

                // Re-enable button after cooldown
                setTimeout(() => {
                    submitBtn.innerHTML = `Send Message`;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);

            }, 1000);
        }
    });
}

// ==========================================================================
// 🎓 8. Journey Timeline Scroll Animations
// ==========================================================================
const timelineContainer = document.querySelector('.vertical-timeline-container');
const timelineLine = document.querySelector('.v-timeline-line');
const timelineItems = document.querySelectorAll('.v-timeline-item');

if (timelineContainer) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Grow connecting line
                if (timelineLine) {
                    timelineLine.classList.add('active');
                }
                // Stagger reveal cards
                timelineItems.forEach(item => {
                    item.classList.add('reveal-active');
                });
                // Once triggered, stop observing
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15 // Trigger when 15% of the container is visible
    });

    timelineObserver.observe(timelineContainer);
}
