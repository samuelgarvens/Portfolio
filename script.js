// Lightbox variables lifted to module scope so changeSlide() and
// the visibilitychange listener can reference them from outside the
// DOMContentLoaded closure.
let modal = null;
let modalImg = null;
let captionText = null;
let images = null;
let currentIndex = 0;

function toggleMenu() {
  const nav = document.getElementById("hamburger-nav");
  const menuLinks = document.querySelector(".menu-links");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const aboutMeLink = document.querySelector(".about-me-link");
  const profileSection = document.querySelector(".profile-section");

  nav.classList.toggle("hamburger-menu-open");
  menuLinks.classList.toggle("open");
  hamburgerIcon.classList.toggle("open");
  if (aboutMeLink) aboutMeLink.classList.toggle("open");
  if (profileSection) profileSection.classList.toggle("menu-open");
}

function resetMenuOnResize() {
  const nav = document.getElementById("hamburger-nav");
  const menuLinks = document.querySelector(".menu-links");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const aboutMeLink = document.querySelector(".about-me-link");
  const profileSection = document.querySelector(".profile-section");

  if (window.innerWidth > 900) {
    nav.classList.remove("hamburger-menu-open");
    menuLinks.classList.remove("open");
    hamburgerIcon.classList.remove("open");
    if (aboutMeLink) aboutMeLink.classList.remove("open");
    if (profileSection) profileSection.classList.remove("menu-open");
  }
}

window.addEventListener("resize", resetMenuOnResize);

document.addEventListener("DOMContentLoaded", function () {
  const profilePic = document.querySelector(".section__pic-container img");
  if (!profilePic) return;

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const isMobile = window.innerWidth <= 768;
    const multiplier = isMobile ? 0.08 : 0.28;

    if (scrollPosition > 0) {
      profilePic.style.transform = `translateY(${scrollPosition * multiplier}px)`;
    } else {
      profilePic.style.transform = "translateY(0)";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("illustration")) {
    modal = document.getElementById("imageModal");
    modalImg = document.getElementById("modalImage");
    captionText = document.getElementById("caption");
    images = document.querySelectorAll(".grid-item img");
    currentIndex = 0;

    images.forEach((img, index) => {
      img.onclick = function () {
        modal.style.display = "flex";
        modal.classList.add("show");
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
        currentIndex = index;
      };
    });

    const span = document.getElementsByClassName("close")[0];
    if (span) {
      span.onclick = function () {
        modal.style.display = "none";
        modal.classList.remove("show");
      };
    }

    modal.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
        modal.classList.remove("show");
      }
    };

    const nextButton = document.getElementsByClassName("next")[0];
    const prevButton = document.getElementsByClassName("prev")[0];

    if (nextButton) {
      nextButton.onclick = function () {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
      };
    }

    if (prevButton) {
      prevButton.onclick = function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
      };
    }
  }
});

function changeSlide(n) {
  if (!images) return;
  currentIndex += n;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  modalImg.src = images[currentIndex].src;
  captionText.innerHTML = images[currentIndex].alt;
}

document.addEventListener("visibilitychange", function () {
  if (!modal) return;
  if (
    document.visibilityState === "hidden" ||
    document.visibilityState === "visible"
  ) {
    modal.style.display = "none";
    modal.classList.remove("show");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const elementsToAnimate = document.querySelectorAll(
    ".aboutme__text_header, .aboutme__text_bio, .aboutme__text, .about__pic-container, .illustration-grid, .illustration__text_title, .illustration__art, .illustration__tools, .illustration__text_sub, .cases__image-container, .cases__titleembed, .hero, .casestudy_section, .casestudy_section1, .casestudy_section2, .casestudy_section2_1, .casestudy__steptitle, .casestudy__steptitlew, .casestudy__middletextbox, .bigtitleright, .bigtitleleft, .bigtitleright2, .bigtitlebluesky, .bigtitlebluesky2"
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.05,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  elementsToAnimate.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add("animate");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cases = document.querySelectorAll(".cases__image-container");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(cases).indexOf(entry.target);

        entry.target.classList.add("animate");

        if (index === 1) {
          setTimeout(() => {
            if (cases[2]) cases[2].classList.add("animate");
          }, 200);

          setTimeout(() => {
            if (cases[3]) cases[3].classList.add("animate");
          }, 400);
        }

        observer.unobserve(entry.target);
      }
    });
  });

  cases.forEach((caseItem) => {
    observer.observe(caseItem);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const ids = ["riot-logo", "riot-logo2"];

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", function () {
        const password = prompt(
          "Please enter the password to access this content:"
        );
        if (password === "tunafish5") {
          alert("Access granted!");
          window.location.href = "./riotgames.html";
        } else {
          alert("Incorrect password. Please try again.");
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const containers = document.querySelectorAll(".casestudy__container");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const leftBox = entry.target.querySelector(".casestudy__leftbox img");
          const rightBox = entry.target.querySelector(".casestudy__rightbox img");

          if (leftBox) {
            entry.target.classList.add("animate-left");
          } else if (rightBox) {
            entry.target.classList.add("animate-right");
          } else {
            entry.target.classList.add("animate-below");
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.33 }
  );

  containers.forEach((container) => observer.observe(container));
});

