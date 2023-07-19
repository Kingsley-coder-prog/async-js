'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
          <article class="country ${className}">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                  <h3 class="country__name">${data.name}</h3>
                  <h4 class="country__region">${data.region}</h4>
                  <p class="country__row"><span>👫</span>${(
                    +data.population / 1000000
                  ).toFixed(1)}M people</p>
                  <p class="country__row"><span>🗣️</span>${
                    data.languages[0].name
                  }</p>
                  <p class="country__row"><span>💰</span>${
                    data.currencies[0].name
                  }</p>
              </div>
          </article>
        `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
// https://countries-api-836d.onrender.com/countries/
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);

  request.send();

  request.addEventListener('load', function () {
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('canada');
getCountryData('germany');
getCountryData('spain');
*/

/*
const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}M people</p>
              <p class="country__row"><span>🗣️</span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].name
              }</p>
          </div>
      </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // Ajax call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    // Ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');

      // Get neighbour country (3)
      const neighbour = data2.borders?.[0];

      if (!neighbour) return;

      // Ajax call country 3
      const request3 = new XMLHttpRequest();
      request3.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
      request3.send();

      request3.addEventListener('load', function () {
        const data3 = JSON.parse(this.responseText);
        console.log(data3);

        renderCountry(data3, 'neighbour');
      });
    });
  });
};

getCountryAndNeighbour('holland');
*/
///////////////////////////////////////////////
// Callback  Hell
/*
setTimeout(() => {
  console.log('I am home');
  setTimeout(() => {
    console.log('Who is home?');
    setTimeout(() => {
      console.log('Is anyone home?');
      setTimeout(() => {
        console.log('I wanna eat');
        setTimeout(() => {
          console.log('Let have fun');
          setTimeout(() => {
            console.log('The end of an era');
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

////////////////////////////////////////////////////
// PROMISES

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
// request.send();

// const request = fetch('https://restcountries.com/v2/name/portugal');

// console.log(request);

const getCountryData1 = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`Country is not found (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country is not found (${response.status})`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      //   const neighbour = data[0].borders?.[0];
      const neighbour = 'dfsdfedf';

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country is not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(`${err} 🔥🔥🔥🔥`);
      renderError(`Something went wrong 🔥🔥 ${err.message}. Try again! `);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];

//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         'Country is not found'
//       );
//     })

//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.log(`${err} 🔥🔥🔥🔥`);
//       renderError(`Something went wrong 🔥🔥 ${err.message}. Try again! `);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('australia');

/////////////////////////////////////////////////////////////
// Async JS
// Coding Challenge #1
// const request = fetch(
//   'https://geocode.xyz/52.508,13.381?geoit=json&auth=your_api_key'
// );

// const renderLocation = function () {};
// AIzaSyDbrBcgQSRkOELmDfcGA289TRwms9-bwtY

// const whereAmI1 = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=163701317952885356510x100118`
//     // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDbrBcgQSRkOELmDfcGA289TRwms9-bwtY`
//   )
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       //   const city = data.results?.[7].formatted_address;
//       //   console.log(`You are in ${city}.`);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//       //   return fetch(`https://restcountries.com/v3.1/name/eesti/${data.country}`);
//     })

//     .then(response => {
//       //   console.log(response);

//       if (!response.ok)
//         throw new Error(`Country is not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}`));
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//////////////////////////////////////////////////////////////
// EVENT LOOP IN PRACTICE
// console.log('Test start');
// setTimeout(() => console.log('0 sec later'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// console.log('Test end');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening 🔮');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('YOU WIN 💰');
//     } else {
//       reject(new Error('You lost your money 😥'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// const wait = seconds => {
//   return new Promise(resolve => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('1 second past');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 second past');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 second past');
//     return wait(1);
//   })
//   .then(() => console.log('4 second past'));

//   setTimeout(() => {
//   console.log('I am home');
//   setTimeout(() => {
//     console.log('Who is home?');
//     setTimeout(() => {
//       console.log('Is anyone home?');
//       setTimeout(() => {
//         console.log('I wanna eat');
//         setTimeout(() => {
//           console.log('Let have fun');
//           setTimeout(() => {
//             console.log('The end of an era');
//           }, 1000);
//         }, 1000);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Probelm!')).catch(x => console.error(x));

const getPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=163701317952885356510x100118`
        // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDbrBcgQSRkOELmDfcGA289TRwms9-bwtY`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      //   const city = data.results?.[7].formatted_address;
      //   console.log(`You are in ${city}.`);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
      //   return fetch(`https://restcountries.com/v3.1/name/eesti/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`));
};

btn.addEventListener('click', whereAmI);

//////////////////////////////////////////////////////
// Coding Challenge 3
/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imageContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imageContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loading');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loading');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/
//////////////////////////////////////////////////////////////
