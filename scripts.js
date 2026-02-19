// Simple slider cycling
let idx = 0;
  const slider = document.querySelector('.hero-slider');
  const slides = document.querySelectorAll('.slide');
  const navButtons = document.querySelectorAll('.slider-nav button');
  let interval = setInterval(nextSlide, 5000); // autoplay

  function goToSlide(index) {
    idx = index;
    slider.style.transform = `translateX(-${idx * 100}%)`;
    updateActiveButton();
  }

  function nextSlide() {
    idx = (idx + 1) % slides.length;
    goToSlide(idx);
  }

  function updateActiveButton() {
    navButtons.forEach((btn, i) => {
      btn.classList.toggle('active', i === idx);
    });
  }

  // Add click events to buttons
  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const slideIndex = parseInt(btn.getAttribute('data-slide'), 10);
      goToSlide(slideIndex);

      // Optional: Reset autoplay when user clicks
      clearInterval(interval);
      interval = setInterval(nextSlide, 5000);
    });
  });

  // Initial state
  updateActiveButton();

window.addEventListener('scroll', function() {
  const slide = document.querySelector('.slide');
  const offset = window.pageYOffset;
  slide.style.backgroundPositionY = `${offset * 0.55}px`;
});

//checks active page 

const links = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop(); // e.g. "about.html"

  links.forEach(link => {
    const href = link.getAttribute('href');

    // Match exact filename or empty string (for index.html)
    if (href === currentPath || (href === 'index.html' && currentPath === '')) {
      link.classList.add('active');
    }
  });

const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      formData.append("access_key", "daa26cb7-31ac-41ea-b369-19718757b15a");

      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
          const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: formData
          });

          const data = await response.json();

          if (response.ok) {
              alert("Success! Your message has been sent.");
              form.reset();
          } else {
              alert("Error: " + data.message);
          }

      } catch (error) {
          alert("Something went wrong. Please try again.");
      } finally {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
      }
  });
})
