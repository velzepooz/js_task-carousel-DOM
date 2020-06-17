'use strict';

const buttonPrev = document.querySelector('.carousel__btn_prev');
const buttonNext = document.querySelector('.carousel__btn_next');
const track = document.querySelector('.carousel');
const slides = [...track.children];
const dotsNav = document.querySelector('.carousel__dots-wrap');
const dots = [...dotsNav.children];

const slideWidth = slides[0].getBoundingClientRect().width;

const setSLidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSLidePosition);

const moveSlides = (tracking, currentSlide, targetSlide) => {
  tracking.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const moveDots = (currentDot, targetDot) => {
  currentDot.classList.remove('carousel__dot_active');
  targetDot.classList.add('carousel__dot_active');
};

buttonNext.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide');
  let nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.carousel__dot_active');
  let nextDot = currentDot.nextElementSibling;

  if (!nextSlide) {
    nextSlide = slides[0];
    nextDot = dots[0];
  }

  moveSlides(track, currentSlide, nextSlide);
  moveDots(currentDot, nextDot);
});

buttonPrev.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current-slide');
  let prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.carousel__dot_active');
  let prevDot = currentDot.previousElementSibling;

  if (!prevSlide) {
    prevSlide = slides[slides.length - 1];
    prevDot = dots[dots.length - 1];
  }

  moveSlides(track, currentSlide, prevSlide);
  moveDots(currentDot, prevDot);
});

dotsNav.addEventListener('click', (e) => {
  const targetDot = e.target.closest('.carousel__dot');

  if (!targetDot) {
    return;
  }

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.carousel__dot_active');
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveSlides(track, currentSlide, targetSlide);
  moveDots(currentDot, targetDot);
});
