'use strict'
// import { gsap } from "gsap";

const date = new Date().toLocaleDateString().split('.').reverse();
const endDate = date.join('-');
const startDate = date.map((item,i) => {
  if(i === 0) {
    return item - 1;
  }
  return item
}).join('-');

const keySP500 = 'db8b6f2482735a08cb3c18826a9f404d',
      keyEuro = 'c5059cd7104fd2d8d1faf1955d13ac78',
      baseFetch = 'http://localhost:9999/api.stlouisfed.org/fred/series/observations'

function createChart(id, key, selector, label) {
  const arrPrices = [],
        arrDates = [];

  fetch(`${baseFetch}?series_id=${id}&frequency=m&api_key=${key}&file_type=json&observation_start=${'2023-01-01'}&observation_end=${endDate}`).then((response) => {
    return response.json()
}).then(data => data.observations.map((item, i)=> {
    if(item.value !== '.') {
    arrDates.push(item.date);
    arrPrices.push(item.value)
  }

})).then(item => {

    const ctx = document.querySelector(selector);
    const context = ctx.getContext('2d');
    let gradient = context.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(33, 63, 46, 1)');
    gradient.addColorStop(1, 'rgba(33, 63, 46, 0.1)')

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: arrDates,
        datasets: [{
          label: label,
          data: arrPrices,
          borderWidth: 5,
          fill: true,
          backgroundColor: gradient,
          borderColor: 'rgb(33, 63, 46)',
          tension: 0.2,
          pointStyle: true
        }]
      },
      options: {
        scales: {
          x: {
            ticks: {
              padding: 20,
              maxRotation: 0,
              margin: 20,
              color: '#A59F6D',
              font: {
                weight: 700,
                size: 10
              }
            },
            border: {
              width: 0,
            },
            grid: {
              color: 'rgba(88, 88, 88, 0.4)',
              lineWidth: 0,
              drawTicks: false
            }
          }, 
          y: {
            ticks: {
              padding: 30,
              color: '#213F2E',
              font: {
                weight: 700,
                size: 15
              }
            },
            border: {
              width: 0,
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: false,
        },
        elements: {
          point: {
            radius: 3
          }
        }
      }
    });
  })
  Chart.defaults.borderColor = '#fff';
  Chart.defaults.font.size = 14;
}

createChart('SP500', keySP500, '#myChart', 'S&P 500');

createChart('DEXUSEU', keyEuro, '#myChart-2', 'Euro');


const amountSections = document.querySelectorAll('section').length;
const asideDots = document.querySelectorAll('.dots-item');
const heightOneSection = document.documentElement.scrollHeight / amountSections

const indexDescr = document.querySelector('.indexes-descr');
const indexBoxList = document.querySelector('.indexes-box-list');

const chartBoxes = document.querySelectorAll('.chart-box');
    
const bodyMenu = document.querySelector('.body-menu');


window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop === 0) {
    asideDots.forEach(item => {
      item.classList.remove('dots-item-active');
    })
    asideDots[0].classList.add('dots-item-active');


  } else if (document.documentElement.scrollTop > 0 && document.documentElement.scrollTop < (heightOneSection + 1)) {
    asideDots.forEach(item => {
      item.classList.remove('dots-item-active');
    })
    asideDots[1].classList.add('dots-item-active');
    bodyMenu.classList.remove('show')
    indexDescr.classList.add('animation-fade-in-bottom');
    indexBoxList.classList.add('animation-fade-in-left')
  } else if (document.documentElement.scrollTop > (heightOneSection + 1) && document.documentElement.scrollTop < (heightOneSection * 2 + 1)) {
    asideDots.forEach(item => {
      item.classList.remove('dots-item-active');
    })
    asideDots[2].classList.add('dots-item-active');
    bodyMenu.classList.add('show')
  } else if (document.documentElement.scrollTop > (heightOneSection * 2 + 1) && document.documentElement.scrollTop < (heightOneSection * 3 + 1)) {
    asideDots.forEach(item => {
      item.classList.remove('dots-item-active');
    })
    asideDots[3].classList.add('dots-item-active');
    chartBoxes[0].classList.add('animation-fade-in-bottom');
  } else if (document.documentElement.scrollTop > (heightOneSection * 3 + 1) && document.documentElement.scrollTop < (heightOneSection * 4 + 1)) {
    asideDots.forEach(item => {
      item.classList.remove('dots-item-active');
    })
    asideDots[4].classList.add('dots-item-active');
    chartBoxes[1].classList.add('animation-fade-in-bottom');
  }
})

// window.addEventListener('resize',() => location.reload());