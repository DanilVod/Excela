//Подключение стилей
const css = require('./style.scss');

// Класс создания таблицы
class Table {
  constructor(options) {
    this.colsCount = options.colsCount;
    this.rowsCount = options.rowsCount;
    this.table = document.querySelector('#table');
  }
  //функция создания таблицы
  createTable() {
    const rows = [];
    const cols = [];
    const firstCol = [];
    let unicode = 65;
    //создание колонок
    for (let k = 1; k < this.colsCount + 1; k++) {
      firstCol.push(`<div class="first row-col" data-col='${k}'>${String.fromCodePoint(unicode)}
      <div class="resizerCol"></div>
      </div>`)
      unicode++
    }
    //создание строк
    for (let j = 0; j < this.colsCount; j++) {
      cols.push(`<div class="row-col" contenteditable="true" data-col='${j + 1}'></div>`)
    }
    rows.push(`<div class="row">
        <div class="row-info">
        </div>
        <div class="row-content">
          ${firstCol.join('')}
        </div>
      </div>`)
    for (let i = 0; i < this.rowsCount; i++) {
      rows.push(`<div class="row">
        <div class="row-info" data-row="${i + 1}">${i + 1}
        <div class="resizerRow"></div>
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
//Создаем таблицу с параметрами
const table1 = new Table({
  colsCount: 6,
  rowsCount: 6,
});
table1.createTable();

function makeResize() {
  document.addEventListener('mousedown', function (event) {
    let parentCol = event.target.closest('.first')
    let parentRow = event.target.closest('.row-info')
    if (parentRow) {
      //Функция ресайза строк
      let cordsRow = parentRow.getBoundingClientRect()
      document.onmousemove = function (e) {
        let rows = document.querySelectorAll(`[data-row="${parentRow.dataset.row}"]`)
        let deltaRow = e.pageY - cordsRow.bottom
        let height = cordsRow.height + deltaRow + 'px'
        parentRow.style.height = height
      }
    }
    if (parentCol) {
      //Функция ресайза колонок
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
