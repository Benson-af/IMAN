// JS: trigger on load and toggle on scroll
document.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.querySelector(".hero-content");
  heroContent.classList.add("h1-visible"); // animate in on page load

  let lastY = window.pageYOffset;
  window.addEventListener("scroll", () => {
    const currentY = window.pageYOffset;
    if (currentY > lastY) {
      // scrolling down
      heroContent.classList.remove("h1-visible");
      heroContent.classList.add("h1-hidden");
    } else {
      // scrolling up
      heroContent.classList.remove("h1-hidden");
      heroContent.classList.add("h1-visible");
    }
    lastY = currentY;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // SLIDESHOW
  const slides = document.querySelectorAll(".hero .slide");
  let current = 0; // first slide already has `active` class in HTML

  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 10000); // switch every 5s

  // BUTTON HANDLERS
  document.querySelector(".watch-more").addEventListener("click", () => {
    console.log("OUR STORY clicked");
    // e.g. document.querySelector('#story').scrollIntoView({ behavior: 'smooth' });
  });
  document.querySelector(".volunteer").addEventListener("click", () => {
    window.location.href = "/volunteer";
  });
  document.querySelector(".donate").addEventListener("click", () => {
    window.location.href = "/donate";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dragBtn = document.querySelector(".drag-btn");

  dragBtn.addEventListener("mousedown", () => {
    dragBtn.textContent = "DRAGGING…";
  });
  document.addEventListener("mouseup", () => {
    dragBtn.textContent = "DRAG >>>";
  });
});

// GALLERY
    const track = document.getElementById('slider-track');
    const slides = Array.from(document.querySelectorAll('.slider-slide'));
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dots = document.getElementById('slider-dots');
    let current = 0;
    let slideCount = slides.length;
    // Dots
    function renderDots() {
      dots.innerHTML = '';
      for (let i = 0; i < slideCount; i++) {
        let dot = document.createElement('div');
        dot.className = 'slider-dot' + (i === current ? ' active' : '');
        dot.tabIndex = 0;
        dot.setAttribute('aria-label', `Go to slide ${i+1}`);
        dot.onclick = () => goTo(i);
        dot.onkeydown = e => { if(e.key==='Enter'||e.key===' ') goTo(i); };
        dots.appendChild(dot);
      }
    }
    function goTo(idx) {
      current = Math.max(0, Math.min(slideCount-1, idx));
      update();
    }
    function update() {
      const w = slides[0].offsetWidth;
      track.style.transform = `translateX(${-current * w}px)`;
      renderDots();
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === slideCount-1;
    }
    prevBtn.onclick = () => goTo(current-1);
    nextBtn.onclick = () => goTo(current+1);
    // Touch/drag
    let startX = 0, dragX = 0, dragging = false;
    track.addEventListener('mousedown', e => {
      dragging = true; startX = e.pageX;
      track.style.transition = 'none';
    });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      dragX = e.pageX - startX;
      track.style.transform = `translateX(${-current*slides[0].offsetWidth + dragX}px)`;
    });
    window.addEventListener('mouseup', () => {
      if (!dragging) return;
      track.style.transition = '';
      if (dragX < -40 && current < slideCount-1) goTo(current+1);
      else if (dragX > 40 && current > 0) goTo(current-1);
      else update();
      dragging = false; dragX = 0;
    });
    // Touch events
    track.addEventListener('touchstart', e => {
      if(e.touches.length>1) return;
      dragging = true; startX = e.touches[0].pageX;
      track.style.transition = 'none';
    });
    track.addEventListener('touchmove', e => {
      if (!dragging) return;
      dragX = e.touches[0].pageX - startX;
      track.style.transform = `translateX(${-current*slides[0].offsetWidth + dragX}px)`;
    });
    track.addEventListener('touchend', () => {
      track.style.transition = '';
      if (dragX < -40 && current < slideCount-1) goTo(current+1);
      else if (dragX > 40 && current > 0) goTo(current-1);
      else update();
      dragging = false; dragX = 0;
    });
    // Resize: update slide width
    window.addEventListener('resize', update);
    // Init
    window.addEventListener('DOMContentLoaded', () => {renderDots(); update();});