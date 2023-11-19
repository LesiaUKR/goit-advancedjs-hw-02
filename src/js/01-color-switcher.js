const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyColor = document.getElementsByTagName('body')[0];

btnStart.addEventListener('click', startColorChange);
btnStop.addEventListener('click', stopColorChange);
btnStop.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let timerId = null;

function startColorChange() {
  btnStart.disabled = true;
  btnStop.disabled = false;

  timerId = setInterval(() => {
    let color = getRandomHexColor();
    console.log(color);
    bodyColor.style.backgroundImage = 'none';
    bodyColor.style.backgroundColor = color;
  }, 1000);
}

function stopColorChange() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  bodyColor.style.backgroundImage = 'linear-gradient(45deg, #102eff, #d2379b)';
  clearInterval(timerId);
}
