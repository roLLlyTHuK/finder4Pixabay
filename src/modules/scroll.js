const scrollToTopButton = document.getElementById('scrollToTopButton');
//!визначення прокрутки
function handleScroll() {
  if (window.pageYOffset > 0.5 * window.innerHeight) {
    scrollToTopButton.style.visibility = 'visible';
    scrollToTopButton.style.opacity = 0.5;
  } else {
    scrollToTopButton.style.visibility = 'hidden';
    scrollToTopButton.style.opacity = 0;
  }
}

// плавна прокрутка до верху
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

window.addEventListener('scroll', handleScroll);

export { scrollToTopButton, scrollToTop };
