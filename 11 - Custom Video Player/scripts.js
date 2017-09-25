
const video = document.querySelector('video');
const playToggleButton = document.querySelector('.toggle');
const sliders = document.querySelectorAll('.player__slider');
const skipButtons = document.querySelectorAll('.player__button');
const progress = document.querySelector('.progress');
const scrubber = document.querySelector('.progress__filled');


const togglePlay = function(e) {
  if (!video.paused) {
    video.pause();
    playToggleButton.textContent = '►';
  } else {
    video.play()
    playToggleButton.textContent = '❚ ❚';
  }
}

const updateData = function(e) {
  video[this.name] = this.value;
}

const updateButton = function(e) {
  video.currentTime += parseFloat(this.dataset.skip);
}

const scrub = function(e) {
  let decimal = (e.offsetX / progress.offsetWidth);
  video.currentTime = video.duration * decimal;
}

const handleTimeUpdate = function(e) {
  let decimal = (video.currentTime / video.duration);
  scrubber.style.flexBasis = `${decimal*100}%`;
}

document.addEventListener('keydown', (e) => {
  if (e.key ==' ') {
    togglePlay();
  }
})

playToggleButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleTimeUpdate)
sliders.forEach(slider => {
  slider.addEventListener('click', updateData)
})
skipButtons.forEach(button => {
  button.addEventListener('click', updateButton)
})
scrubber.style.flexBasis = `0%`;
progress.addEventListener('click', scrub);
let mouseDown = false;
progress.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    scrub(e);
  }
});
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)
