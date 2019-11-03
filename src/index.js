const css = require('./style.scss');

// Класс создания таблицы


class Table {
  constructor(options) {
    this.name = options.name;
    this.cols = options.cols;
    this.rows = options.rows;
  }
  createTable() {
    const tables = document.querySelector('#tables');
    tables.insertAdjacentHTML('beforeend', `<caption>${this.name}</caption><table id='${this.name}1'><tr id="${this.name}"><td>&nbsp</td></tr </table>`);
    let unicode = 65;
    for (let i = 1; i <= this.cols; i++) {
      $(`#${this.name}`).append(`<th class='bar'><b>${i}</b></th>`);
    } for (let j = 0; j < this.rows; j++) {
      if (unicode > 90) {
        unicode = 65;
      }
      $(`#${this.name}1`).append(`<tr class='${this.name}row'><td class='first'>${String.fromCodePoint(unicode)}</td></tr>`);
      unicode++;
    }
    const tr = document.querySelectorAll(`.${this.name}row`);
    for (const key of tr) {
      for (let k = 0; k < this.cols; k++) {
        key.insertAdjacentHTML('beforeend', `<td><div contenteditable="true"></div></td>`);
      }
    }
  }
}

const table1 = new Table({
  name: 'table1',
  cols: 5,
  rows: 5,
});
table1.createTable();

// Добавление двух полосок по бокам при наведении на th
const cell = document.querySelectorAll('.bar');
for (const k of cell) {
  k.addEventListener('mouseover', (e) => {
    if (e.target.classList.length) {
      e.target.insertAdjacentHTML('beforeend', `<div id='delete'><div class='resizer resizerleft'></div><div class='resizer resizerright'></div></div>`);
      // resize
      const thumb = document.querySelector('.resizer');
      thumb.addEventListener('mousedown', mousedown);
      function mousedown(event) {
        const shiftX = event.clientX - thumb.getBoundingClientRect().left;
        console.log(shiftX);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(event) {
          const newLeft = event.clientX - shiftX - e.target.getBoundingClientRect().left;
          event.target.style.left = newLeft + 'px';
        }

        function onMouseUp() {
          document.removeEventListener('mouseup', onMouseUp);
          document.removeEventListener('mousemove', onMouseMove);
        }
      };
      thumb.ondragstart = function () {
        return false;
      };
    }
  });
  // Конец resize
  k.addEventListener('mouseout', () => {
    const el = document.querySelector('#delete');
    el.parentNode.removeChild(el);
  });
}


