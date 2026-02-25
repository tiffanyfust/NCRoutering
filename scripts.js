
const mobileMenuIcon = document.querySelector('.mobileMenuIcon');
const mobileMenuItems = document.querySelector('.hiddenMobileMenu');

mobileMenuIcon.addEventListener('click', () => { 
    if (window.innerWidth <= 1199 ) { 
      console.log('Clicked while screen ≤ 500px');
      mobileMenuItems.classList.toggle('open');
  } });


window.addEventListener('scroll', function() {
  const slide = document.querySelector('.slide');
  const offset = window.pageYOffset;
  slide.style.backgroundPositionY = `${offset * 0.55}px`;
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

          if (data.ok) {
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
