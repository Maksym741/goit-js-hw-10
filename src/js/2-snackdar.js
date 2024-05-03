// Функція для створення промісу з вказаною затримкою та станом
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

// Обробник події сабміту форми
document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  // Отримуємо значення з поля вводу для затримки
  const delay = parseInt(this.elements['delay'].value);

  // Отримуємо значення вибраного стану з радіокнопок
  const state = this.elements['state'].value;

  // Створюємо проміс з вказаною затримкою та станом
  createPromise(delay, state)
    .then(delay => {
      // Якщо проміс виконується вдало
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      // Якщо проміс відхилено
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});
