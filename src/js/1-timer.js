function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}

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

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    // Перевірка на валідність дати
    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

document.querySelector('[data-start]').addEventListener('click', function () {
  this.disabled = true;
  document.getElementById('datetime-picker').disabled = true;
  const countdownInterval = setInterval(function () {
    const currentDate = new Date();
    const timeDifference = userSelectedDate - currentDate;
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
      });
      document.querySelector('[data-start]').disabled = false;
      document.getElementById('datetime-picker').disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    document.querySelector('[data-days]').innerText = addLeadingZero(days);
    document.querySelector('[data-hours]').innerText = addLeadingZero(hours);
    document.querySelector('[data-minutes]').innerText =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').innerText =
      addLeadingZero(seconds);
  }, 1000);
});
