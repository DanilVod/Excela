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
  colsCount: 5,
  rowsCount: 5
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
function debounce(f, ms) {
  let isCooldown = false

  return function() {
    if (isCooldown) return

    f.apply(this, arguments)

    isCooldown = true

    setTimeout(() => (isCooldown = false), ms)
  }
}
makeResize()

window.addEventListener('load', function() {
  document.addEventListener('input', function(e) {
    const coords =
      e.target.closest('.row').dataset.row + '-' + e.target.dataset.col
    const contentInHTML = e.target.innerHTML.trim()

    debounce(
      (function() {
        localStorage.setItem(
          'div',
          setToLocalValue(coords, contentInHTML, 'div')
        )
      })(),
      1000
    )
  })
})

function action(button) {
  for (let i = 0; i < value.length; i++) {
    let valueTarget = value[i].target.closest('.cell')
    const coords =
      value[i].target.closest('.row').dataset.row +
      '-' +
      valueTarget.dataset.col
    button == 'bold'
      ? valueTarget.style.fontWeight == button
        ? (valueTarget.style.fontWeight = 'normal')
        : (valueTarget.style.fontWeight = button)
      : ''
    button == 'italic'
      ? valueTarget.style.fontStyle == button
        ? (valueTarget.style.fontStyle = 'normal')
        : (valueTarget.style.fontStyle = button)
      : ''
    button == 'underline'
      ? valueTarget.style.textDecoration == button
        ? (valueTarget.style.textDecoration = 'none')
        : (valueTarget.style.textDecoration = button)
      : (valueTarget.style.justifyContent = button)
    localStorage.setItem(
      'fontWeight',
      setToLocalValue(coords, value[i].target.style.fontWeight, 'fontWeight')
    )
    localStorage.setItem(
      'fontStyle',
      setToLocalValue(coords, value[i].target.style.fontStyle, 'fontStyle')
    )
    localStorage.setItem(
      'textDecoration',
      setToLocalValue(
        coords,
        value[i].target.style.textDecoration,
        'textDecoration'
      )
    )
    localStorage.setItem(
      'justifyContent',
      setToLocalValue(
        coords,
        value[i].target.style.justifyContent,
        'justifyContent'
      )
    )
  }
}

const table = document.querySelector('#table')
let value = []
table.onclick = function(e) {
  let eTarget = e.target.closest('.cell')
  eTarget.style.border = 'solid rgb(14, 101, 235) 2px'

  if (e.ctrlKey) {
    if (value.length !== 0) {
      //Проверка на повторный клик по той же ячейке
      value.reduce((prevItem, curItem) =>
        prevItem.target.offsetHeight == curItem.target.offsetHeight
          ? value.pop()
          : ''
      )
    }
    value.push(e)
  } else if (!e.ctrlKey) {
    if (Object.keys(value).length > 1) {
      for (let i = 0; i < value.length; i++) {
        value[i].target.closest('.cell').style.border =
          'solid rgb(14, 101, 235) 2px'
      }
    }
    for (let i = 0; i < value.length; i++) {
      console.log(value)
      console.log(value.length)
      value[i].target.closest('.cell').style.border = '1px solid #dadce0'
    }
    value = []
    value.push(e)
  }
}
const toolbar = document.querySelector('#toolbar')
toolbar.addEventListener('click', e => {
  action(`${e.target.id}`)
})
