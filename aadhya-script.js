// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll with Active Link Highlighting
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Stats Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (stat.textContent === '0') {
                    animateCounter(stat);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.why-choose-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Project Modal Functionality
function renderMedia(project, index) {
    const container = document.getElementById('modalMediaContainer');
    container.innerHTML = '';

    // Images first
    if (index < project.images.length) {
        container.innerHTML = `
            <img src="${project.images[index]}" alt="Project Image">
        `;
    } else {
        const videoIndex = index - project.images.length;
        container.innerHTML = `
            <video controls autoplay muted playsinline>
                <source src="${project.videos[videoIndex]}" type="video/mp4">
            </video>
        `;
    }
}

const projectsData = [
    {
        title: 'Modern Villa',
        description: 'A luxurious 4BHK villa featuring contemporary design elements, premium finishes, and state-of-the-art amenities. Built with the finest materials and attention to detail.',
        images: [
            'images/house1.jpg',
            'images/house11.jpg',
            'images/house111.jpg'
        ],
        videos: [
        'https://res.cloudinary.com/dwyvvjcqb/video/upload/v1765712657/Video_Project_2_1_s1mr6i.mp4'
        ],
        details: {
            'Area': '3500 sq.ft',
            'Bedrooms': '4',
            'Bathrooms': '4',
            'Completion': '2024'
        }
    },
    {
        title: 'Contemporary House',
        description: 'A beautifully designed 3BHK modern home that perfectly balances aesthetics and functionality. Features include spacious rooms, natural lighting, and elegant interiors.',
        images: [
            'images/house2.jpg',
            'images/house22.jpg',
            
        ],
        videos: [
        'https://res.cloudinary.com/dwyvvjcqb/video/upload/v1765707134/house222_a2f0da.mp4'
        ],
        details: {
            'Area': '2800 sq.ft',
            'Bedrooms': '3',
            'Bathrooms': '3',
            'Completion': '2024'
        }
    },
    {
        title: 'Traditional Home',
        description: 'Classic 5BHK residence combining traditional architectural elements with modern conveniences. Perfect for large families seeking comfort and style.',
        images: [
            'images/house3.jpg',
            'images/house33.jpg'
        ],
        videos: [
        'https://res.cloudinary.com/dwyvvjcqb/video/upload/v1765710151/house555_vxrg2k.mp4'
        ],
        details: {
            'Area': '4200 sq.ft',
            'Bedrooms': '5',
            'Bathrooms': '5',
            'Completion': '2023'
        }
    },
    {
        title: 'Minimalist Design',
        description: 'A compact yet efficient 2BHK home embracing minimalist design philosophy. Clean lines, optimal space utilization, and modern amenities.',
        images: [
            'images/house6.jpg',
            'images/house66.jpg'
        ],
        details: {
            'Area': '1800 sq.ft',
            'Bedrooms': '2',
            'Bathrooms': '2',
            'Completion': '2024'
        }
    },
    {
        title: 'Duplex Villa',
        description: 'Spectacular 6BHK luxury duplex villa with panoramic views. Features include home theater, gym, swimming pool, and landscaped gardens.',
        images: [
            'images/house5.jpg',
            'images/house55.jpg'
        ],
        details: {
            'Area': '5500 sq.ft',
            'Bedrooms': '6',
            'Bathrooms': '6',
            'Completion': '2023'
        }
    },
    {
        title: 'Eco-Friendly Home',
        description: 'Sustainable 3BHK home designed with eco-friendly materials and energy-efficient systems. Features rainwater harvesting, solar panels, and natural ventilation.',
        images: [
            'images/house4.jpg',
            'images/house5.jpg',
            'images/house55.jpg'
        ],
        details: {
            'Area': '2600 sq.ft',
            'Bedrooms': '3',
            'Bathrooms': '3',
            'Completion': '2024'
        }
    }
];

let currentProject = 0;
let currentSlide = 0;

function openProjectModal(projectIndex) {
    currentProject = projectIndex;
    currentSlide = 0;
    const project = projectsData[projectIndex];
    const modal = document.getElementById('projectModal');
    
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    renderMedia(project, currentSlide);
    
    const detailsHtml = Object.entries(project.details)
        .map(([key, value]) => `<div><strong>${key}:</strong> ${value}</div>`)
        .join('');
    document.getElementById('modalDetails').innerHTML = detailsHtml;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeSlide(direction) {
    const project = projectsData[currentProject];
    const totalSlides =
        project.images.length + (project.videos ? project.videos.length : 0);

    currentSlide += direction;

    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;

    renderMedia(project, currentSlide);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeProjectModal();
    }
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonialTrack = document.getElementById('testimonialTrack');
const totalTestimonials = document.querySelectorAll('.testimonial-card').length;

function moveTestimonial(direction) {
    currentTestimonial += direction;
    
    if (currentTestimonial < 0) {
        currentTestimonial = totalTestimonials - 1;
    } else if (currentTestimonial >= totalTestimonials) {
        currentTestimonial = 0;
    }
    
    const offset = -currentTestimonial * 100;
    testimonialTrack.style.transform = `translateX(${offset}%)`;
}

// Auto-play testimonials
setInterval(() => {
    moveTestimonial(1);
}, 5000);

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    setTimeout(() => {
        formMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
        formMessage.className = 'form-message success';
        contactForm.reset();
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1000);
});

// Scroll Animations for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
const animatedElements = document.querySelectorAll('.service-card, .project-card, .timeline-item, .testimonial-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});