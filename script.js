// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.toggle('active');
        });
    });
}

// ===== PROJECT FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// ===== PROJECT DETAILS MODAL =====
function createProjectModal() {
    const modal = document.createElement('div');
    modal.id = 'projectModal';
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-header">
                <h2 id="modalTitle">Project Title</h2>
            </div>
            <div class="modal-body">
                <img id="modalImage" src="" alt="Project Image">
                <div class="modal-details">
                    <p id="modalDescription">Project description will appear here.</p>
                    <div class="project-specs">
                        <div class="spec-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span id="modalLocation">Location</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-calendar"></i>
                            <span id="modalDate">Completion Date</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-home"></i>
                            <span id="modalCategory">Category</span>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <a href="contact.html" class="btn btn-primary">
                            <i class="fas fa-phone"></i> Get Similar Quote
                        </a>
                        <a href="https://wa.me/918077488891" class="btn btn-whatsapp" target="_blank">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Project data
const projectData = {
    'Modern Villa Construction': {
        description: 'A stunning 3BHK luxury villa featuring modern architecture, premium finishes, and state-of-the-art amenities. This project showcases our expertise in contemporary residential construction with attention to every detail.',
        location: 'Rajpur Road, Dehradun',
        date: 'Completed: December 2023',
        category: 'Residential Construction'
    },
    'Complete Home Renovation': {
        description: 'Complete transformation of a 20-year-old house into a modern living space. Included kitchen renovation, bathroom upgrades, flooring replacement, and interior redesign while maintaining structural integrity.',
        location: 'Clement Town, Dehradun',
        date: 'Completed: October 2023',
        category: 'Home Renovation'
    },
    'Family Home Construction': {
        description: 'Beautiful 4BHK family home designed for comfort and functionality. Features include spacious rooms, modern kitchen, multiple bathrooms, and a beautiful garden area. Built with earthquake-resistant technology.',
        location: 'Sahastradhara Road, Dehradun',
        date: 'Completed: August 2022',
        category: 'Residential Construction'
    },
    'Luxury Interior Design': {
        description: 'Contemporary interior design project featuring premium materials, custom furniture, and modern lighting solutions. Created elegant living spaces that blend comfort with sophisticated aesthetics.',
        location: 'Mussoorie Road, Dehradun',
        date: 'Completed: September 2023',
        category: 'Interior Design'
    },
    'Duplex House Construction': {
        description: 'Spacious 5BHK duplex home with modern amenities and premium finishes. Features include multiple balconies, modular kitchen, luxury bathrooms, and ample parking space.',
        location: 'Prem Nagar, Dehradun',
        date: 'Completed: June 2022',
        category: 'Residential Construction'
    },
    'Master Bathroom Renovation': {
        description: 'Complete luxury bathroom makeover with premium tiles, modern fixtures, and spa-like amenities. Transformed an ordinary bathroom into a relaxing retreat with contemporary design elements.',
        location: 'Ballupur, Dehradun',
        date: 'Completed: November 2023',
        category: 'Bathroom Renovation'
    }
};

// Initialize project modal functionality
function initializeProjectModal() {
    const modal = createProjectModal();
    const closeBtn = modal.querySelector('.modal-close');
    
    // Close modal events
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Add click events to all "View Details" buttons
    document.querySelectorAll('.view-project').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const projectCard = button.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const projectImage = projectCard.querySelector('img').src;
            const data = projectData[projectTitle];
            
            if (data) {
                // Populate modal with project data
                document.getElementById('modalTitle').textContent = projectTitle;
                document.getElementById('modalImage').src = projectImage;
                document.getElementById('modalDescription').textContent = data.description;
                document.getElementById('modalLocation').textContent = data.location;
                document.getElementById('modalDate').textContent = data.date;
                document.getElementById('modalCategory').textContent = data.category;
                
                // Show modal
                modal.style.display = 'block';
            }
        });
    });
}

// ===== FEEDBACK API SYSTEM =====
const FEEDBACK_API_URL = './feedback-api.php';
const FEEDBACK_JSON_URL = './feedbacks.json';

