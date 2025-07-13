import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
    const now = new Date;
    if (chosenDate <= now) {
      iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
      }); 
      StartBtn.disabled = true;
    } else {
      StartBtn.disabled = false;
    }

  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const input = document.querySelector("#datetime-picker");
const StartBtn = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl= document.querySelector("[data-seconds]");

StartBtn.disabled = true;
let difference;
let chosenDate;
console.log(new Date);

flatpickr(input, options);

StartBtn.addEventListener('click', startClick);

function startClick() {
  StartBtn.disabled = true;
  input.disabled = true;

  const myInterval = setInterval(() => {
    const now = new Date();
    difference = chosenDate - now;
     const { days, hours, minutes, seconds } = convertMs(difference);
      daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);

       if (difference <= 0) {
      clearInterval(myInterval);
     input.disabled = false;
     daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
    }
  }, 1000);
    
};