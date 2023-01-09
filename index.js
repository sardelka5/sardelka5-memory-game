/* eslint-disable require-jsdoc */
const container = document.querySelector('.container');
const btn1 = document.querySelector('.level1');
const btn2 = document.querySelector('.level2');
const btn3 = document.querySelector('.level3');

// функция для получения рамдомного числа
function randomCards(max, min = 1) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ф-ция для создания карточек
function createCards(num, ms) {
  // получаем кол-во карточек для залития цветом и получаем их индексы в массив
  const arr = [];
  const numberOfCards = randomCards(Math.floor(num / 2));
  while (arr.length <= numberOfCards) {
    const currNum = randomCards(num);
    if (!arr.includes(currNum)) {
      arr.push(currNum);
    }
  }
  // отрисовываем карточки с цветом
  let result = ``;
  for (let i = 1; i <= num; i++) {
    if (arr.includes(i)) {
      result += `<div class="card yellow" data-index="${i}"></div> `;
    } else {
      result += `<div class="card" data-index="${i}"></div> `;
    }
  }
  // после отработки таймаута убираем класс "жёлтый"
  // и подключаем карточкам листенеры
  setTimeout(() => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((el) => {
      el.classList.remove('yellow');
    });
    setListeners(arr);
  }, ms);

  return result;
}

function setListeners(array) {
  const cards = document.querySelectorAll('.card');
  const arr2 = [];
  cards.forEach((card) => {
    card.addEventListener('click', (event) => {
      if (array.includes(+event.target.dataset.index)) {
        card.classList.add('yellow');
        arr2.push(+event.target.dataset.index);
        console.log(array, arr2);
      } else {
        card.classList.add('red');
        setTimeout(() => {
          alert('Вы неправильно выбрали карточку. Попробуйте еще раз.');
          location.reload();
        }, 100);
      }
      if (arr2.length === array.length) {
        setTimeout(() => {
          alert('Вы всё угадали правильно!');
          location.reload();
        }, 100);
      }
    });
  });
}

btn1.addEventListener('click', () => {
  container.innerHTML = createCards(6, 2000);
});

btn2.addEventListener('click', () => {
  container.innerHTML = createCards(9, 1500);
});

btn3.addEventListener('click', () => {
  container.innerHTML = createCards(12, 1000);
});