// Default feedbacks as fallback
const DEFAULT_FEEDBACKS = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543210',
        project: 'residential',
        rating: 5,
        feedback: 'Mountains Contractor built our dream home exactly as we envisioned. Murtuja sir and his team were professional, punctual, and the quality of work was exceptional. Highly recommended!',
        location: 'Rajpur Road',
        date: '2024-01-15'
    },
    {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543211',
        project: 'renovation',
        rating: 5,
        feedback: 'Excellent renovation work! They transformed our old house into a modern home. The attention to detail and commitment to quality is outstanding. Worth every penny!',
        location: 'Clement Town',
        date: '2024-02-10'
    },
    {
        id: 3,
        name: 'Amit Verma',
        email: 'amit@example.com',
        phone: '9876543212',
        project: 'residential',
        rating: 5,
        feedback: 'Very professional and reliable contractor. Completed our project on time and within budget. Murtuja sir personally supervised the work. Thank you Mountains Contractor!',
        location: 'Mussoorie Road',
        date: '2024-02-25'
    },
    {
        id: 4,
        name: 'Sunita Devi',
        email: 'sunita@example.com',
        phone: '9876543213',
        project: 'interior',
        rating: 4,
        feedback: 'Amazing interior design work! They understood our requirements perfectly and delivered beyond expectations. The team is very skilled and professional.',
        location: 'Sahastradhara Road',
        date: '2024-03-05'
    }
];

// Fetch feedbacks from API/JSON with fallback
async function fetchFeedbacks() {
    try {
        // Try JSON file first (works on GitHub Pages)
        let response = await fetch(FEEDBACK_JSON_URL);
        if (response.ok) {
            const feedbacks = await response.json();
            console.log('Fetched feedbacks from JSON:', feedbacks.length, 'items');
            return feedbacks || DEFAULT_FEEDBACKS;
        }
        
        // Try API if JSON fails
        response = await fetch(FEEDBACK_API_URL);
        if (response.ok) {
            const feedbacks = await response.json();
            console.log('Fetched feedbacks from API:', feedbacks.length, 'items');
            return feedbacks || DEFAULT_FEEDBACKS;
        }
        
        throw new Error('Both API and JSON failed');
    } catch (error) {
        console.log('Using default feedbacks due to error:', error.message);
        return DEFAULT_FEEDBACKS;
    }
}

// Submit new feedback to API
async function submitFeedbackToAPI(feedbackData) {
    try {
        const response = await fetch(FEEDBACK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData)
        });
        
        const result = await response.json();
        console.log('Feedback submission result:', result);
        return result.success;
    } catch (error) {
        console.error('Error submitting feedback:', error);
        // Fallback to localStorage if API fails
        saveFeedbackToLocalStorage(feedbackData);
        return true;
    }
}

// Fallback localStorage save
function saveFeedbackToLocalStorage(feedbackData) {
    const feedbacks = JSON.parse(localStorage.getItem('mountainsContractorFeedbacks') || '[]');
    const newFeedback = {
        id: Date.now(),
        ...feedbackData,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        location: 'Dehradun'
    };
    feedbacks.push(newFeedback);
    localStorage.setItem('mountainsContractorFeedbacks', JSON.stringify(feedbacks));
    console.log('Feedback saved to localStorage as fallback');
}

// Load and display feedbacks
async function loadFeedbacks() {
    const container = document.getElementById('testimonials-grid');
    
    if (container) {
        container.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">Loading feedbacks...</p>';
        
        const feedbacks = await fetchFeedbacks();
        console.log('Loading feedbacks:', feedbacks.length, 'feedbacks found');
        
        container.innerHTML = '';
        
        // Sort by date (newest first)
        feedbacks.sort((a, b) => new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp));
        
        feedbacks.forEach(feedback => {
            const testimonialCard = createTestimonialCard(feedback);
            container.appendChild(testimonialCard);
        });
        
        console.log('Loaded', feedbacks.length, 'testimonials successfully');
    } else {
        console.log('Testimonials container not found');
    }
}

// Create testimonial card HTML
function createTestimonialCard(feedback) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    const stars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
    
    card.innerHTML = `
        <div class="testimonial-rating">
            ${Array(feedback.rating).fill('<i class="fas fa-star"></i>').join('')}
            ${Array(5 - feedback.rating).fill('<i class="far fa-star"></i>').join('')}
        </div>
        <p class="testimonial-text">"${feedback.feedback}"</p>
        <div class="testimonial-author">
            <div class="author-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="author-info">
                <h4>${feedback.name}</h4>
                <p>Homeowner, ${feedback.location || 'Dehradun'}</p>
                <small style="color: #999; font-size: 0.8rem;">${new Date(feedback.date).toLocaleDateString('en-IN')}</small>
            </div>
        </div>
    `;
    
    return card;
}

