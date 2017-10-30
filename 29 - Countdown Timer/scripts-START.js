let interval;

const buttons = document.querySelectorAll('[data-time]');
const timeLeftTimer = document.querySelector('.display__time-left');
const endTimer = document.querySelector('.display__end-time');

timeLeftTimer.textContent = '00:00';

const timer = inputSeconds => {
  clearInterval(interval);
  const start = Date.now();
  const then = start + (inputSeconds * 1000);
  displayTimeLeft(inputSeconds);
  displayEndTime(then);

  interval = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(interval);
    } else {
      displayTimeLeft(secondsLeft);
    }
  }, 1000)

};

const displayTimeLeft = secondsLeft => {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  timeLeftTimer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const displayEndTime = then => {
  const date = new Date(then);
  let hours = date.getHours();
  hours = hours > 12 ? hours - 12 : hours;
  const minutes = date.getMinutes();
  endTimer.textContent = `Be back at: ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

const handleClick = function(e) {
  timer(this.dataset.time);
};

buttons.forEach(button => button.addEventListener('click', handleClick));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  minutes = this.minutes.value;
  seconds = minutes * 60;
  timer(seconds);
  this.reset();
})
