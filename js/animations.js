document.addEventListener('DOMContentLoaded', () => {
  // Testimonial slider functionality
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;

  // Fetch Testimonials from Google Sheets
  function fetchTestimonials() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQy4bokIrb6xboUeWVGknVWimxOtghgUHBVirf2tTFzTUCfVbcqH-JMErhLH7W5VyOkCNZpy-mDucna/pub?output=csv')
      .then(response => response.text())
      .then(data => {
        const rows = data.split('\n').slice(1); // Skip header row
        const container = document.getElementById('testimonial-container');
        const dots = document.querySelector('.testimonial-dots');
        container.innerHTML = ''; // Clear previous testimonials
        dots.innerHTML = ''; // Clear previous dots

        rows.forEach((row, index) => {
          const [timestamp, name, role, testimonial] = row.split(',');

          // Make sure we have the necessary data before adding to the page
          if (name && testimonial) {
            const testimonialHTML = `
              <div class="testimonial">
                <div class="testimonial-content">
                  <p>"${testimonial.trim()}"</p>
                </div>
                <div class="testimonial-author">
                  <div class="author-info">
                    <h4>${name.trim()}</h4>
                    <p>${role.trim()}</p>
                  </div>
                </div>
              </div>
            `;
            container.innerHTML += testimonialHTML;

            // Add a dot for each testimonial
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('data-index', index);
            dots.appendChild(dot);
          }
        });
      })
      .catch(error => console.error('Error fetching testimonial data:', error));
  }

  // Call fetchTestimonials once when the page loads
  fetchTestimonials();

  // Testimonial Slider
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });

    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });

    // Show the specified testimonial
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');

    currentIndex = index;
  }

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
    });
  });

  // Event listeners for prev/next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) {
        newIndex = testimonials.length - 1;
      }
      showTestimonial(newIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= testimonials.length) {
        newIndex = 0;
      }
      showTestimonial(newIndex);
    });
  }

  // Auto-rotate testimonials
  let rotationInterval = setInterval(() => {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonials.length) {
      newIndex = 0;
    }
    showTestimonial(newIndex);
  }, 8000);

  // Pause rotation on hover
  const testimonialContainer = document.querySelector('.testimonials-slider');
  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => {
      clearInterval(rotationInterval);
    });

    testimonialContainer.addEventListener('mouseleave', () => {
      rotationInterval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) {
          newIndex = 0;
        }
        showTestimonial(newIndex);
      }, 8000);
    });
  }

  // Smooth scroll effect for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu if it's open
          const mobileMenu = document.querySelector('.nav-menu');
          const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

          if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (mobileMenuBtn) {
              mobileMenuBtn.classList.remove('active');
            }
          }

          // Scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Account for fixed header
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Header transparency and shadow on scroll
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 600) {
        // Apply a subtle parallax effect
        const yPos = -scrollPosition * 0.2;
        heroSection.style.backgroundPosition = `center ${yPos}px`;
      }
    });
  }

  // Add animation to code snippet
  const codeSnippet = document.querySelector('.code-snippet');
  if (codeSnippet) {
    codeSnippet.style.opacity = '0';
    codeSnippet.style.transform = 'translateY(20px)';

    setTimeout(() => {
      codeSnippet.style.transition = 'opacity 1s ease, transform 1s ease';
      codeSnippet.style.opacity = '1';
      codeSnippet.style.transform = 'translateY(0)';
    }, 500);
  }
});
