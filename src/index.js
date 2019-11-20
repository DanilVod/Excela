const css = require('./style.scss');

// Класс создания таблицы



class Table {
  constructor(options) {
    this.name = options.name;
    this.cols = options.cols;
    this.rows = options.rows;
    this.table = document.querySelector('#table');
  }
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
    return this.cols
  }
}
const table1 = new Table({
  name: 'table1',
  cols: 6,
  rows: 6,
});
table1.createTable();

function resize() {
  for (let i = 0; i < table1.cols; i++) {
    const element = document.querySelectorAll(`.row-col0`)
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
          for (let i = 0; i < element.length; i++) {
            element[i].style.width = e.pageX - element[i].getBoundingClientRect().left + 'px'
          }
          element[i].style.width = e.pageX - element[i].getBoundingClientRect().left + 'px'

        }
      }

      function stopResize() {
        window.removeEventListener('mousemove', resize)
      }
    }
  }
}
resize()