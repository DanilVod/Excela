//Подключение стилей
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
      firstCol.push(`<div class="first row-col" data-col='${k}'>${String.fromCodePoint(unicode)}
      <div class="resizerCol resizer-left"></div>
      </div>`)
      unicode++
    }
    for (let j = 0; j < this.cols; j++) {
      cols.push(`<div class="row-col" contenteditable="true" data-col='${j + 1}'></div>`)
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
        <div class="row-info" data-row="${i + 1}">${i + 1}
        <div class="resizerRow resizer-left"></div>
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

function makeResize() {
  document.addEventListener('mousedown', function (event) {
    let parentCol = event.target.closest('.first')
    let parentRow = event.target.closest('.row-info')
    if (parentRow) {
      let rows = document.querySelectorAll(`[data-row="${parentRow.dataset.row}"]`)
      let cordsRow = parentRow.getBoundingClientRect()
      document.onmousemove = function (e) {
        let deltaRow = e.pageY - cordsRow.bottom
        let height = cordsRow.height + deltaRow + 'px'
        parentRow.style.height = height
        rows.forEach((row) => row.style.height = height)
      }
    }
    if (parentCol) {
      let cols = document.querySelectorAll(`[data-col="${parentCol.dataset.col}"]`)
      let cordsCol = parentCol.getBoundingClientRect()
      document.onmousemove = function (e) {
        let deltaCol = e.pageX - cordsCol.right
        let width = cordsCol.width + deltaCol + 'px'
        parentCol.style.width = width
        cols.forEach((col) => col.style.width = width)
      }
    }
    document.onmouseup = function () {
      document.onmousemove = null
    }
  });
}
makeResize()