// Save new feedback
async function saveFeedback(feedbackData) {
    console.log('Saving feedback:', feedbackData);
    
    const success = await submitFeedbackToAPI(feedbackData);
    
    if (success) {
        console.log('Feedback saved successfully');
        // Reload feedbacks to show new one
        setTimeout(() => {
            loadFeedbacks();
            loadHomeTestimonials();
        }, 1000);
        return true;
    } else {
        console.error('Failed to save feedback');
        return false;
    }
}

// ===== FEEDBACK FORM SUBMISSION =====
const feedbackForm = document.getElementById('feedbackForm');
const feedbackMessage = document.getElementById('formMessage');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(feedbackForm);
        const data = Object.fromEntries(formData);
        
        console.log('Form data collected:', data);
        
        // Validate required fields
        if (!data.name || !data.email || !data.rating || !data.feedback) {
            feedbackMessage.textContent = 'Please fill all required fields including rating!';
            feedbackMessage.className = 'form-message error';
            feedbackMessage.style.display = 'block';
            return;
        }

        // Show submitting message
        feedbackMessage.textContent = '⏳ Submitting your feedback...';
        feedbackMessage.className = 'form-message';
        feedbackMessage.style.display = 'block';
        feedbackMessage.style.background = '#e3f2fd';
        feedbackMessage.style.color = '#1976d2';

        // Save feedback to API
        const success = await saveFeedback(data);

        if (success) {
            // Show success message
            feedbackMessage.textContent = '✅ Thank you! Your feedback has been published and is now visible to all visitors.';
            feedbackMessage.className = 'form-message success';
            feedbackMessage.style.background = '#d4edda';
            feedbackMessage.style.color = '#155724';

            // Reset form
            feedbackForm.reset();
            
            // Reset rating stars and display
            document.querySelectorAll('.rating-input input').forEach(input => {
                input.checked = false;
            });
            document.querySelectorAll('.rating-input label').forEach(label => {
                label.style.color = '#ddd';
                label.classList.remove('selected');
            });
            
            const ratingDisplay = document.getElementById('ratingDisplay');
            if (ratingDisplay) {
                ratingDisplay.textContent = 'Click on stars to rate our service';
                ratingDisplay.style.color = '#666';
                ratingDisplay.style.fontWeight = 'normal';
            }

            // Scroll to testimonials to show the new feedback
            setTimeout(() => {
                const testimonialsGrid = document.getElementById('testimonials-grid');
                if (testimonialsGrid) {
                    testimonialsGrid.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }, 2000);
        } else {
            feedbackMessage.textContent = '❌ Failed to submit feedback. Please try again.';
            feedbackMessage.className = 'form-message error';
            feedbackMessage.style.background = '#f8d7da';
            feedbackMessage.style.color = '#721c24';
        }

        // Hide message after 8 seconds
        setTimeout(() => {
            feedbackMessage.style.display = 'none';
        }, 8000);

        console.log('Feedback submission completed');
    });
}

// Load testimonials for home page (show only latest 3)
async function loadHomeTestimonials() {
    const container = document.getElementById('home-testimonials');
    
    if (container) {
        container.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">Loading testimonials...</p>';
        
        const feedbacks = await fetchFeedbacks();
        console.log('Loading home testimonials:', feedbacks.length, 'total feedbacks');
        
        container.innerHTML = '';
        
        // Sort by date and get latest 3
        const latestFeedbacks = feedbacks
            .sort((a, b) => new Date(b.date || b.timestamp) - new Date(a.date || a.timestamp))
            .slice(0, 3);
        
        console.log('Showing', latestFeedbacks.length, 'testimonials on home page');
        
        latestFeedbacks.forEach(feedback => {
            const testimonialCard = createTestimonialCard(feedback);
            container.appendChild(testimonialCard);
        });
    } else {
        console.log('Home testimonials container not found');
    }
}

// ===== INTERACTIVE STAR RATING =====
function initializeStarRating() {
    const ratingInputs = document.querySelectorAll('.rating-input');
    
    ratingInputs.forEach(ratingContainer => {
        const stars = ratingContainer.querySelectorAll('label');
        const inputs = ratingContainer.querySelectorAll('input[type="radio"]');
        
        stars.forEach((star, index) => {
            // Mouse hover effect
            star.addEventListener('mouseenter', () => {
                highlightStars(stars, index);
            });
            
            // Click to select rating
            star.addEventListener('click', () => {
                const ratingValue = 5 - index; // Since stars are in reverse order
                inputs[index].checked = true;
                highlightStars(stars, index);
                
                // Add selected class for permanent highlighting
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('selected');
                    } else {
                        s.classList.remove('selected');
                    }
                });
            });
        });
        
        // Reset on mouse leave
        ratingContainer.addEventListener('mouseleave', () => {
            resetStarHighlight(stars);
            // Keep selected stars highlighted
            const checkedInput = ratingContainer.querySelector('input[type="radio"]:checked');
            if (checkedInput) {
                const checkedIndex = Array.from(inputs).indexOf(checkedInput);
                highlightStars(stars, checkedIndex);
            }
        });
    });
}

