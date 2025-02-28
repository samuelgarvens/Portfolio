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