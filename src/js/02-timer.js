import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePickerInput = document.querySelector('input[id="datetime-picker"]');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let timerId = null;
startBtn.disabled = true;

const fp = flatpickr(datePickerInput);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#f44566',
        messageSize: '18px',
        backgroundColor: '#ffffff',
        position: 'topRight',
        timeout: 2500,
      });
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(datePickerInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', onStart);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onStart() {
  startBtn.disabled = true;
  datePickerInput.disabled = true;

  timerId = setInterval(() => {
    let countDown = new Date(datePickerInput.value) - new Date();
    if (countDown >= 0) {
      let time = convertMs(countDown);

      days.textContent = addLeadingZero(time.days);
      hours.textContent = addLeadingZero(time.hours);
      minutes.textContent = addLeadingZero(time.minutes);
      seconds.textContent = addLeadingZero(time.seconds);
    } else {
      iziToast.show({
        message: 'CountDown finished',
        messageColor: '#f44566',
        messageSize: '18px',
        backgroundColor: '#ffffff',
        position: 'topRight',
        timeout: 2500,
      });
      clearInterval(timerId);
    }
  }, 1000);
}