function highlightStars(stars, upToIndex) {
    stars.forEach((star, index) => {
        if (index <= upToIndex) {
            star.style.color = '#ffc107';
        } else {
            star.style.color = '#ddd';
        }
    });
    
    // Update rating display text
    const ratingValue = 5 - upToIndex;
    const ratingDisplay = document.getElementById('ratingDisplay');
    if (ratingDisplay) {
        const ratingTexts = {
            5: '⭐⭐⭐⭐⭐ Excellent!',
            4: '⭐⭐⭐⭐ Very Good!',
            3: '⭐⭐⭐ Good!',
            2: '⭐⭐ Fair',
            1: '⭐ Poor'
        };
        ratingDisplay.textContent = ratingTexts[ratingValue] || 'Click on stars to rate our service';
        ratingDisplay.style.color = '#ffc107';
        ratingDisplay.style.fontWeight = 'bold';
    }
}

function resetStarHighlight(stars) {
    stars.forEach(star => {
        if (!star.classList.contains('selected')) {
            star.style.color = '#ddd';
        }
    });
}

// Initialize feedbacks when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load feedbacks from API
    loadFeedbacks();
    loadHomeTestimonials();
    
    // Initialize project modal if on projects page
    if (document.querySelector('.project-card')) {
        initializeProjectModal();
    }
    
    // Fallback: Load defaults after 3 seconds if nothing loaded
    setTimeout(() => {
        const feedbackContainer = document.getElementById('testimonials-grid');
        const homeContainer = document.getElementById('home-testimonials');
        
        if (feedbackContainer && feedbackContainer.children.length === 0) {
            console.log('Loading default feedbacks as fallback...');
            forceLoadDefaults();
        }
        
        if (homeContainer && homeContainer.children.length === 0) {
            console.log('Loading default home testimonials as fallback...');
            forceLoadDefaults();
        }
    }, 3000);
    
    // Initialize star rating after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializeStarRating();
    }, 100);
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
const contactMessage = document.getElementById('contactFormMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Send notification to admin via WhatsApp and Email
        sendAdminNotification(data);

        // Show success message
        contactMessage.textContent = 'Thank you for contacting us! We will get back to you within 24 hours.';
        contactMessage.className = 'form-message success';
        contactMessage.style.display = 'block';

        // Reset form
        contactForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            contactMessage.style.display = 'none';
        }, 5000);

        console.log('Contact form submitted:', data);
    });
}

// ===== ADMIN NOTIFICATION SYSTEM =====
function sendAdminNotification(clientData) {
    // Admin contact details
    const adminWhatsApp = '918077488891';
    const adminEmail = 'ansariakbar56748@gmail.com';
    
    // Format client information
    const clientInfo = `
🏗️ *NEW CLIENT INQUIRY - Mountains Contractor*

👤 *Client Details:*
Name: ${clientData.fullname}
Email: ${clientData.email}
Phone: ${clientData.phone}

🔧 *Service Required:* ${getServiceName(clientData.service)}
💰 *Budget:* ${getBudgetRange(clientData.budget)}
📍 *Location:* ${clientData.location || 'Not specified'}

📝 *Project Details:*
${clientData.message}

⏰ *Inquiry Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

---
Please contact the client within 24 hours for best conversion rate.
    `.trim();

    // Send WhatsApp notification
    sendWhatsAppNotification(adminWhatsApp, clientInfo);
    
    // Send Email notification
    sendEmailNotification(adminEmail, clientData, clientInfo);
}

function sendWhatsAppNotification(phoneNumber, message) {
    // Create WhatsApp URL with pre-filled message
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab (admin will need to send manually)
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1000);
}

function sendEmailNotification(email, clientData, formattedMessage) {
    // Create email subject and body
    const subject = `🚨 New Client Inquiry - ${clientData.fullname} - Mountains Contractor`;
    const body = formattedMessage.replace(/\*/g, '').replace(/\n/g, '%0D%0A');
    
    // Create mailto URL
    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    setTimeout(() => {
        window.location.href = mailtoURL;
    }, 2000);
}

