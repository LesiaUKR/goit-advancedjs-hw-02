import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const submitBtn = document.querySelector('button[type=submit]');
const delay = document.querySelector('input[name=delay]');
const step = document.querySelector('input[name=step]');
const promisesQuantity = document.querySelector('input[name=amount]');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

submitBtn.addEventListener('click', onClick);

function onClick(event) {
  event.preventDefault();
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);

  for (let i = 0; i < promisesQuantity.value; i++) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        iziToast.success({
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
          messageColor: '#f44566',
          messageSize: '18px',
          backgroundColor: '#ffffff',
          position: 'topRight',
          timeout: 2000,
          transitionIn: 'fadeInDown',
          transitionOut: 'fadeOutUp',
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          message: `❌ Rejected promise ${position} in ${delay}ms`,
          messageColor: '#f44566',
          messageSize: '18px',
          backgroundColor: '#ffffff',
          position: 'topRight',
          timeout: 2000,
          transitionIn: 'bounceInDown',
          transitionOut: 'fadeOutUp',
        });
      });
  }
}
