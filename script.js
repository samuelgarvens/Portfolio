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
  
  // Function to reset the menu state when the screen is resized
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
  
  // Add event listener for window resize
window.addEventListener('resize', resetMenuOnResize);

document.addEventListener('DOMContentLoaded', function() {
  const profilePic = document.querySelector('.section__pic-container img');

  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed
    const multiplier = isMobile ? 0.08 : 0.28; // Use 0.08 for mobile, 0.3 for desktop

    if (scrollPosition > 0) {
      profilePic.style.transform = `translateY(${scrollPosition * multiplier}px)`; // Apply the appropriate multiplier
    } else {
      profilePic.style.transform = 'translateY(0)'; // Reset the transformation when scroll is less than or equal to 20
    }
  });
});

let modal = document.getElementById("imageModal");
let modalImg = document.getElementById("modalImage");
let captionText = document.getElementById("caption");
let images = document.querySelectorAll(".grid-item img");
let currentIndex = 0;

images.forEach((img, index) => {
  img.onclick = function() {
    modal.style.display = "flex"; // Ensure modal uses flex display
    modal.classList.add("show"); // Add the show class to the modal
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
    currentIndex = index;
  };
});

let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
  modal.classList.remove("show"); // Remove the show class from the modal
};

modal.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    modal.classList.remove("show"); // Remove the show class from the modal
  }
};

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

// Close the modal if the user leaves the page
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === "hidden" || document.visibilityState === "visible") {
    modal.style.display = "none";
    modal.classList.remove("show"); // Remove the show class from the modal
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const elementsToAnimate = document.querySelectorAll(
    '.illustration-grid, .illustration__text'
  );

  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.03 // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Stop observing once the animation is triggered
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
});