function getServiceName(serviceValue) {
    const services = {
        'new-construction': 'New Construction',
        'renovation': 'Home Renovation',
        'interior': 'Interior Design',
        'repair': 'Repair & Maintenance',
        'consultation': 'Consultation',
        'other': 'Other'
    };
    return services[serviceValue] || 'Not specified';
}

function getBudgetRange(budgetValue) {
    const budgets = {
        'under-5': 'Under 5 Lakhs',
        '5-10': '5-10 Lakhs',
        '10-20': '10-20 Lakhs',
        '20-50': '20-50 Lakhs',
        'above-50': 'Above 50 Lakhs'
    };
    return budgets[budgetValue] || 'Not specified';
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .feature-box, .project-card, .testimonial-card, .value-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== STATS COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Animate stats when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                statNumber.classList.add('animated');
                animateCounter(statNumber, number);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(stat => {
    statsObserver.observe(stat);
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        navbar.style.padding = '1rem 0';
    }
});

// ===== FORM VALIDATION =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/\D/g, ''));
}

// Add real-time validation to forms
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
});

// ===== DIRECT WHATSAPP CONTACT =====
function sendDirectWhatsApp() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Check if required fields are filled
    if (!data.fullname || !data.phone || !data.message) {
        alert('कृपया नाम, फोन नंबर और प्रोजेक्ट डिटेल्स भरें।\nPlease fill Name, Phone Number and Project Details.');
        return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = `
🏗️ *Mountains Contractor - New Inquiry*

👤 *Name:* ${data.fullname}
📞 *Phone:* ${data.phone}
📧 *Email:* ${data.email || 'Not provided'}
🔧 *Service:* ${getServiceName(data.service)}
💰 *Budget:* ${getBudgetRange(data.budget)}
📍 *Location:* ${data.location || 'Not specified'}

📝 *Project Details:*
${data.message}

---
Sent directly from website contact form
    `.trim();
    
    // Open WhatsApp with pre-filled message
    const whatsappURL = `https://wa.me/918077488891?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
    
    // Show success message
    const contactMessage = document.getElementById('contactFormMessage');
    contactMessage.textContent = 'WhatsApp opened! Please send the message to contact us directly.';
    contactMessage.className = 'form-message success';
    contactMessage.style.display = 'block';
    
    setTimeout(() => {
        contactMessage.style.display = 'none';
    }, 5000);
}

// ===== DEBUG FUNCTIONS =====
async function showStoredFeedbacks() {
    const feedbacks = await fetchFeedbacks();
    console.log('📝 API Feedbacks:', feedbacks);
    return feedbacks;
}

function clearLocalFeedbacks() {
    localStorage.removeItem('mountainsContractorFeedbacks');
    console.log('🗑️ Local feedbacks cleared');
}

async function refreshTestimonials() {
    console.log('🔄 Refreshing testimonials...');
    await loadFeedbacks();
    await loadHomeTestimonials();
}

// Make debug functions available globally
window.showStoredFeedbacks = showStoredFeedbacks;
window.clearLocalFeedbacks = clearLocalFeedbacks;
window.refreshTestimonials = refreshTestimonials;

// Force load default feedbacks immediately
function forceLoadDefaults() {
    console.log('🔄 Force loading default feedbacks...');
    
    // Load for feedback page
    const feedbackContainer = document.getElementById('testimonials-grid');
    if (feedbackContainer) {
        feedbackContainer.innerHTML = '';
        DEFAULT_FEEDBACKS.forEach(feedback => {
            const card = createTestimonialCard(feedback);
            feedbackContainer.appendChild(card);
        });
        console.log('✅ Default feedbacks loaded on feedback page');
    }
    
    // Load for home page
    const homeContainer = document.getElementById('home-testimonials');
    if (homeContainer) {
        homeContainer.innerHTML = '';
        DEFAULT_FEEDBACKS.slice(0, 3).forEach(feedback => {
            const card = createTestimonialCard(feedback);
            homeContainer.appendChild(card);
        });
        console.log('✅ Default feedbacks loaded on home page');
    }
}

// Make it globally available
window.forceLoadDefaults = forceLoadDefaults;

console.log('%c🏗️ Mountains Contractor Website Loaded Successfully!', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped for Murtuja Ansari - Mountains Contractor', 'color: #004e89; font-size: 14px;');
console.log('%c📱 WhatsApp & Email Notification System Active', 'color: #25d366; font-size: 12px;');
console.log('%c🔧 Debug Commands: forceLoadDefaults(), showStoredFeedbacks(), refreshTestimonials()', 'color: #666; font-size: 10px;');