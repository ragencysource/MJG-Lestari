document.addEventListener('DOMContentLoaded', () => {
    
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 1. Scroll Effect Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle (Sidebar)
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah klik tembus
            navMenu.classList.toggle('active');
            
            // Animasi sederhana untuk icon burger (opsional)
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Tutup menu saat link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        });
    });

    // Tutup menu jika klik DI LUAR menu (Penting untuk UX HP)
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active')) {
            // Jika yang diklik BUKAN menu dan BUKAN tombol toggle
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            }
        }
    });

    // 3. FAQ Logic (Accordion)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Tutup item lain
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            // Toggle item ini
            item.classList.toggle('active');
        });
    });

    // 4. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.style.display = 'flex';
                setTimeout(() => { backToTopBtn.style.opacity = '1'; }, 10);
            } else {
                backToTopBtn.style.opacity = '0';
                setTimeout(() => { backToTopBtn.style.display = 'none'; }, 300);
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Smooth Scroll Fix
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 6. Animation Observer
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0, 0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));
});