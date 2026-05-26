/* -------------------------------------------------------------
 * Harshkumar Gupta's Portfolio Logic (app.js)
 * Interactive UI effects, transitions, and theme management
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // Page Loader removal
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 500);
        }, 800);
    }

    // Initialize all components
    initThemeManager();
    initTypewriter();
    initMobileNavigation();
    initScrollEffects();
    initCertificateModal();
    initContactForm();
    initSkillsFilter();
});

/**
 * 1. Theme Manager (Dark / Light Mode Toggle)
 */
function initThemeManager() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateToggleIcon(savedTheme);
    } else {
        const defaultTheme = systemPrefersDark ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', defaultTheme);
        updateToggleIcon(defaultTheme);
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });
    
    function updateToggleIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    }
}

/**
 * 2. Typewriter Effect
 */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const titles = [
        'Web Developer',
        'AI & GenAI Enthusiast',
        'Cybersecurity Student',
        'Cloud Solutions Architect',
        'Information Technology Student'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // natural typing speed
        }
        
        // Typing/deleting completed logic
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // hold text at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // pause before next title
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typewriter loop
    setTimeout(type, 1000);
}

/**
 * 3. Mobile Navigation Slider
 */
function initMobileNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    // Toggle menu state
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll visual shrink
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * 4. Viewport Scroll Reveal & Active Navigation Tracking
 */
function initScrollEffects() {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    // Reveal Observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // trigger once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollRevealElements.forEach(el => revealObserver.observe(el));
    timelineItems.forEach(item => revealObserver.observe(item));
    
    // Active Link Observer
    const activeLinkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -40% 0px'
    });
    
    sections.forEach(section => activeLinkObserver.observe(section));
    
    // Scroll To Top button visibility logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 5. Certificate Viewer Modal Handler
 */
function initCertificateModal() {
    const certItems = document.querySelectorAll('.cert-item');
    const viewLedgerBtn = document.getElementById('view-ledger-btn');
    const certModal = document.getElementById('cert-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const pdfObject = document.getElementById('pdf-object');
    const pdfFallbackLink = document.getElementById('pdf-fallback-link');
    
    if (!certModal || !modalCloseBtn || !modalOverlay) return;
    
    const certificatesPdfUrl = 'assets/Harshkumar_Gupta_Certificates.pdf';
    
    // Open modal function
    function openModal(title, pageNum = 1) {
        modalTitle.textContent = `${title} | Verification Page`;
        
        // Load the PDF. Note: PDF URL can append hash options to navigate to a specific page or fit view
        // e.g., assets/Harshkumar_Gupta_Certificates.pdf#page=1
        const formattedUrl = `${certificatesPdfUrl}#page=${pageNum}&view=FitH`;
        
        pdfObject.setAttribute('data', formattedUrl);
        pdfFallbackLink.setAttribute('href', certificatesPdfUrl);
        
        certModal.classList.add('active');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // block page scrolling
    }
    
    // Close modal function
    function closeModal() {
        certModal.classList.remove('active');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // restore scrolling
        
        // Clear object data to halt background fetching
        pdfObject.setAttribute('data', '');
    }
    
    // Event listeners
    certItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const certTitle = item.querySelector('h4').textContent;
            // Since we have a multi-page PDF, we can approximate certificate order
            // or let the browser scroll to the page based on the list.
            // Page mapping for Harsh's 17 certificates compiled:
            const pageNum = index + 1; 
            openModal(certTitle, pageNum);
        });
    });
    
    if (viewLedgerBtn) {
        viewLedgerBtn.addEventListener('click', () => {
            openModal('Compiled Professional Credentials Ledger', 1);
        });
    }
    
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * 6. Contact Form Logic & UI Feedback
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Grab inputs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Visual submit state feedback
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        
        // Simulate email submit trigger (standard client handling)
        setTimeout(() => {
            // Restore button
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            submitBtn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
            
            // Log for verification
            console.log('--- Form Submission ---', { name, email, subject, message });
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.style.background = '';
                submitBtn.style.boxShadow = '';
            }, 3000);
            
        }, 1500);
    });
}

/**
 * 7. Skills Categorized Filtering Logic
 */
function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (filterButtons.length === 0 || skillCards.length === 0) return;
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active button layout
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Trigger fade in animation
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.96) translateY(5px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