// Observer 1: Update "active" state for navigation links
document.addEventListener("DOMContentLoaded", function () {
  const sections = Array.from(document.querySelectorAll("section[id]"));
  const navLinks = document.querySelectorAll(".vertical-nav a");
  if (!navLinks.length) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.08) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const activeLink = document.querySelector(
            `.vertical-nav a[href="#${entry.target.id}"]`
          );
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    { threshold: 0.08 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
});

// Observer 2: Toggle visibility of the vertical navigation
document.addEventListener("DOMContentLoaded", function () {
  const verticalNav = document.querySelector(".vertical-nav");
  if (!verticalNav) return;

  const overviewSection = document.querySelector("#overview");

  verticalNav.classList.remove("visible");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.boundingClientRect.top < 0 || entry.isIntersecting) {
          verticalNav.classList.add("visible");
        } else {
          verticalNav.classList.remove("visible");
        }
      });
    },
    { threshold: 0.22 }
  );

  if (overviewSection) {
    observer.observe(overviewSection);
  }
});

window.addEventListener("scroll", function () {
  const topnav = document.querySelector(".casestudy__topnav");
  if (!topnav) return;
  if (window.scrollY > 0) {
    topnav.classList.add("faded");
  } else {
    topnav.classList.remove("faded");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const imgEl = document.getElementById("carousel-img");
  if (!imgEl) return;

  const carouselImages = [
    "./assets/Case2research.png",
    "./assets/Case2research2.png",
    "./assets/Case2research3.png",
  ];
  let current = 0;
  const dots = document.querySelectorAll(".carousel-dots .dot");

  function showImage(index) {
    imgEl.src = carouselImages[index];
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (prevBtn) {
    prevBtn.onclick = function () {
      current = (current - 1 + carouselImages.length) % carouselImages.length;
      showImage(current);
    };
  }
  if (nextBtn) {
    nextBtn.onclick = function () {
      current = (current + 1) % carouselImages.length;
      showImage(current);
    };
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      current = i;
      showImage(current);
    });
  });

  let touchStartX = 0;
  let touchEndX = 0;

  imgEl.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  imgEl.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 30) {
      current = (current + 1) % carouselImages.length;
      showImage(current);
    }
    if (touchEndX > touchStartX + 30) {
      current = (current - 1 + carouselImages.length) % carouselImages.length;
      showImage(current);
    }
  });

  showImage(current);
});

function updateTopnavHeight() {
  const topnav = document.querySelector(".casestudy__topnav");
  if (!topnav) return;

  const isMenuOpen = document.body.classList.contains("menu-open");
  const isMobile = window.innerWidth < 900;

  if (isMenuOpen && isMobile && !topnav.classList.contains("faded")) {
    topnav.style.height = "130px";
  } else {
    topnav.style.height = "80px";
  }
}

// Hamburger icon toggles menu and updates nav height
const hamburgerIcon = document.querySelector(".hamburger-icon");
if (hamburgerIcon) {
  hamburgerIcon.addEventListener("click", function () {
    document.body.classList.toggle("menu-open");
    updateTopnavHeight();
  });
}

document.querySelectorAll(".menu-links a").forEach((link) => {
  link.addEventListener("click", function () {
    document.body.classList.remove("menu-open");
    updateTopnavHeight();
  });
});

window.addEventListener("resize", function () {
  if (window.innerWidth >= 900) {
    document.body.classList.remove("menu-open");
  }
  updateTopnavHeight();
});

window.addEventListener("scroll", updateTopnavHeight);
updateTopnavHeight();
