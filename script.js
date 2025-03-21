function toggleMenu() {
    const nav = document.getElementById('hamburger-nav');
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const aboutMeLink = document.querySelector('.about-me-link');
    const profileSection = document.querySelector('.profile-section');
  
    nav.classList.toggle('hamburger-menu-open');
    menuLinks.classList.toggle('open');
    hamburgerIcon.classList.toggle('open');
    aboutMeLink.classList.toggle('open');
    profileSection.classList.toggle('menu-open');
  }
  

  function resetMenuOnResize() {
    const nav = document.getElementById('hamburger-nav');
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const aboutMeLink = document.querySelector('.about-me-link');
    const profileSection = document.querySelector('.profile-section');
  
    if (window.innerWidth > 900) {
      nav.classList.remove('hamburger-menu-open');
      menuLinks.classList.remove('open');
      hamburgerIcon.classList.remove('open');
      aboutMeLink.classList.remove('open');
      profileSection.classList.remove('menu-open');
    }
  }
  
window.addEventListener('resize', resetMenuOnResize);

document.addEventListener('DOMContentLoaded', function() {
  const profilePic = document.querySelector('.section__pic-container img');

  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const isMobile = window.innerWidth <= 768; 
    const multiplier = isMobile ? 0.08 : 0.28; 

    if (scrollPosition > 0) {
      profilePic.style.transform = `translateY(${scrollPosition * multiplier}px)`; 
    } else {
      profilePic.style.transform = 'translateY(0)';
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  if (window.location.pathname.endsWith("illustration.html")) {
    let modal = document.getElementById("imageModal");
    let modalImg = document.getElementById("modalImage");
    let captionText = document.getElementById("caption");
    let images = document.querySelectorAll(".grid-item img");
    let currentIndex = 0;

    images.forEach((img, index) => {
      img.onclick = function() {
        modal.style.display = "flex"; 
        modal.classList.add("show"); 
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
        currentIndex = index;
      };
    });

    let span = document.getElementsByClassName("close")[0];
    if (span) {
      span.onclick = function() {
        modal.style.display = "none";
        modal.classList.remove("show"); 
      };
    }

    modal.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
        modal.classList.remove("show"); 
      }
    };

 
    let nextButton = document.getElementsByClassName("next")[0];
    let prevButton = document.getElementsByClassName("prev")[0];

    if (nextButton) {
      nextButton.onclick = function() {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
      };
    }

    if (prevButton) {
      prevButton.onclick = function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
      };
    }
  }
});

function changeSlide(n) {
  currentIndex += n;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  modalImg.src = images[currentIndex].src;
  captionText.innerHTML = images[currentIndex].alt;
}


document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === "hidden" || document.visibilityState === "visible") {
    modal.style.display = "none";
    modal.classList.remove("show"); 
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const elementsToAnimate = document.querySelectorAll(
    '.aboutme__text_header, .aboutme__text_bio, .aboutme__text, .about__pic-container, .illustration-grid, .illustration__text_title, .illustration__art, .illustration__tools, .illustration__text_sub, .cases__image-container'
  );

  console.log('Elements to animate:', elementsToAnimate);

  const observerOptions = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.02 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Animating:', entry.target);
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });


  elementsToAnimate.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add('animate');
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cases = document.querySelectorAll('.cases__image-container');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(cases).indexOf(entry.target);

        // Add the 'animate' class to the current element
        entry.target.classList.add('animate');

        // If the current element is the second child, trigger the third and fourth children
        if (index === 1) {
          setTimeout(() => {
            cases[2].classList.add('animate'); // Trigger the third child
          }, 200); // Delay matches the animation duration of the second child

          setTimeout(() => {
            cases[3].classList.add('animate'); // Trigger the fourth child
          }, 400); // Delay for the fourth child (after the third)
        }

        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  });

  cases.forEach((caseItem) => {
    observer.observe(caseItem);
  });
});

