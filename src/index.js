const css = require('./style.scss');

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
};
// Класс создания таблицы



class Table {
  constructor(options) {
    this.name = options.name;
    this.cols = options.cols;
    this.rows = options.rows;
  }
  createTable() {
    let newStr = [`<div class='column first'>0</div>`]
    let bla = newStr[0];
    if (bla.indexOf('first')) {
      console.log('A')
      let unicode = 65;
      if (unicode > 90) {
        unicode = 65;
      }
      let rowFirst = `<div id='row'>${String.fromCodePoint(unicode)}</div>`
      bla.insert(bla.indexOf('<', 2), `${rowFirst.repeat(this.rows)}`)
    }
    const tables = document.querySelector('#tables');
    for (let i = 0; i < this.cols; i++) {
      let column = `<div class='column'>${i + 1}</div>`
      newStr.push(column)
    }
    let row = `<div contenteditable="true" id='row'></div>`
    let inHtml = []

    newStr
      .map(item => {
        inHtml.push(item.insert(item.indexOf('<', 2), `${row.repeat(this.rows)}`))
      })
    let strHtml = inHtml.join('')
    console.log(strHtml)
    tables.insertAdjacentHTML('beforeend', `${strHtml}`)
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


