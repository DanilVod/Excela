//Подключение стилей
import './style.scss'
import { createTable } from './templates'
import { setToLocalValue } from './values'

// Класс создания таблицы
class Table {
  constructor(options) {
    this.colsCount = options.colsCount
    this.rowsCount = options.rowsCount
    this.$table = document.querySelector('#table')
    this.createTable = createTable.bind(this)
  }
}
//Создаем таблицу с параметрами
const table1 = new Table({
  colsCount: 10,
  rowsCount: 10
})
table1.createTable()

function makeResize() {
  document.addEventListener('mousedown', function(event) {
    if (event.target.dataset.resize === 'row') {
      const parentRow = event.target.closest('.row')
      //Функция ресайза строк
      const cordsRow = parentRow.getBoundingClientRect()
      document.onmousemove = function(e) {
        const deltaRow = e.pageY - cordsRow.bottom
        const height = cordsRow.height + deltaRow
        parentRow.style.height = height + 'px'
        const parent = parentRow.dataset.row
        localStorage.setItem(
          'height',
          setToLocalValue(parent, height, 'height')
        )
      }
    } else if (event.target.dataset.resize === 'col') {
      const parentCol = event.target.closest('.first')
      const cols = document.querySelectorAll(
        `[data-col="${parentCol.dataset.col}"]`
      )
      //Функция ресайза колонок
      const cordsCol = parentCol.getBoundingClientRect()

      document.onmousemove = function(e) {
        const deltaCol = e.pageX - cordsCol.right
        const width = cordsCol.width + deltaCol
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
  document.addEventListener('input', function(e) {
    const coords =
      e.target.parentNode.parentNode.dataset.row + '-' + e.target.dataset.col
    const contentInHTML = e.target.innerHTML.replace(/\s*\n\s*/g, '')
    localStorage.setItem('div', setToLocalValue(coords, contentInHTML, 'div'))
  })
})
