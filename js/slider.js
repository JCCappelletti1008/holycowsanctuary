const imageFolder = 'img/slider/';

const imageList = ['slider1.jpg', 'slider2.jpg', 'slider3.jpg', 'slider4.jpg', 'slider5.jpg', 'slider6.jpg', 'slider7.jpg'];

const cloneBuffer = 3;
const slideCount = imageList.length;

const allImages = [
  ...imageList.slice(-cloneBuffer),
  ...imageList,
  ...imageList.slice(0, cloneBuffer)
];

allImages.forEach(file => {
  const img = document.createElement('img');
  img.src = `${imageFolder}${file}`;
  img.alt = file;
  slideContainer.appendChild(img);
});

let currentIndex = cloneBuffer;


function updateSlide(noAnimate = false) {
  const visibleWidth = slideContainer.parentElement.offsetWidth;
  const offset = currentIndex * (visibleWidth / 3);
  slideContainer.style.transition = noAnimate ? 'none' : 'transform 0.5s ease';
  slideContainer.style.transform = `translateX(-${offset}px)`;
}

function nextSlide() {
  currentIndex++;
  updateSlide();
  if (currentIndex >= slideCount + cloneBuffer) {
    setTimeout(() => {
      currentIndex = cloneBuffer;
      updateSlide(true);
    }, 400);
  }
}

function prevSlide() {
  currentIndex--;
  updateSlide();
  if (currentIndex < cloneBuffer) {
    setTimeout(() => {
      currentIndex = slideCount + cloneBuffer - 1;
      updateSlide(true);
    }, 500);
  }
}


let autoRotate;
function startAutoRotate() {
  autoRotate = setInterval(nextSlide, 4000);
}

function stopAutoRotate() {
  clearInterval(autoRotate);
}

document.querySelector('.slider').addEventListener('mouseenter', stopAutoRotate);
document.querySelector('.slider').addEventListener('mouseleave', startAutoRotate);


window.addEventListener('resize', updateSlide);

window.onload = () => {
  updateSlide(true); // no animation on first load
  startAutoRotate();
};



let startX = 0;
document.querySelector('.slider').addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.querySelector('.slider').addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const delta = endX - startX;
  if (delta > 50) prevSlide();
  else if (delta < -50) nextSlide();
});

