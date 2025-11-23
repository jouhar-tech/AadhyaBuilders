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
const projectsData = [
    {
        title: 'Modern Villa',
        description: 'A luxurious 4BHK villa featuring contemporary design elements, premium finishes, and state-of-the-art amenities. Built with the finest materials and attention to detail.',
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
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
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
            'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
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
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
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
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
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
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
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
            'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
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
    document.getElementById('modalImage').src = project.images[currentSlide];
    
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
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = project.images.length - 1;
    } else if (currentSlide >= project.images.length) {
        currentSlide = 0;
    }
    
    document.getElementById('modalImage').src = project.images[currentSlide];
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