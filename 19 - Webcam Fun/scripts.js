const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = function() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(media => {
      video.src = window.URL.createObjectURL(media);
      video.play;
    })
    .catch(err => {
      console.error(err);
    })
}

const paintToCanvas = function() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval( () => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 5)
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
