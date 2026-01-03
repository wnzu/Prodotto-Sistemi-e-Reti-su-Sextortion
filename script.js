// script.js - Funzionalità Interattive
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Chiudi menu quando si clicca su un link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Chiudi menu quando si clicca fuori
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Highlight menu attivo
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animazione statistiche
   const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => {
    // Rimuove tutto tranne numeri e decimali
    const finalNumber = Number(stat.textContent.replace(/[^\d.]/g, ''));
    const hasPercent = stat.textContent.includes('%'); // verifica se c'è %
    
    if (!isNaN(finalNumber)) {
        let current = 0;
        const increment = finalNumber / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalNumber) {
                current = finalNumber;
                clearInterval(timer);
            }
            // Aggiunge "%" se presente nell'originale
            stat.textContent = Math.floor(current) + (hasPercent ? '%' : '');
        }, 20);
    }
});

    
    // Alert di emergenza
    const emergencyBtns = document.querySelectorAll('.emergency-btn');
    emergencyBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#emergency') {
                e.preventDefault();
                alert('🚨 EMERGENZA - RICATTO ONLINE\n\n' +
                    '1️⃣ IMMEDIATAMENTE:\n' +
                    '• NON PAGARE\n' +
                    '• NON RISPOSTE\n' +
                    '• BLOCCA IL CONTATTO\n\n' +
                    '2️⃣ CHIAMA SUBITO:\n' +
                    '📞 Polizia Postale\n' +
                    '📞 Telefono Azzurro: 19696\n' +
                    '📞 Numero Vittime UE: 116 006\n\n' +
                    '3️⃣ SALVA LE PROVE:\n' +
                    '• Screenshot\n' +
                    '• Email\n' +
                    '• Chat\n\n' +
                    'Non sei solo. Aiuto esiste!');
            }
        });
    });
    
    // Animazione cards al scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Applica animazione a tutte le cards
    document.querySelectorAll('.feature-card, .step-item, .tip-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Modal per esempi (se necessario)
    const exampleModals = document.querySelectorAll('.example-modal-trigger');
    exampleModals.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const exampleContent = this.getAttribute('data-example');
            if (exampleContent) {
                // Implementa modal qui se necessario
                console.log('Esempio:', exampleContent);
            }
        });
    });
    
    // Gestione accordion per FAQ
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            this.classList.toggle('active');
        });
    });

});

