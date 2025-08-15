
// Mobile menu toggle
const burger = document.querySelector('.hamburger');
const mobile = document.querySelector('.mobile-menu');
if (burger && mobile){
  burger.addEventListener('click', () => mobile.classList.toggle('open'));
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.length > 1){
      const el = document.querySelector(href);
      if (el){
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
      }
    }
  });
});

// Scroll reveal with IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Parallax effect (applies to elements with .parallax)
const parallaxEls = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.speed || '0.15');
    el.style.setProperty('--y', `${y * speed * -1}px`);
  });
});
