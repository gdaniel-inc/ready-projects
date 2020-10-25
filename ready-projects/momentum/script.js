// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  weather = document.querySelector('.weather'),
  btn_change_image = document.querySelector('.btn_change_image');

const IMAGES = [
  './assets/images/morning/01.jpg',
  './assets/images/morning/02.jpg',
  './assets/images/morning/03.jpg',
  './assets/images/morning/04.jpg',
  './assets/images/morning/05.jpg',
  './assets/images/morning/06.jpg',
  './assets/images/day/01.jpg',
  './assets/images/day/02.jpg',
  './assets/images/day/03.jpg',
  './assets/images/day/04.jpg',
  './assets/images/day/05.jpg',
  './assets/images/day/06.jpg',
  './assets/images/evening/01.jpg',
  './assets/images/evening/02.jpg',
  './assets/images/evening/03.jpg',
  './assets/images/evening/04.jpg',
  './assets/images/evening/05.jpg',
  './assets/images/evening/06.jpg',
  './assets/images/night/01.jpg',
  './assets/images/night/02.jpg',
  './assets/images/night/03.jpg',
  './assets/images/night/04.jpg',
  './assets/images/night/05.jpg',
  './assets/images/night/06.jpg'
];

let image_date = new Date().getHours();
let image_index = image_date;


btn_change_image.addEventListener('click', () => {
  img = document.createElement('img');
  img.src = IMAGES[image_index];
    if (image_index < 23) {
      image_index++;
    } else if (image_index == 23) {
      image_index = 0;
    }
  document.querySelector('body').style.backgroundImage = `url(${IMAGES[image_index]})`;
});

let base_image = IMAGES[image_date];

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

function showDate() {
  let today_date = new Date(),
    year = today_date.getFullYear(),
    month,
    day = today_date.getDate();

  switch (new Date().getMonth()) {
    case 1: month = 'January'; break;
    case 2: month = 'February'; break;
    case 3: month = 'March'; break;
    case 4: month = 'April'; break;
    case 5: month = 'May'; break;
    case 6: month = 'June'; break;
    case 7: month = 'July'; break;
    case 8: month = 'August'; break;
    case 9: month = 'September'; break;
    case 10: month = 'October'; break;
    case 11: month = 'November'; break;
    case 12: month = 'December'; break;
  }


  date.innerHTML = `${year}, ${month} ${addZero(day)}`;

  let timeOut = (1000 * 60 * 60);

  setTimeout(showDate, timeOut);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  document.querySelector('body').style.backgroundImage = `url(${base_image})`;
  if (hour >= 0 && hour < 6) {
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  } else if (hour >= 6 && hour < 12) {
    greeting.textContent = 'Good Morning, ';
    document.body.style.color = 'white';
  } else if (hour >= 12 && hour < 18) {
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'white';
  } else if (hour >= 18 && hour <= 23) {
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');

    let old_name = localStorage.getItem('name');

    name.addEventListener('click', () => {
      name.textContent = '';

      setTimeout(() => {
      if (name.textContent == '') {
          name.textContent = old_name;
          localStorage.setItem('name', old_name);
        } else {
          setName();
        }
      }, 5000);
    });
  }

}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}


// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn_change_quote = document.querySelector('.btn_change_quote');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn_change_quote.addEventListener('click', getQuote);


// Weather
async function funcWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem('weather')}&lang=ru&appid=ae6c8c6325da479230f6666956184c7e&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
}

function getWeather() {
  if (localStorage.getItem('weather') === null) {
    weather.textContent = '[Enter Weather]';
  } else {
    weather.textContent = localStorage.getItem('weather');
  }

}

function setWeather(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('weather', e.target.innerText);
      weather.blur();
    }
  } else {
    localStorage.setItem('weather', e.target.innerText);
  }
}



name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
weather.addEventListener('keypress', setWeather);
weather.addEventListener('blur', setWeather);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
showDate();
setBgGreet();
getName();
getFocus();
