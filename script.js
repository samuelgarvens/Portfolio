// =============================================================================
// LIGHTBOX STATE
// Variables are module-scoped so changeSlide() and the visibilitychange
// listener can reference them outside the DOMContentLoaded closure.
// =============================================================================
let modal = null;
let modalImg = null;
let captionText = null;
let images = null;
let currentIndex = 0;

// =============================================================================
// HAMBURGER MENU
// =============================================================================
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

// Hamburger icon click — toggles menu and updates case-study topnav height
const hamburgerIcon = document.querySelector(".hamburger-icon");
if (hamburgerIcon) {
  hamburgerIcon.addEventListener("click", function () {
    document.body.classList.toggle("menu-open");
    updateTopnavHeight();
  });
}

// Close menu when a menu link is clicked
document.querySelectorAll(".menu-links a").forEach((link) => {
  link.addEventListener("click", function () {
    document.body.classList.remove("menu-open");
    updateTopnavHeight();
  });
});

// Reset menu state and topnav height on desktop resize
window.addEventListener("resize", function () {
  if (window.innerWidth >= 900) {
    document.body.classList.remove("menu-open");
  }
  updateTopnavHeight();
});

// =============================================================================
// LIGHTBOX — illustration page only
// =============================================================================
document.addEventListener("DOMContentLoaded", function () {
  if (!window.location.pathname.includes("illustration")) return;

  modal = document.getElementById("imageModal");
  modalImg = document.getElementById("modalImage");
  captionText = document.getElementById("caption");
  images = document.querySelectorAll(".grid-item img");
  currentIndex = 0;

  // Open lightbox on image click
  images.forEach((img, index) => {
    img.onclick = function () {
      modal.style.display = "flex";
      modal.classList.add("show");
      modalImg.src = this.dataset.full || this.src;
      captionText.innerHTML = this.alt;
      currentIndex = index;
    };
  });

  // Close via × button
  const span = document.getElementsByClassName("close")[0];
  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
      modal.classList.remove("show");
    };
  }

  // Close by clicking the backdrop
  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      modal.classList.remove("show");
    }
  };

  // Swipe to navigate on mobile
  let touchStartX = 0;
  let touchStartY = 0;

  modal.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  modal.addEventListener("touchend", function (e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    // Only trigger if horizontal swipe dominates
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      changeSlide(dx < 0 ? 1 : -1);
    }
  }, { passive: true });

  // Next / prev buttons
  const nextButton = document.getElementsByClassName("next")[0];
  const prevButton = document.getElementsByClassName("prev")[0];

  if (nextButton) {
    nextButton.onclick = function () {
      currentIndex = (currentIndex + 1) % images.length;
      modalImg.src = images[currentIndex].dataset.full || images[currentIndex].src;
      captionText.innerHTML = images[currentIndex].alt;
    };
  }

  if (prevButton) {
    prevButton.onclick = function () {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      modalImg.src = images[currentIndex].dataset.full || images[currentIndex].src;
      captionText.innerHTML = images[currentIndex].alt;
    };
  }
});

// Called by inline onclick="changeSlide(±1)" on the prev/next arrows
function changeSlide(n) {
  if (!images) return;
  currentIndex = (currentIndex + n + images.length) % images.length;
  modalImg.src = images[currentIndex].dataset.full || images[currentIndex].src;
  captionText.innerHTML = images[currentIndex].alt;
}

// Close lightbox when the tab loses/regains visibility
document.addEventListener("visibilitychange", function () {
  if (!modal) return;
  modal.style.display = "none";
  modal.classList.remove("show");
});

// =============================================================================
// SCROLL ANIMATIONS — fade-in / slide-up on scroll entry
// =============================================================================
document.addEventListener("DOMContentLoaded", function () {
  const elementsToAnimate = document.querySelectorAll(
    "" +
    ".illustration-grid, .illustration__text_title, .illustration__art, .illustration__tools, " +
    ".illustration__text_sub, .cases__image-container, .cases__titleembed, .hero, " +
    ".casestudy_section, .casestudy_section1, .casestudy_section2, .casestudy_section2_1, " +
    ".casestudy__steptitle, .casestudy__steptitlew, .casestudy__middletextbox, " +
    ".bigtitleright, .bigtitleleft, .bigtitleright2, .bigtitlebluesky, .bigtitlebluesky2"
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.05 }
  );

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
    // Animate immediately if already in viewport on load
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add("animate");
    }
  });
});

// =============================================================================
// CASE CARD STAGGER — cards 3 & 4 animate shortly after card 2 (index only)
// =============================================================================
document.addEventListener("DOMContentLoaded", function () {
  const cases = document.querySelectorAll(".cases__image-container");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(cases).indexOf(entry.target);
        entry.target.classList.add("animate");

        if (index === 1) {
          setTimeout(() => { if (cases[2]) cases[2].classList.add("animate"); }, 200);
          setTimeout(() => { if (cases[3]) cases[3].classList.add("animate"); }, 400);
        }

        observer.unobserve(entry.target);
      }
    });
  });

  cases.forEach((caseItem) => observer.observe(caseItem));
});

