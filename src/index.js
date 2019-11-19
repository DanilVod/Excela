const css = require('./style.scss');

// Класс создания таблицы



class Table {
  constructor(options) {
    this.name = options.name;
    this.cols = options.cols;
    this.rows = options.rows;
    this.table = document.querySelector('#table');
  }
  //   createTable() {
  //     let newStr = [`<div class='column first'>0</div>`]
  //     let bla = newStr[0];
  //     if (bla.indexOf('first')) {
  //       console.log('A')
  //       let unicode = 65;
  //       if (unicode > 90) {
  //         unicode = 65;
  //       }
  //       let rowFirst = `<div id='row'>${String.fromCodePoint(unicode)}</div>`
  //       bla.insert(bla.indexOf('<', 2), `${rowFirst.repeat(this.rows)}`)
  //     }
  //     const tables = document.querySelector('#tables');
  //     for (let i = 0; i < this.cols; i++) {
  //       let column = `<div class='column'>${i + 1}</div>`
  //       newStr.push(column)
  //     }
  //     let row = `<div contenteditable="true" id='row'></div>`
  //     let inHtml = []

  //     newStr
  //       .map(item => {
  //         inHtml.push(item.insert(item.indexOf('<', 2), `${row.repeat(this.rows)}`))
  //       })
  //     let strHtml = inHtml.join('')
  //     console.log(strHtml)
  //     tables.insertAdjacentHTML('beforeend', `${strHtml}`)
  //   }
  // }

  createTable() {
    let rows = [];
    let cols = [];
    let firstCol = [];
    let unicode = 65;
    for (let k = 1; k < this.cols + 1; k++) {
      firstCol.push(`<div class="first row-col row-col${k - 1}">${k}
      <div class="resizer resizer-left"></div>
      </div>`)
    }
    for (let j = 0; j < this.cols; j++) {
      cols.push(`<div class="row-col row-col${j}" contenteditable="true"></div>`)
    }
    rows.push(`<div class="row">
        <div class="row-info">
        </div>
        <div class="row-content">
          ${firstCol.join('')}
        </div>
      </div>`)
    for (let i = 0; i < this.rows; i++) {
      rows.push(`<div class="row">
        <div class="row-info">${String.fromCodePoint(unicode)}
        </div>
        <div class="row-content">
          ${cols.join('')}
        </div>
      </div>`)
      unicode++
    }
    table.insertAdjacentHTML('beforeend', `${rows.join('')}`)
  }
}
const table1 = new Table({
  name: 'table1',
  cols: 6,
  rows: 6,
});
table1.createTable();


// // Добавление двух полосок по бокам при наведении на th
// const cell = document.querySelectorAll('.bar');
// for (const k of cell) {
//   k.addEventListener('mouseover', (e) => {
//     if (e.target.classList.length) {
//       e.target.insertAdjacentHTML('beforeend', `<div id='delete'><div class='resizer resizerleft'></div><div class='resizer resizerright'></div></div>`);
//       // resize
//       const thumb = document.querySelector('.resizer');
//       thumb.addEventListener('mousedown', mousedown);
//       function mousedown(event) {
//         const shiftX = event.clientX - thumb.getBoundingClientRect().left;
//         console.log(shiftX);

//         document.addEventListener('mousemove', onMouseMove);
//         document.addEventListener('mouseup', onMouseUp);

//         function onMouseMove(event) {
//           const newLeft = event.clientX - shiftX - e.target.getBoundingClientRect().left;
//           event.target.style.left = newLeft + 'px';
//         }

//         function onMouseUp() {
//           document.removeEventListener('mouseup', onMouseUp);
//           document.removeEventListener('mousemove', onMouseMove);
//         }
//       };
//       thumb.ondragstart = function () {
//         return false;
//       };
//     }
//   });
//   // Конец resize
//   k.addEventListener('mouseout', () => {
//     const el = document.querySelector('#delete');
//     el.parentNode.removeChild(el);
//   });
// }

// function resize() {
//   const element = document.querySelector('.row-col');
//   const resizers = document.querySelectorAll('.resizer')
//   for (let i = 0; i < resizers.length; i++) {
//     const currentResizer = resizers[i];
//     currentResizer.addEventListener('mousedown', function (e) {
//       e.preventDefault()
//       currentResizer.addEventListener('mousemove', resize)
//       window.addEventListener('mouseup', stopResize)
//     })
//     function resize(e) {
//       if (currentResizer.classList.contains('resizer-left')) {
//         console.log(e)
//         element.style.width = e.pageX - element.getBoundingClientRect().left + 'px';
//       }
//     }
//     function stopResize() {
//       window.removeEventListener('mousemove', resize)
//     }
//   }
// }
// resize()

function makeResizableDiv() {

  const element = document.querySelector('.row-col')
  window.addEventListener('click', function () { console.log(this, arguments[0].target.classList); })
  const resizers = document.querySelectorAll('.resizer')
  for (let i = 0; i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function (e) {
      e.preventDefault()
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })

    function resize(e) {
      if (currentResizer.classList.contains('resizer-left')) {
        element.style.width = e.pageX - element.getBoundingClientRect().left + 'px'
      }
    }

    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }
  }
}
makeResizableDiv()