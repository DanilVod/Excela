//Подключение стилей
import './style.scss'
import { createCol, createRow, createCell, setToLocalValue } from './templates'
// localStorage.setItem('height', JSON.stringify({ '1': 24 }))
//pure function
//Императивный подход
//Функциональное программирование

// Класс создания таблицы
class Table {
  constructor(options) {
    this.colsCount = options.colsCount
    this.rowsCount = options.rowsCount
    this.$table = document.querySelector('#table')
  }
  //функция создания таблицы
  createTable() {
    const rows = []
    const cols = []
    const firstCol = []

    //создание колонок
    for (let k = 1; k < this.colsCount + 1; k++) {
      firstCol.push(createCol(k))
    }
    //создание строк
    for (let j = 0; j < this.colsCount; j++) {
      cols.push(createRow(j))
    }
    rows.push(createCell(firstCol))
    for (let i = 0; i < this.rowsCount; i++) {
      rows.push(createCell(cols, i))
    }
    table.insertAdjacentHTML('beforeend', `${rows.join('')}`)
  }
}
//Создаем таблицу с параметрами
const table1 = new Table({
  colsCount: 6,
  rowsCount: 6
})
table1.createTable()

// const rowState = {
//   '1': 120,
//   '3': 45
// }
function makeResize() {
  document.addEventListener('mousedown', function(event) {
    if (event.target.dataset.resize === 'row') {
      let parentRow = event.target.closest('.row')
      //Функция ресайза строк
      let cordsRow = parentRow.getBoundingClientRect()
      document.onmousemove = function(e) {
        let deltaRow = e.pageY - cordsRow.bottom
        let height = cordsRow.height + deltaRow
        parentRow.style.height = height + 'px'
        const parent = parentRow.dataset.row
        localStorage.setItem(
          'height',
          setToLocalValue(parent, height, 'height')
        )
      }
    } else if (event.target.dataset.resize === 'col') {
      let parentCol = event.target.closest('.first')
      let cols = document.querySelectorAll(
        `[data-col="${parentCol.dataset.col}"]`
      )
      //Функция ресайза колонок
      let cordsCol = parentCol.getBoundingClientRect()

      document.onmousemove = function(e) {
        let deltaCol = e.pageX - cordsCol.right
        let width = cordsCol.width + deltaCol
        parentCol.style.width = width + 'px'
        cols.forEach(col => (col.style.width = width + 'px'))
        const parent = parentCol.dataset.col
        localStorage.setItem('width', setToLocalValue(parent, width, 'width'))
      }
    }

    document.onmouseup = function() {
      document.onmousemove = null
    }
  })
}

makeResize()

window.addEventListener('load', function() {
  const cell = document.querySelectorAll('.cell')

  for (let i = 0; i < cell.length; i++) {
    const coords =
      cell[i].parentNode.parentNode.dataset.row + '-' + cell[i].dataset.col
    cell[i].oninput = function() {
      localStorage.setItem(
        'div',
        setToLocalValue(
          coords,
          cell[i].innerHTML.replace(/\s*\n\s*/g, ''),
          'div'
        )
      )
    }
    JSON.parse(localStorage.getItem(`div`)) == null
      ? (cell[i].innerHTML = '')
      : typeof (cell[i].innerHTML = JSON.parse(localStorage.getItem(`div`))[
          coords
        ]) == 'undefined'
      ? (cell[i].innerHTML = '')
      : (cell[i].innerHTML = JSON.parse(localStorage.getItem(`div`))[coords])
  }
})