// =============================================================================
// RIOT GAMES PASSWORD GATE
// =============================================================================
document.addEventListener("DOMContentLoaded", function () {
  ["riot-logo"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("click", function () {
      const password = prompt("Please enter the password to access this content:");
      if (password === "tunafish5") {
        alert("Access granted!");
        window.location.href = "./riotgames.html";
      } else {
        alert("Incorrect password. Please try again.");
      }
    });
  });
});

// =============================================================================
// CASE STUDY CONTAINER ANIMATIONS — slide in from left, right, or below
// =============================================================================
document.addEventListener("DOMContentLoaded", function () {
  const containers = document.querySelectorAll(".casestudy__container");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

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
      });
    },
    { threshold: 0.33 }
  );

  containers.forEach((container) => observer.observe(container));
});

// =============================================================================
// VERTICAL NAV — case study pages (brushies, bluesky)
// =============================================================================

// Highlight the nav link matching the section currently in view
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".vertical-nav a");
  if (!navLinks.length) return;

  const sections = Array.from(document.querySelectorAll("section[id]"));

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

// Show the vertical nav once the user reaches the #overview section
document.addEventListener("DOMContentLoaded", function () {
  const verticalNav = document.querySelector(".vertical-nav");
  if (!verticalNav) return;

  verticalNav.classList.remove("visible");

  const overviewSection = document.querySelector("#overview");
  if (!overviewSection) return;

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

  observer.observe(overviewSection);
});

// =============================================================================
// CASE STUDY TOPNAV — fades on scroll, adjusts height when mobile menu is open
// =============================================================================
function updateTopnavHeight() {
  const topnav = document.querySelector(".casestudy__topnav");
  if (!topnav) return;

  const isMenuOpen = document.body.classList.contains("menu-open");
  const isMobile = window.innerWidth < 900;

  topnav.style.height =
    isMenuOpen && isMobile && !topnav.classList.contains("faded")
      ? "130px"
      : "80px";
}

window.addEventListener("scroll", function () {
  const topnav = document.querySelector(".casestudy__topnav");
  if (!topnav) return;
  topnav.classList.toggle("faded", window.scrollY > 0);
});

window.addEventListener("scroll", updateTopnavHeight);
updateTopnavHeight();

// =============================================================================
// IMAGE CAROUSEL — bluesky research section
// =============================================================================
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
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (prevBtn) {
    prevBtn.onclick = () => {
      current = (current - 1 + carouselImages.length) % carouselImages.length;
      showImage(current);
    };
  }
  if (nextBtn) {
    nextBtn.onclick = () => {
      current = (current + 1) % carouselImages.length;
      showImage(current);
    };
  }

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => { current = i; showImage(current); });
  });

  // Swipe support
  let touchStartX = 0;
  imgEl.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  imgEl.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (diff < -30) { current = (current + 1) % carouselImages.length; showImage(current); }
    if (diff > 30)  { current = (current - 1 + carouselImages.length) % carouselImages.length; showImage(current); }
  });

  showImage(current);
});

// =============================================================================
// SECTION ITEM STAGGER — education, experience, projects
// =============================================================================
document.addEventListener('DOMContentLoaded', function () {
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('section--visible');
        observer.unobserve(entry.target);
        setTimeout(function() { entry.target.classList.add('section--done'); }, 900);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('#education, #experience, #projects').forEach(function (s) {
    observer.observe(s);
  });
});

// =============================================================================
// LAST.FM TOP ALBUMS — about me page
// =============================================================================
(function () {
  const grid = document.getElementById('lastfm-grid');
  if (!grid) return;

  const API_KEY = '81bc1abbca95c1e9ab91b580f3e42457';
  const USER    = 'samuelgarvens';
  const URL     = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${USER}&period=1month&limit=9&api_key=${API_KEY}&format=json`;

  fetch(URL)
    .then(r => r.json())
    .then(data => {
      const albums = data.topalbums && data.topalbums.album;
      if (!albums || !albums.length) return;

      grid.innerHTML = '';
      albums.slice(0, 9).forEach(album => {
        const img = album.image.find(i => i.size === 'extralarge') || album.image[album.image.length - 1];
        const src = img && img['#text'] ? img['#text'] : '';

        const el = document.createElement('div');
        el.className = 'lastfm-album';
        el.innerHTML = `
          <img src="${src}" alt="${album.name}" loading="lazy">
          <div class="lastfm-album__info">
            <span class="lastfm-album__name">${album.name}</span>
            <span class="lastfm-album__artist">${album.artist.name}</span>
            <span class="lastfm-album__plays">${Number(album.playcount).toLocaleString()} plays</span>
          </div>`;
        grid.appendChild(el);
      });
    })
    .catch(() => { grid.style.display = 'none'; });
})();

// =============================================================================
// ABOUT ME PAGE STAGGER
// =============================================================================
document.addEventListener('DOMContentLoaded', function () {
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  const container = document.querySelector('.aboutme__container');
  if (!container) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        container.classList.add('about--visible');
        observer.unobserve(container);
      }
    });
  }, { threshold: 0.08 });

  const rect = container.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    container.classList.add('about--visible');
  } else {
    observer.observe(container);
  }
});
