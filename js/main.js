document.addEventListener('DOMContentLoaded', () => {
  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For demo purposes, we'll just log the data and show a confirmation
      console.log('Form submitted:', { name, email, subject, message });
      
      // Display success message (in a real app, this would happen after successful submission)
      alert(`Thanks for your message, ${name}! I'll get back to you soon.`);
      
      // Reset form
      contactForm.reset();
    });
  }

  // Animate elements when they come into view
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Select all elements to animate on scroll
  const fadeElements = document.querySelectorAll('.section-header, .service-card, .skill-card, .about-text, .about-stats, .contact-form, .contact-info');
  fadeElements.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
  });

  // Animate stats counter
  function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000; // ms
      const increment = target / (duration / 16); // 60fps
      
      let current = 0;
      const counter = setInterval(() => {
        current += increment;
        stat.textContent = Math.floor(current);
        
        if (current >= target) {
          stat.textContent = target;
          clearInterval(counter);
        }
      }, 16);
    });
  }

  // Only animate stats when they come into view
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    statsObserver.observe(statsSection);
  }
});